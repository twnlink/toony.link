---
title: an exercise in futility
timestamp: 1740861851
---

<small>
this is a mirror of cumcord.com's "AN EXERCISE IN FUTILITY" but with markdown.

you can read the original [here](https://web.archive.org/web/20221118170800/https://cumcord.com/an-exercise-in-futility).
</small>

Cumcord has been discontinued after more than a year of continuous development.

I made Cumcord when client modding was stuck between BetterDiscord, and Powercord. More than a year later, we even survived through the death of Powercord.


A year ago when I created Cumcord I just wanted to make something lighter, simpler, and easier to develop for than other client mods, so I created a new standard for plugin development. 

![XKCD standards comic](https://imgs.xkcd.com/comics/standards.png)

I've gotten tons of reports that I succeeded in my goal of making plugin development easier, so it may come as a surprise that Cumcord's development has ceased. 

Discord recently pushed an update that swaps out [Babel](https://web.archive.org/web/20221118170800/https://babel.dev/) for [SWC](https://web.archive.org/web/20221118170800/https://swc.rs/) in their frontend build pipeline, which enabled mangling on certain webpack modules, and stripped displayNames from React components. 

...including Cumcord.

Upon noticing this happened, BetterDiscord and Replugged were fixed, albeit with every plugin broken. They both announced they'd begun working on rewrites. GooseMod was discontinued. 

Every person who was willing to maintain Cumcord in our community discussed the changes hours before they were pushed to stable.

We came to the conclusion that while we could do the same thing that BetterDiscord and Replugged did and rewrite the mod, it wasn't worth it.

Cumcord was built on simple DX. The change Discord introduced made one of the core, simple to understand principals of client modding significantly more complex, despite how small the change was. If we rewrote Cumcord, our code would become disorganized, modules would be found through inconsistent methods, and React components would be even harder to debug.

Then I realized something that should've been obvious. Client modding is not sustainable.

Discord client modding for the longest time has been incredibly tightly coupled to Discord's code and assumptions that Discord does not care about improving their build pipeline.

We complain about client mods breaking a lot, but we've engineered them for convenience over sustainability.

Discord at any point could ditch Webpack and move to Vite. Discord at any point could deprecate React components we heavily use. Discord at any point could remove any of the 3 state management libraries included in the client.

Rewriting Cumcord and building it on the same principals we did before would be just as unsustainable as it was before, and it'd be even harder to develop for. It would be a shell of it's former self.

If we wanted to keep writing Discord mods we'd have to build something that isn't Cumcord.

...so we are.
![shelter logo](https://raw.githubusercontent.com/uwu/shelter/main/packages/shelter-assets/svg/banner.svg)
shelter is our new experimental Discord mod that tries to think outside of the box. We're trying things that the majority of the client modding community have ignored in favor of convenience. shelter is built to be sustainable.

Discord has engineered their client on Facebook's Flux state management paradigm. This means that the app's global state is decoupled from their React components, and also accessible in one convenient place. Other mods do use Flux, but shelter is built on it. It's the core of Discord's desktop client, and it's the least likely to change.

Other client mods rely heavily on Discord's React components. shelter aims to avoid reliance on too much Discord code, so we're creating our own components that recreate Discord's.

Discord is built on React. shelter will be built on Solid.js.

All of these small details add up, and will hopefully make shelter more sustainable than the majority of other client mods. 

You can follow shelter's development in the [uwu.network Discord server](https://web.archive.org/web/20221118170800/https://discord.gg/FhHQQrVs7U), which will also be the home for other projects from Cumcord's development team, [uwu.network](https://web.archive.org/web/20221118170800/https://uwu.network/).

Cumcord was an important part of the Discord modding community (we were the 4th most popular mod for the longest time, very cool!) and it helped me meet a lot of people I care about. Those people are still around, and I'd like to thank them for being here. I'd also like to thank anyone who supported Cumcord, you mean quite a bit to me. 

All of this is to say that Cumcord is dead, and that's okay. It wasn't built to last. 