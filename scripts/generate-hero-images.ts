/**
 * Generate Hero Background Images for Pages
 *
 * Generates editorial hero background images via Gemini API
 * for pages that need dark hero sections.
 *
 * Usage: npx tsx scripts/generate-hero-images.ts
 * Options:
 *   --force    Regenerate even if file exists
 *   --dry      List what would be generated without calling API
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { PROMPTS, NEGATIVE_PROMPT } from '../src/lib/og/prompts'
import type { PromptKey } from '../src/lib/og/prompts'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const HEROES_DIR = path.join(PROJECT_ROOT, 'src/assets/images/heroes')

// Gemini API config
const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

// Parse CLI args
const args = process.argv.slice(2)
const force = args.includes('--force')
const dry = args.includes('--dry')

// Hero images to generate: [filename, promptKey]
const HEROES: [string, PromptKey][] = [
  ['faq-hero.jpg', 'faq'],
  ['careers-hero.jpg', 'careers'],
  ['calculator-hero.jpg', 'calculator'],
  ['blog-index-hero.jpg', 'blog'],
  ['guide-index-hero.jpg', 'guide'],
  ['answers-index-hero.jpg', 'answers'],
  ['services-index-hero.jpg', 'fractional-cmo'],
  ['podcast-index-hero.jpg', 'podcast'],
  ['cmo-podcast-index-hero.jpg', 'podcast'],
  ['tips-hero.jpg', 'tips'],
  ['sops-tools-hero.jpg', 'training'],
  ['privacy-hero.jpg', 'default'],
  ['terms-hero.jpg', 'default'],
  ['contact-hero.jpg', 'contact'],
]

// Target dimensions for hero backgrounds (wide aspect for full-width hero)
const WIDTH = 1920
const HEIGHT = 1080

async function generateImage(promptKey: PromptKey): Promise<Buffer | null> {
  if (!API_KEY) {
    console.log('  ⚠️  No GEMINI_API_KEY')
    return null
  }

  const config = PROMPTS[promptKey]
  if (!config) {
    console.log(`  ⚠️  No prompt found for key: ${promptKey}`)
    return null
  }

  // Add hero-specific instructions to prompt
  const heroPrompt = `${config.prompt}. Wide landscape composition, 16:9 aspect ratio, suitable as background image with dark overlay for text. ${NEGATIVE_PROMPT}`

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY!
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: heroPrompt }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`  ❌ API Error: ${data.error.message}`)
      return null
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        return Buffer.from(part.inlineData.data, 'base64')
      }
    }

    console.error('  ❌ No image in API response')
    return null
  } catch (error: any) {
    console.error(`  ❌ Error: ${error.message}`)
    return null
  }
}

async function createFallbackGradient(promptKey: PromptKey): Promise<Buffer> {
  const config = PROMPTS[promptKey]
  const [startColor, endColor] = config?.fallbackGradient || [[1, 25, 7], [41, 140, 66]]

  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${startColor.join(',')});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${endColor.join(',')});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `

  return await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .jpeg({ quality: 85 })
    .toBuffer()
}

async function main() {
  console.log('🎨 Hero Image Generator')
  console.log(`   Output: ${HEROES_DIR}`)
  console.log(`   Force: ${force}`)
  console.log('')

  fs.mkdirSync(HEROES_DIR, { recursive: true })

  let generated = 0
  let skipped = 0
  let failed = 0

  for (const [filename, promptKey] of HEROES) {
    const outputPath = path.join(HEROES_DIR, filename)
    const exists = fs.existsSync(outputPath)

    if (exists && !force) {
      console.log(`⏭️  ${filename} (exists)`)
      skipped++
      continue
    }

    console.log(`🔄 ${filename} (prompt: ${promptKey})...`)

    if (dry) {
      console.log(`   Would generate from prompt: ${promptKey}`)
      continue
    }

    let imageBuffer = await generateImage(promptKey)

    if (!imageBuffer) {
      console.log('   ⚠️  Using fallback gradient')
      imageBuffer = await createFallbackGradient(promptKey)
    }

    // Process: resize to target dimensions, convert to JPEG
    const processed = await sharp(imageBuffer)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toBuffer()

    fs.writeFileSync(outputPath, processed)
    const sizeKB = Math.round(processed.length / 1024)
    console.log(`   ✅ Saved (${sizeKB}KB)`)
    generated++

    // Small delay between API calls to avoid rate limiting
    if (HEROES.indexOf([filename, promptKey] as any) < HEROES.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log('')
  console.log(`Done! Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`)
}

main().catch(console.error)
