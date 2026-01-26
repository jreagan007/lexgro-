/**
 * Generate Branded Homepage OG Image for LEXGRO
 *
 * Creates a professional OG image with:
 * - Editorial background (executive boardroom/growth aesthetic)
 * - Brand messaging: "THE LAW FIRM CMO" / "Predictable Growth."
 * - LEXGRO branding and logo
 * - Proper safe areas (80px padding)
 * - Brand fonts: Be Vietnam Pro, DM Sans
 *
 * Usage: npx tsx scripts/generate-homepage-og.ts
 *
 * Options:
 *   --force    Regenerate even if file exists
 *   --base     Generate new base image via Gemini API
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { PROMPTS, HEX_COLORS } from '../src/lib/og/prompts'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

// Paths
const CACHE_DIR = path.join(PROJECT_ROOT, '.cache/og-bases')
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/og')
const ASSETS_DIR = path.join(PROJECT_ROOT, 'src/assets/images')
const LOGO_PATH = path.join(ASSETS_DIR, 'logos/lexgro-wordmark.png')
const BRAND_CARDS_DIR = path.join(ASSETS_DIR, 'brand-cards')

// OG image dimensions
const WIDTH = 1200
const HEIGHT = 630
const SAFE_PADDING = 80

// Brand fonts (with system fallbacks for SVG)
const FONT_DISPLAY = "'Be Vietnam Pro', 'DM Sans', 'Inter', system-ui, -apple-system, sans-serif"
const FONT_BODY = "'DM Sans', 'Inter', system-ui, sans-serif"

// Gemini API config
const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

// Parse CLI args
const args = process.argv.slice(2)
const force = args.includes('--force')
const generateBase = args.includes('--base')

/**
 * Generate base image via Gemini API
 */
async function generateBaseImage(): Promise<Buffer | null> {
  if (!API_KEY) {
    console.log('⚠️  No GEMINI_API_KEY - using fallback gradient')
    return null
  }

  console.log('🎨 Generating editorial base image via Gemini...')

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
            text: PROMPTS.homepage.prompt
          }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`❌ API Error: ${data.error.message}`)
      return null
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        console.log('✅ Base image generated')

        // Cache it
        fs.mkdirSync(CACHE_DIR, { recursive: true })
        fs.writeFileSync(path.join(CACHE_DIR, 'homepage.png'), buffer)

        return buffer
      }
    }

    console.error('❌ No image in API response')
    return null

  } catch (error: any) {
    console.error('❌ Error generating base:', error.message)
    return null
  }
}

/**
 * Create fallback gradient background
 */
async function createFallbackBase(): Promise<Buffer> {
  const [startColor, endColor] = PROMPTS.homepage.fallbackGradient

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

  return await sharp(Buffer.from(svg)).png().toBuffer()
}

/**
 * Create dramatic gradient overlay with brand green tint
 */
function createOverlaySVG(): string {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Diagonal gradient from bottom-left to top-right -->
        <linearGradient id="overlay" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.95" />
          <stop offset="40%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.75" />
          <stop offset="70%" style="stop-color:${HEX_COLORS.darkAlt};stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:${HEX_COLORS.primary};stop-opacity:0.25" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  `
}

/**
 * Create green accent bar on left edge
 */
function createAccentBarSVG(): string {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="6" height="${HEIGHT}" fill="${HEX_COLORS.primary}" />
    </svg>
  `
}

/**
 * Create homepage brand messaging text overlay
 *
 * Layout (within safe area, left-aligned):
 * - Accent line (green bar above eyebrow)
 * - Eyebrow: "THE LAW FIRM CMO" (mint, uppercase, tracked)
 * - Headline: "Predictable Growth." (76px, white, bold)
 * - Subheadline: "Without the Guesswork." (40px, white, lighter)
 *
 * Positioned in lower-left for dramatic impact with upward imagery
 */
function createHomepageTextSVG(): string {
  // Position text group in lower portion for upward-looking images
  const accentLineY = HEIGHT * 0.42
  const eyebrowY = HEIGHT * 0.50
  const headlineY = HEIGHT * 0.62
  const subheadlineY = HEIGHT * 0.74

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .eyebrow {
          font-family: ${FONT_BODY};
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .headline {
          font-family: ${FONT_DISPLAY};
          font-size: 76px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .subheadline {
          font-family: ${FONT_DISPLAY};
          font-size: 38px;
          font-weight: 500;
          letter-spacing: 0;
        }
      </style>

      <!-- Accent line above eyebrow -->
      <rect x="${SAFE_PADDING}" y="${accentLineY}" width="60" height="4" fill="${HEX_COLORS.mint}" />

      <!-- Eyebrow: THE LAW FIRM CMO -->
      <text x="${SAFE_PADDING}" y="${eyebrowY}" class="eyebrow" fill="${HEX_COLORS.mint}">
        THE LAW FIRM CMO
      </text>

      <!-- Headline: Predictable Growth. -->
      <text x="${SAFE_PADDING}" y="${headlineY}" class="headline" fill="${HEX_COLORS.white}">
        Predictable Growth.
      </text>

      <!-- Subheadline: Without the Guesswork. -->
      <text x="${SAFE_PADDING}" y="${subheadlineY}" class="subheadline" fill="${HEX_COLORS.white}" opacity="0.85">
        Without the Guesswork.
      </text>
    </svg>
  `
}

/**
 * Create bottom branding text
 */
function createBrandingSVG(): string {
  const brandY = HEIGHT - SAFE_PADDING + 8

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .brand {
          font-family: ${FONT_BODY};
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
      </style>
      <text x="${SAFE_PADDING}" y="${brandY}" class="brand" fill="${HEX_COLORS.white}" opacity="0.55">
        lexgro.com
      </text>
    </svg>
  `
}

/**
 * Composite final homepage OG image
 */
async function compositeHomepageOG(): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, 'homepage.png')

  // Check if exists
  if (!force && fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping (already exists). Use --force to regenerate.`)
    console.log(`📍 ${outputPath}`)
    return
  }

  console.log('\n🖼️  Compositing LEXGRO Homepage OG Image\n')

  // Get base image
  let baseImage: Buffer

  // Try brand-cards first (pre-made branded background)
  const brandCardPath = path.join(BRAND_CARDS_DIR, 'og-homepage.png')
  const cachedPath = path.join(CACHE_DIR, 'homepage.png')

  if (generateBase) {
    const generated = await generateBaseImage()
    if (generated) {
      baseImage = generated
    } else {
      baseImage = await createFallbackBase()
    }
  } else if (fs.existsSync(brandCardPath)) {
    console.log('📷 Using brand-cards background')
    baseImage = fs.readFileSync(brandCardPath)
  } else if (fs.existsSync(cachedPath)) {
    console.log('📷 Using cached base image')
    baseImage = fs.readFileSync(cachedPath)
  } else {
    console.log('🎨 Creating fallback gradient background')
    baseImage = await createFallbackBase()
  }

  // Create all overlay buffers
  const overlayBuffer = Buffer.from(createOverlaySVG())
  const accentBuffer = Buffer.from(createAccentBarSVG())
  const textBuffer = Buffer.from(createHomepageTextSVG())
  const brandingBuffer = Buffer.from(createBrandingSVG())

  // Start compositing
  console.log('🔧 Compositing layers...')

  let composite = sharp(baseImage)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .png()

  // Layer 1: Base image resized
  let buffer = await composite.toBuffer()

  // Layer 2: Dark gradient overlay
  composite = sharp(buffer).composite([
    { input: overlayBuffer, blend: 'over' }
  ])
  buffer = await composite.toBuffer()

  // Layer 3: Green accent bar
  composite = sharp(buffer).composite([
    { input: accentBuffer, blend: 'over' }
  ])
  buffer = await composite.toBuffer()

  // Layer 4: Brand messaging text
  composite = sharp(buffer).composite([
    { input: textBuffer, blend: 'over' }
  ])
  buffer = await composite.toBuffer()

  // Layer 5: Bottom branding
  composite = sharp(buffer).composite([
    { input: brandingBuffer, blend: 'over' }
  ])
  buffer = await composite.toBuffer()

  // Layer 6: LEXGRO logo (bottom right)
  if (fs.existsSync(LOGO_PATH)) {
    try {
      const logo = await sharp(LOGO_PATH)
        .resize(160, 45, { fit: 'inside' })
        .toBuffer()

      composite = sharp(buffer).composite([
        {
          input: logo,
          top: HEIGHT - SAFE_PADDING - 30,
          left: WIDTH - SAFE_PADDING - 160,
        }
      ])
      buffer = await composite.toBuffer()
      console.log('✅ Added LEXGRO logo')
    } catch (e) {
      console.log('⚠️  Logo not added (file issue)')
    }
  }

  // Final output
  const result = await sharp(buffer)
    .png({ quality: 90, compressionLevel: 6 })
    .toBuffer()

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.writeFileSync(outputPath, result)

  const sizeKB = Math.round(result.length / 1024)
  console.log(`\n✅ Generated: homepage.png (${sizeKB}KB)`)
  console.log(`📍 ${outputPath}\n`)

  // Also copy to public root for default og-image.png
  const defaultPath = path.join(PROJECT_ROOT, 'public/og-image.png')
  fs.copyFileSync(outputPath, defaultPath)
  console.log(`📍 Also copied to: ${defaultPath}\n`)
}

// Run
compositeHomepageOG().catch(console.error)
