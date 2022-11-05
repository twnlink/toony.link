import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import Unocss from "unocss/vite";
import { presetWind, transformerVariantGroup } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    Unocss({
      presets: [presetWind(), presetIcons(), presetWebFonts({
        fonts: {
          mono: ["Fira Code"]
        }
      })],
      transformers: [transformerVariantGroup(), transformerDirectives()],
    }),
  ],
  ssr: {
    noExternal: ["three", "troika-three-text"],
  },
});
