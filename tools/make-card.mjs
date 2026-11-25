// OGP 画像（1200×630）を SVG から作る仮のツール。
// 使い方: node tools/make-card.mjs <出力パス> <タイトル> [背景色] [アクセント色] [grid|none]
// 本番ではゲーム画面のスクショに差し替えるのがおすすめ（画像の中に作品名と「ブラウザで遊べる」を入れる）。
import sharp from 'sharp';

const [out, title, bg = '#0b0b0d', accent = '#ffffff', pattern = 'none'] = process.argv.slice(2);
if (!out || !title) {
  console.error('usage: node tools/make-card.mjs <out.png> <title> [bg] [accent] [grid|none]');
  process.exit(1);
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const font = "'Yu Gothic', 'YuGothic', 'Meiryo', 'Hiragino Sans', sans-serif";
const size = title.length > 12 ? 76 : 96;

const grid =
  pattern === 'grid'
    ? `<defs>
        <pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="1"/>
        </pattern>
        <pattern id="G" width="150" height="150" patternUnits="userSpaceOnUse">
          <path d="M150 0H0V150" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.5"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <rect width="1200" height="630" fill="url(#G)"/>`
    : '';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  ${grid}
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2"/>
  <text x="90" y="140" font-family="${font}" font-size="30" font-weight="700" fill="#ffffff" fill-opacity="0.75">PlanNewm 毎週ミニゲーム</text>
  <text x="90" y="${330 + size / 3}" font-family="${font}" font-size="${size}" font-weight="900" fill="#ffffff">${esc(title)}</text>
  <rect x="90" y="455" width="420" height="80" rx="10" fill="${accent}"/>
  <text x="300" y="508" text-anchor="middle" font-family="${font}" font-size="36" font-weight="800" fill="${bg}">ブラウザですぐ遊べる</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out);
