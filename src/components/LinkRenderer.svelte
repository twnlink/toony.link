<script>
  import {
    Canvas,
    AmbientLight,
    PerspectiveCamera,
    OrbitControls,
  } from "@threlte/core";
  import { GLTF, ContactShadows } from "@threlte/extras";
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
    <GLTF url={"/models/link.glb"} scale={6} />
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
