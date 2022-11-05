<script>
  import {
    Canvas,
    AmbientLight,
    PerspectiveCamera,
    OrbitControls,
  } from "@threlte/core";
  import { GLTF, ContactShadows } from "@threlte/extras";
</script>

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

<style>
:global(canvas) {
  width: inherit !important;
  height: inherit !important;
}
</style>