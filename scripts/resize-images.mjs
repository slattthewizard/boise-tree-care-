import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';

const IMAGES_DIR = path.resolve('images');
const SIZES = [400, 800, 1600];

async function run() {
  const files = await readdir(IMAGES_DIR);
  const webpFiles = files.filter(f => f.endsWith('.webp') && !/-\d+\.webp$/.test(f));
  const manifest = {};

  for (const file of webpFiles) {
    const filePath = path.join(IMAGES_DIR, file);
    const img = sharp(filePath);
    const meta = await img.metadata();
    const baseName = file.replace(/\.webp$/, '');

    manifest[file] = { width: meta.width, height: meta.height };
    console.log(`Processing: ${file} (${meta.width}x${meta.height})`);

    for (const targetW of SIZES) {
      const outName = `${baseName}-${targetW}.webp`;
      const outPath = path.join(IMAGES_DIR, outName);

      // Skip if target width >= original (just copy for the largest size)
      if (targetW >= meta.width) {
        await sharp(filePath).toFile(outPath);
        console.log(`  -> ${outName} (original size ${meta.width}px)`);
      } else {
        await sharp(filePath)
          .resize(targetW)
          .webp({ quality: 80 })
          .toFile(outPath);
        const outMeta = await sharp(outPath).metadata();
        console.log(`  -> ${outName} (${outMeta.width}x${outMeta.height})`);
      }
    }
  }

  console.log('\n--- MANIFEST ---');
  console.log(JSON.stringify(manifest, null, 2));
}

run().catch(err => { console.error(err); process.exit(1); });
