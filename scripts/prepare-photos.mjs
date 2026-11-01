import fs from 'node:fs/promises';
import sharp from 'sharp';

await fs.mkdir('public/images/photos', { recursive: true });
// The studio logo is retained locally. Facebook's signed image URL expires;
// do not make builds or this refresh script depend on its CDN.
const photos = [
  ['paint-table', 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=1800&q=85&fit=crop', 1800],
  ['paint-colors', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1000&q=85&fit=crop', 1000],
  ['macrame', 'https://images.unsplash.com/photo-1776721977064-d4e5389db6b9?w=1000&q=85&fit=crop', 1000],
  ['craft-table', 'https://images.unsplash.com/photo-1631945868106-7919f6a8a6d7?w=1100&q=85&fit=crop', 1100],
  ['painting-hands', 'https://images.unsplash.com/photo-1752649935486-a4ecab4d5cb8?w=1400&q=85&fit=crop', 1400],
  ['felting', 'https://images.unsplash.com/photo-1773270834657-98ef82633566?w=1000&q=85&fit=crop', 1000],
  ['mosaic', 'https://images.unsplash.com/photo-1548991099-3755fc1227d6?w=1000&q=85&fit=crop', 1000],
];
await Promise.all(photos.map(async ([name, url, width]) => {
  if (!url) throw new Error(`Missing source: ${name}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const result = await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/photos/${name}.webp`);
  console.log(name, result.width, result.height, `${Math.round(result.size / 1024)} KB`);
}));
