<script>
  import {
    Canvas,
    AmbientLight,
    PerspectiveCamera,
    OrbitControls,
  } from "@threlte/core";
  import { GLTF, ContactShadows } from "@threlte/extras";

  let be_furry = window.location.hash == "#thepipeline" ? true : false
  $: model = be_furry ? "/models/linkbutfurry.glb" : "/models/link.glb"
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) be_furry = !be_furry
  });
</script>

<div class="me">
  <span class="text-2xl"
    >this is me.
    <p />
    <div class="i-bi-arrow-down inline-block"><div /></div></span
  >

  <Canvas>
    <PerspectiveCamera position={{ x: 5, y: 5, z: 10 }} lookAt={{ x: 100, y: 200, z: 300}} fov={60}>
      <OrbitControls target={{ y: 3.5}} autoRotate enableDamping />
    </PerspectiveCamera>
    <AmbientLight />
    <GLTF url={model} scale={6} />
    <ContactShadows
      opacity={1}
      scale={10}
      blur={0}
      far={10}
      resolution={50}
      color="#000000"
    />
  </Canvas>
</div>

<style>
  .me {
    width: 100%;
    height: 100%;
  }
</style>
