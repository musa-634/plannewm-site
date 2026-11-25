# PlanNewm サイト

毎週ミニゲームを公開するサイト。仕様書：`../企画/newm-site/spec.md`

- 本番 URL（予定）：https://plannewm.pages.dev
- Astro の静的サイト。Cloudflare Pages で公開する

## 手元で見る

```powershell
npm install
npm run build
npm run preview
```

http://localhost:4321 を開く。ゲームは `npm run dev` でも動くが、本番に近いのは build → preview。

## 作品を追加する（毎週）

1. **作品情報**：`src/content/games/<制作開始日>.md` を作る（例 `2026-11-29.md`）。項目は `2026-11-22.md` を真似する
   - `mobile`：スマホで遊べるなら `true`。不明なら `false`（スマホでは「PC で開いてください」が出る）
   - `buildName`：Unity の `Build/<名前>.loader.js` の `<名前>` 部分
   - `theme`：作品ページの背景色・アクセント色・文字色・模様（`grid` / `none`）。省略すると黒
2. **ビルド**：Unity の Web ビルドの `Build/` フォルダを `public/games/<制作開始日>/Build/` にコピー
   - Unity 側は Player Settings > Publishing Settings で **Compression Format = Gzip か Brotli、Decompression Fallback = ON**（今までと同じ）
3. **リンクカード画像**：`public/games/<制作開始日>/card.png`（1200×630）
   - 仮の画像なら：`node tools/make-card.mjs public/games/<日付>/card.png "作品名" "#背景色" "#アクセント色" grid`
   - できればゲーム画面のスクショに、作品名と「ブラウザですぐ遊べる」を入れたものにする
4. `npm run build` → `npm run preview` で確認して push

X に貼るのは `https://plannewm.pages.dev/games/<制作開始日>/`。

## Cloudflare Pages に公開する（初回だけ）

1. GitHub に公開リポジトリを作り、この `site` フォルダを push する
2. Cloudflare のダッシュボード → Workers & Pages → 作成 → Pages → 「Git に接続」でそのリポジトリを選ぶ
3. ビルド設定
   - プロジェクト名：`plannewm`（使われていたら別名にして、`astro.config.mjs` の `site` も合わせて変える）
   - フレームワーク：Astro
   - ビルドコマンド：`npm run build`
   - 出力ディレクトリ：`dist`
   - 環境変数：`NODE_VERSION` = `24`
4. 以後は push するたびに自動で公開される
5. 公開後、X のポスト作成画面に作品ページの URL を貼り、カードに画像が出るか確認する

## 制限（Cloudflare Pages 無料プラン）

- 1 ファイル 25 MiB まで（今のビルドは最大でも 9MB 程度）
- 1 サイト 20,000 ファイルまで、月 500 ビルドまで
