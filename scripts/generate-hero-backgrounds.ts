/**
 * Generate Editorial Hero Background Images
 *
 * Creates 35mm documentary-style background images for page heroes
 * using Gemini image generation API.
 *
 * Usage: npx tsx scripts/generate-hero-backgrounds.ts
 *
 * Options:
 *   --force    Regenerate even if file exists
 *   --page=X   Generate only specific page (how-we-work, lexxly, results)
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/assets/images/heroes')

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

// Parse CLI args
const args = process.argv.slice(2)
const force = args.includes('--force')
const pageArg = args.find(a => a.startsWith('--page='))?.split('=')[1]

interface HeroConfig {
  filename: string
  prompt: string
}

const HEROES: HeroConfig[] = [
  {
    filename: 'about-hero.jpg',
    prompt: `Corner office with floor-to-ceiling windows overlooking tree-lined landscape, afternoon light through wooden blinds casting warm striped shadows across credenza, green potted plant on windowsill, worn leather executive chair pushed back from desk suggesting recent conversation, stack of folders and coffee mug left behind, authentic lived-in professional atmosphere, 1980s corporate documentary photography, shot on Kodak Gold 200 35mm film, natural grain, warm golden muted tones, dust motes visible in light shafts, no people, no readable text, no logos, no computer screens`
  },
  {
    filename: 'how-we-work-hero.jpg',
    prompt: `Systematic workflow station in architectural office space, three organized work zones visible in sequence along a long wooden table, research binders leading to drafting area leading to outbox, morning light streaming through tall industrial windows, interconnected stations suggesting methodical process, warm golden tones on wood surfaces, 1990s operations documentary photography, shot on Fuji Pro 400H 35mm film, natural grain, warm muted professional tones, no people visible, no readable text, no logos, no computer screens, authentic integrated workflow aesthetic`
  },
  {
    filename: 'lexxly-hero.jpg',
    prompt: `Strategic intelligence workspace at dusk, research materials and data printouts spread across a large mahogany desk, magnifying glass on top of stacked reports, warm desk lamp casting focused pool of light, tall bookshelves with reference materials in background slightly out of focus, analytical detective-like atmosphere, 1980s research operations photography, shot on Kodak Portra 400 35mm film, natural grain, warm amber and cool shadow tones, no people visible, no readable text on documents, no computer screens, no logos, authentic data-driven intelligence aesthetic`
  },
  {
    filename: 'results-hero.jpg',
    prompt: `Achievement display on polished dark wood credenza, framed certificates and awards arranged with morning light catching the glass, tall green plant beside trophies, warm golden hour light through window blinds casting horizontal lines across wall, sense of accomplishment and proven track record, 1980s corporate documentary photography, shot on Kodak Gold 200 35mm film, natural grain, warm muted professional tones, no readable text on certificates, no faces, no logos visible, authentic professional success atmosphere`
  }
]

async function generateImage(hero: HeroConfig): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, hero.filename)

  if (!force && fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${hero.filename} (exists). Use --force to regenerate.`)
    return
  }

  if (!API_KEY) {
    console.error('❌ No GEMINI_API_KEY in .env')
    return
  }

  console.log(`\n🎨 Generating: ${hero.filename}...`)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: hero.prompt
          }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`❌ API Error for ${hero.filename}: ${data.error.message}`)
      return
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        fs.mkdirSync(OUTPUT_DIR, { recursive: true })
        fs.writeFileSync(outputPath, buffer)
        const sizeKB = Math.round(buffer.length / 1024)
        console.log(`✅ Generated: ${hero.filename} (${sizeKB}KB)`)
        return
      }
    }

    console.error(`❌ No image in response for ${hero.filename}`)
  } catch (error: any) {
    console.error(`❌ Error generating ${hero.filename}:`, error.message)
  }
}

async function main() {
  console.log('🖼️  Generating Editorial Hero Backgrounds\n')

  const toGenerate = pageArg
    ? HEROES.filter(h => h.filename.includes(pageArg))
    : HEROES

  if (toGenerate.length === 0) {
    console.log(`❌ No matching page for: ${pageArg}`)
    return
  }

  // Generate sequentially to avoid API rate limits
  for (const hero of toGenerate) {
    await generateImage(hero)
  }

  console.log('\n✅ Done!')
}

main().catch(console.error)
