import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

import Unocss from "unocss/astro";
import { presetWind, transformerVariantGroup } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  integrations: [
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
});
