import { defineConfig } from "astro/config";

import Unocss from "unocss/astro";
import { presetWind, transformerVariantGroup } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetWebFonts from "@unocss/preset-web-fonts";
import transformerDirectives from "@unocss/transformer-directives";

import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [
    Unocss({
      presets: [
        presetWind(),
        presetIcons(),
        presetWebFonts({
          fonts: {
            mono: ["Fira Code"],
          },
        }),
      ],
      transformers: [transformerVariantGroup(), transformerDirectives()],
      injectReset: true,
    }),
    svelte(),
  ],
});
