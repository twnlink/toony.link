<script>
  import {
    Canvas,
    T,
  } from "@threlte/core";
  import { GLTF, ContactShadows, OrbitControls } from "@threlte/extras";
  import { theme } from "../theme";

  $: model = $theme ? "/models/linkbutfurry.glb" : "/models/link.glb"
</script>

<div class="me">
  <span class="text-2xl">
    this is me.
    <p></p>
    <div class="i-bi-arrow-down inline-block"></div>
  </span>

  <Canvas>
    <T.PerspectiveCamera makeDefault position={[5, 5, 10]} fov={60}>
      <OrbitControls autoRotate enableDamping enableZoom target={[0, 3.5, 0]} />
    </T.PerspectiveCamera>

    <T.AmbientLight />
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