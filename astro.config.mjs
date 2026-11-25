// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // OGP の画像・URL を絶対 URL にするため。独自ドメインに移したらここを変える
  site: 'https://plannewm.pages.dev',
  trailingSlash: 'always',
});
