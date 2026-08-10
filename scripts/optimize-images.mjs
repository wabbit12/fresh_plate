import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const imagesDir = 'public/images'
const assetsDir = 'public/assets'

const jobs = [
  { src: 'chicken rice.png', out: 'chicken-rice-thumb.webp', size: 200, q: 78 },
  { src: 'chicken adobo.png', out: 'chicken-adobo-thumb.webp', size: 200, q: 78 },
  { src: 'canton.png', out: 'canton-thumb.webp', size: 200, q: 78 },
  { src: 'lumpia.png', out: 'lumpia-thumb.webp', size: 200, q: 78 },
  { src: 'chicken rice.png', out: 'chicken-rice.webp', size: 1200, q: 80 },
  { src: 'chicken adobo2.png', out: 'chicken-adobo.webp', size: 1200, q: 80 },
  { src: 'canton2.png', out: 'canton.webp', size: 1200, q: 80 },
  { src: 'lumpia2.png', out: 'lumpia.webp', size: 1200, q: 80 },
  { src: 'person1.JPG', out: 'person1.webp', size: 96, q: 75 },
  { src: 'person2.JPG', out: 'person2.webp', size: 96, q: 75 },
  { src: 'person3.JPG', out: 'person3.webp', size: 96, q: 75 },
]

for (const job of jobs) {
  const input = path.join(imagesDir, job.src)
  const output = path.join(imagesDir, job.out)
  await sharp(input)
    .resize(job.size, job.size, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: job.q })
    .toFile(output)
  const before = fs.statSync(input).size
  const after = fs.statSync(output).size
  console.log(`${job.out}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
}

const logoIn = path.join(assetsDir, 'logo.png')
const logoOut = path.join(assetsDir, 'logo.webp')
await sharp(logoIn)
  .resize(128, 128, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(logoOut)
console.log(
  `logo.webp: ${Math.round(fs.statSync(logoIn).size / 1024)}KB -> ${Math.round(fs.statSync(logoOut).size / 1024)}KB`
)
