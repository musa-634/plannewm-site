import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 作品 1 本 = src/content/games/<slug>.md 1 ファイル。slug はファイル名（制作開始日 YYYY-MM-DD）。
const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    no: z.number().optional(), // 毎週ミニゲーム No.
    date: z.coerce.date(),
    summary: z.string(),
    controls: z.string().optional(),
    playable: z.boolean().default(true), // false なら紹介のみ
    mobile: z.boolean().default(false), // スマホで遊べるか
    buildName: z.string().default('build'), // Build/<buildName>.loader.js
    aspect: z.string().default('16 / 9'),
    theme: z
      .object({
        bg: z.string().optional(), // 背景色
        accent: z.string().optional(), // アクセント色
        text: z.string().optional(), // 文字色
        pattern: z.enum(['none', 'grid']).default('none'), // 背景の模様
      })
      .default({ pattern: 'none' }),
  }),
});

export const collections = { games };
