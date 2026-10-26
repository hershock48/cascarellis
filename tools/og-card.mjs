/**
 * The link card: the one image every share of the site shows.
 *
 *   node tools/og-card.mjs
 *
 * Crops the hero pizza (public/photos/pizza.jpg) to 1200x630 and writes
 * public/og/pizza.jpg. The crop window is chosen by hand rather than
 * centre-cropped: the shot is portrait with the storefront sign in the top
 * half and the pizza in the bottom, and a centre crop at 1.9:1 would frame
 * the brick sill between them. The window below holds the whole pie with
 * the planter and the brick behind it, which is the card that makes someone
 * tap through.
 *
 * Re-run after re-ingesting the hero photo. Nothing here deploys.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/photos/pizza.jpg");
const OUT_DIR = path.join(ROOT, "public/og");
const OUT = path.join(OUT_DIR, "pizza.jpg");

mkdirSync(OUT_DIR, { recursive: true });

const meta = await sharp(SRC).metadata();
// Window: full width, 1200:630 aspect, anchored so the pie sits in the lower
// two thirds. Expressed as fractions of the source so a re-ingest at another
// size keeps the same framing.
const width = meta.width;
const height = Math.round((width * 630) / 1200);
const top = Math.min(meta.height - height, Math.round(meta.height * 0.5));

const info = await sharp(SRC)
  .extract({ left: 0, top, width, height })
  .resize(1200, 630)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT);

console.log(`public/og/pizza.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB  (window top=${top} of ${meta.height})`);
