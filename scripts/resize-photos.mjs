import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const directory = 'public/images/photos';
const sizes = [96, 160, 320, 480, 640, 960, 1280, 1600];
const files = (await fs.readdir(directory)).filter(file => file.endsWith('.webp') && !/-\d+\.webp$/.test(file));
await Promise.all(files.map(async file => {
  await Promise.all(sizes.map(async width => {
    const output = file.replace(/\.webp$/, `-${width}.webp`);
    await sharp(path.join(directory, file)).resize({ width, withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(path.join(directory, output));
  }));
  console.log(`Responsive sizes ready: ${file}`);
}));
