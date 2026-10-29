/**
 * Downloads the chosen stand-in photos from Wikimedia Commons, crops and encodes them, and
 * writes public/media/CREDITS.json. The choice lives in scripts/photo-selection.json
 * (output file → Commons file title), so the set can be rebuilt at any time.
 *
 *   node scripts/fetch-photos.mjs            # every photo not yet on disk
 *   node scripts/fetch-photos.mjs --force    # all of them again
 *
 * To use a client photo instead, drop it in public/media/... under the same name and
 * remove its line from the selection: nothing else references the source.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA = join(ROOT, 'public', 'media');
const selection = JSON.parse(readFileSync(join(ROOT, 'scripts', 'photo-selection.json'), 'utf8'));
const force = process.argv.includes('--force');
const UA = 'AliomSiteBuilder/1.0 (contact: info@aliomtrading.com)';

/** Output size per folder: every photo is a 3:2 banner or card. */
const SIZE = {
  categories: { width: 1800, height: 1200, quality: 68 },
  scenes: { width: 1800, height: 1200, quality: 68 },
  blog: { width: 1800, height: 1200, quality: 68 },
};

const creditsFile = join(MEDIA, 'CREDITS.json');
const credits = existsSync(creditsFile) ? JSON.parse(readFileSync(creditsFile, 'utf8')) : {};

/** curl with retries: Commons times out or throttles now and then. */
function curl(args) {
  for (let attempt = 1; ; attempt++) {
    try {
      return execFileSync('curl', args, { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
    } catch (error) {
      if (attempt >= 4) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000 * attempt);
    }
  }
}

const meta = (title) => {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&format=json&titles=${encodeURIComponent(title)}`;
  const data = JSON.parse(curl(['-s', '-f', '--max-time', '60', '-A', UA, url]).toString('utf8'));
  const info = Object.values(data.query.pages)[0].imageinfo[0];
  const m = info.extmetadata;
  return {
    source: info.descriptionurl,
    licence: m.LicenseShortName?.value ?? '',
    author: (m.Artist?.value ?? '').replace(/<[^>]+>/g, '').trim(),
  };
};

for (const [out, entry] of Object.entries(selection)) {
  const { title, position = 'centre', crop, quality } = typeof entry === 'string' ? { title: entry } : entry;
  const target = join(MEDIA, out);
  if (existsSync(target) && !force) {
    // On disk from an earlier, interrupted run: only the credit may be missing.
    if (!credits[out] || credits[out].title !== title) {
      credits[out] = { title, ...meta(title) };
      writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + '\n');
    }
    continue;
  }

  const folder = out.split('/')[0];
  const size = SIZE[folder] ?? SIZE.scenes;
  const tmp = join(tmpdir(), `aliom-${out.replace(/\W/g, '_')}.jpg`);
  const file = title.replace(/^File:/, '');
  curl([
    '-s', '-f', '-L', '--max-time', '120', '-A', UA, '-o', tmp,
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${size.width * 1.25}`,
  ]);

  mkdirSync(dirname(target), { recursive: true });
  // `crop` keeps a part of the frame first, in fractions: { left, top, width, height }.
  // `quality` overrides the folder's, for busy frames that would otherwise weigh 500 KB.
  let source = await sharp(tmp).rotate().toBuffer();
  if (crop) {
    const { width, height } = await sharp(source).metadata();
    source = await sharp(source)
      .extract({
        left: Math.round(crop.left * width),
        top: Math.round(crop.top * height),
        width: Math.round(crop.width * width),
        height: Math.round(crop.height * height),
      })
      .toBuffer();
  }
  const info = await sharp(source)
    .resize(size.width, size.height, { fit: 'cover', position })
    .webp({ quality: quality ?? size.quality })
    .toFile(target);
  unlinkSync(tmp);

  credits[out] = { title, ...meta(title) };
  writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + '\n');
  console.log(`${out}  ${Math.round(info.size / 1024)} KB  ← ${title}`);
  await new Promise((r) => setTimeout(r, 1200));
}

writeFileSync(creditsFile, JSON.stringify(credits, null, 2) + '\n');
console.log(`credits: ${Object.keys(credits).length} entries in public/media/CREDITS.json`);
