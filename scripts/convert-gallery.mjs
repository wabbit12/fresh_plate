import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const srcDir = 'tmp-images'
const outDir = 'public/images/gallery'
fs.mkdirSync(outDir, { recursive: true })

const jobs = [
  { src: 'chicken-rice-side.jpg', out: 'chicken-rice-side.webp', w: 1200 },
  { src: 'chicken-rice-veg.jpg', out: 'chicken-rice-veg.webp', w: 900 },
  { src: 'adobo-side.jpg', out: 'adobo-side.webp', w: 1200 },
  { src: 'adobo-spices.jpg', out: 'adobo-spices.webp', w: 900 },
  { src: 'braised-chicken.jpg', out: 'adobo-braise.webp', w: 1200 },
  { src: 'canton-side.jpg', out: 'canton-side.webp', w: 1200 },
  { src: 'canton-wok.jpg', out: 'canton-wok.webp', w: 1200 },
  { src: 'noodles-bowl.jpg', out: 'canton-bowl.webp', w: 900 },
  { src: 'shrimp-dish.jpg', out: 'canton-shrimp.webp', w: 900 },
  { src: 'lumpia-side.jpg', out: 'lumpia-side.webp', w: 1200 },
  { src: 'lumpia-plate.jpg', out: 'lumpia-plate.webp', w: 1200 },
  { src: 'spring-rolls.jpg', out: 'lumpia-crisp.webp', w: 900 },
  { src: 'kitchen-prep.jpg', out: 'kitchen-prep.webp', w: 1400 },
  { src: 'steamed-rice.jpg', out: 'steamed-rice.webp', w: 1000 },
  { src: 'garlic-board.jpg', out: 'garlic-board.webp', w: 1000 },
  { src: 'dining-table.jpg', out: 'dining-table.webp', w: 1400 },
]

for (const job of jobs) {
  const input = path.join(srcDir, job.src)
  const output = path.join(outDir, job.out)
  await sharp(input)
    .resize(job.w, null, { withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output)
  console.log(`${job.out}: ${Math.round(fs.statSync(output).size / 1024)}KB`)
}
