---
title: how to steal intellectual property you don't own
timestamp: 1740863435
---

Recently while scrolling through Twitter I saw a post linking to a really high quality 3D model on [VRoid Hub](https://hub.vroid.com).

When you visit any VRoid Hub page, you'll notice a large preview of the model that you can interact with, even if downloads are disabled.

This got me thinking: what's stopping someone from simply replicating the network request the website uses to fetch the contents of these private models?

As it turns out? *A lot*.

## what you'd normally do
The first thing I did was attempt to pull up the network tab, which yielded model data basically immediately:
<img src="/blog-images/intp-network.png" width="700">

I had no idea what a VRM was, but upon Googling it appeared to just be a GLB file with extensions.

So, I threw the model data into a GLB viewer. It couldn't read it.

## what vroid hub actually does
By using the Chrome debugger and stepping through the site's code, I very quickly discovered that the obfuscated VRM file was encrypted with data that was present in the file itself.

Each encrypted VRM is split up into 4 segments, separated by bytes:
- 0 through 16 are an `iv` for decryption
- 16 through 48 is the decryption key itself
- 48 through 52 is the size of the decompressed version of the file

By just throwing these into crypto.subtle's decrypt function using `AES-CBC`, you can yield a perfectly good, albeit, compressed VRM file.

The compression VRoid Hub uses is ZSTD, which is very easy to decompress.

After decrypting using the steps above, you'd think that you'd have a fully-functional model, right?

<img src="/blog-images/intp-clearly-not-hatsune-miku.png" width="500">

If this looks like the world-renowned artist Hatsune Miku to you, feel free to close the article here.

## okay wtf
While discussing this with a friend, they mentioned a tool used by the VRChat community called [KannaProtecc](https://github.com/PlagueVRC/AntiRip). KannaProtecc randomizes the vertices of a model’s mesh and uses a shader to correct their positions in real-time during gameplay. This sounded suspiciously similar to what I was seeing.

Inspecting the model further, I noticed a pretty striking GLB extension mentioned nowhere on the internet: `PIXIV_vroid_hub_preview_mesh`.

Searching through the VRoid Hub website source code for this string, you'll very quickly find an  implementation of this extension with references to a "seedmap".

<img src="/blog-images/intp-vroidhub-ext.png">

I extracted the relevant code and started analyzing it.

## how does this shit work
The obfuscation process uses a pseudo-random number generator (PRNG) that produces consistent results when given the same initial seed. The seed is derived by using a "timestamp" property on the `PIXIV_vroid_hub_preview_mesh` extension and mapping it to a "seedmap", which is generated from running a sha1 hash over the model's URL. The extension generates a 256x256 "meta texture" using this PRNG. This texture contains the data needed to decode each vertex.

The extension then processes each node in the model’s scene, adding a meta attribute to every primitive. This attribute is calculated by running the PRNG for each vertex, generating a number between 0 and 256, normalizing it to a range of 0 to 1, and storing it in an array. Since the PRNG is deterministic, each vertex gets the same `meta` attribute every time the extension runs.

A shader is applied to sample the meta texture using the meta attribute. It scales the RGB values of the sample by 16.0 and subtracts the result from the vertex position. The direction of the displacement depends on the sign of the transformed vertex components, causing each vertex to shift toward or away from the origin based on the texture data.

This is word salad, but this is also my first real blog post and this is math bullshit.

Doing all of these steps is how the *web* preview decodes the obfuscation, but that made me wonder. Could I apply these transformations without using a shader to preemptively "fix" the obfuscated model?

And so I did exactly that.

## the end
There is a wonderful utility called [gltf-transform](https://gltf-transform.dev/) written in JavaScript that seemed perfect for my use-case. Copying a small bit of the web source code, including the pseudo-rng machine, yielded good results. I was able to replicate each step up to generating the meta texture.

Instead of appending a shader, I automatically went over each node and displaced the vertices. Doing this results in a VRM that is virtually indistinguishable from an obfuscated one.

After doing the transforms statically, finally, we have Miku in all her beauty:
<img src="/blog-images/intp-theres-miku.png" width="500">

Other things I needed to do (which took far longer than you'd think) were:
- Decompressing textures, since Pixiv compresses them for web usage using BasisU which does not work in modern VRM tools.
- Fixing the fact that `gltf-transform` deduplicates textures (this took way too long to realize)

Both of these tasks were done entirely by my friend [lith](https://xirreal.dev/) and would not be possible without her.

There is also an additional PIXIV extension I had not encountered called `PIXIV_texture_basis` which automatically encodes textures using basis encoding, but not ktx2. lith was a great help in figuring out how to decompress these.

You can find an implementation of everything discussed in a simple automation script I've released [here](https://github.com/uwu/vrh-deobfuscator).


## further notes
One of my next blog posts will be an extensive deep-dive in applying similar techniques to reverse the obfuscation done by the earlier mentioned KannaProtecc, which is sufficiently more advanced but still relatively the same in terms of obfuscation.