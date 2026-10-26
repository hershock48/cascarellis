/**
 * One command per photo from the phone to the site.
 *
 *   node tools/ingest-photo.mjs <source-file> <slug> [<source-file> <slug> ...]
 *
 * Writes public/photos/<slug>.jpg, which is the path src/data/photos.ts points
 * at. Same shape as Devine's ingest-photo.mjs and the True North photo folder,
 * cut down because this site has nine named slots rather than a catalog: the
 * slug is given on the command line, and the slot's `src` in photos.ts is
 * still the human's edit, so a photo cannot go live under the wrong name by
 * accident.
 *
 * What the pipeline does, and why each step is there:
 *  - rotate(): bakes the EXIF orientation flag into the pixels. A phone shot
 *    is stored sideways with a flag, and next/image serves the pixels as they
 *    are, so without this a portrait pizza ships lying on its side.
 *  - metadata is DROPPED. sharp writes none unless asked, and that is the
 *    point: a phone photo carries the GPS fix of wherever it was taken, and a
 *    restaurant's address is public but the owner's kitchen at home is not.
 *  - 1600px long edge, no enlargement. The widest any slot renders is ~64rem
 *    on the about page; next/image cuts the responsive sizes from this.
 *  - JPEG, mozjpeg, quality 82. next/image re-encodes to WebP/AVIF per
 *    request, so the committed file only has to be a clean, modest source:
 *    the five August 2026 shots land at 250 to 450KB each.
 *
 * Nothing here deploys. Set `src` in src/data/photos.ts, then commit and push.
 */
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/photos");
const LONG_EDGE = 1600;

const args = process.argv.slice(2);
if (args.length === 0 || args.length % 2 !== 0) {
  console.error("usage: node tools/ingest-photo.mjs <source-file> <slug> [<source-file> <slug> ...]");
  process.exit(1);
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

mkdirSync(OUT_DIR, { recursive: true });

for (let i = 0; i < args.length; i += 2) {
  const file = path.resolve(args[i]);
  const slug = args[i + 1];
  if (!SLUG_RE.test(slug)) {
    console.error(`bad slug "${slug}": lowercase words joined by hyphens, e.g. steak-alfredo`);
    process.exit(1);
  }
  try {
    statSync(file);
  } catch {
    console.error(`no such file: ${args[i]}`);
    process.exit(1);
  }

  const out = path.join(OUT_DIR, `${slug}.jpg`);
  const info = await sharp(file)
    .rotate()
    .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);

  console.log(`${slug}  ->  public/photos/${slug}.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
  if (Math.max(info.width, info.height) < 1200) {
    console.warn(`  WARNING: ${slug} is only ${info.width}x${info.height}; it will look soft at full width. Ask for a larger original.`);
  }
}

console.log(`\nnext: set \`src: "/photos/<slug>.jpg"\` on the slot in src/data/photos.ts, then commit public/photos and push.`);
