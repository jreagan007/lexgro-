/**
 * OG Image Compositor for LEXGRO
 * High-quality compositing for social media preview images
 *
 * Final output: 1200x630px PNG
 *
 * Design specs:
 * - Dark gradient overlay from bottom for text readability
 * - Green accent bar on left edge (6px)
 * - Title in Be Vietnam Pro (brand display font), max 2 lines
 * - Category in Be Vietnam Pro, mint green, uppercase
 * - LEXGRO branding in bottom corners
 * - Safe area: 80px padding all sides
 * - All text has proper contrast for WCAG AA
 *
 * Brand fonts: Be Vietnam Pro (headings), DM Sans (body)
 * Brand colors: Primary green #298C42, Dark #011907, Accent orange #FF8158
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PROMPTS, HEX_COLORS, getPromptKeyFromSlug, type PromptKey } from './prompts'

const isDev = process.env.NODE_ENV !== 'production'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '../../..')
const CACHE_DIR = path.join(PROJECT_ROOT, '.cache/og-bases')
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/og')
const LOGO_PATH = path.join(PROJECT_ROOT, 'src/assets/images/logos/lexgro-wordmark.png')

// OG image dimensions (standard)
const WIDTH = 1200
const HEIGHT = 630

// Layout constants
const PADDING = 60
const ACCENT_WIDTH = 6

export interface CompositeOptions {
  /** Page slug (e.g., 'guide/fractional-cmo') */
  slug: string
  /** Page title */
  title: string
  /** Optional description */
  description?: string
  /** Override prompt key */
  promptKey?: PromptKey
  /** Force regeneration */
  force?: boolean
  /** Optional category label */
  category?: string
}

/**
 * Get or create fallback gradient image
 */
async function createFallbackBase(promptKey: PromptKey): Promise<Buffer> {
  const config = PROMPTS[promptKey]
  const [startColor, endColor] = config.fallbackGradient

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
 * Create dark gradient overlay for text readability
 */
function createOverlaySVG(): string {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.15" />
          <stop offset="30%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.35" />
          <stop offset="60%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  `
}

/**
 * Create left accent bar - LEXGRO green signature element
 */
function createAccentBarSVG(): string {
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="6" height="${HEIGHT}" fill="${HEX_COLORS.primary}" />
    </svg>
  `
}

/**
 * Escape XML special characters for SVG text
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Smart word wrap for title text
 */
function wrapTitle(title: string, maxCharsPerLine = 32): string[] {
  const words = title.split(/\s+/)
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word

    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine
    } else {
      if (currentLine) {
        lines.push(currentLine)
      }
      currentLine = word
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  // Limit to 2 lines max, truncate if needed
  if (lines.length > 2) {
    lines.length = 2
    lines[1] = lines[1].slice(0, maxCharsPerLine - 1).trim() + '…'
  }

  return lines
}

// Brand font stack (Be Vietnam Pro primary, with system fallbacks)
const FONT_DISPLAY = "'Be Vietnam Pro', 'DM Sans', 'Inter', system-ui, -apple-system, sans-serif"
const FONT_BODY = "'DM Sans', 'Inter', system-ui, sans-serif"

/**
 * Create text overlay SVG with category and title
 */
function createTextOverlaySVG(title: string, category?: string): string {
  const SAFE_PADDING = 80
  const availableWidth = WIDTH - SAFE_PADDING * 2
  const avgCharWidth = 30
  const maxChars = Math.floor(availableWidth / avgCharWidth)

  const titleLines = wrapTitle(title, maxChars)
  const isTwoLines = titleLines.length === 2

  const titleSize = isTwoLines ? 48 : 56
  const titleLineHeight = titleSize * 1.2

  // Position title in upper-middle area
  const titleFirstY = category ? HEIGHT * 0.42 : HEIGHT * 0.4
  const titleSecondY = titleFirstY + titleLineHeight

  const leftX = SAFE_PADDING

  // Category label above title
  const categoryY = titleFirstY - 50

  const titleTspans = titleLines.map((line, i) => {
    const y = i === 0 ? titleFirstY : titleSecondY
    return `<tspan x="${leftX}" y="${y}">${escapeXml(line)}</tspan>`
  }).join('')

  const categoryElement = category ? `
    <text x="${leftX}" y="${categoryY}" class="category" fill="${HEX_COLORS.mint}">
      ${escapeXml(category.toUpperCase())}
    </text>
  ` : ''

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title {
          font-family: ${FONT_DISPLAY};
          font-size: ${titleSize}px;
          font-weight: 700;
          line-height: ${titleLineHeight}px;
        }
        .category {
          font-family: ${FONT_BODY};
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      </style>

      ${categoryElement}

      <!-- Title (1-2 lines) -->
      <text class="title" fill="${HEX_COLORS.white}">
        ${titleTspans}
      </text>
    </svg>
  `
}

/**
 * Create branding element for bottom
 */
function createBrandingSVG(): string {
  const SAFE_PADDING = 80
  const brandX = SAFE_PADDING
  const brandY = HEIGHT - SAFE_PADDING

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .brand {
          font-family: ${FONT_BODY};
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
      </style>
      <text x="${brandX}" y="${brandY}" class="brand" fill="${HEX_COLORS.white}" opacity="0.7" text-anchor="start">
        LEXGRO • Law Firm CMO
      </text>
    </svg>
  `
}

/**
 * Create homepage-specific text overlay with brand messaging
 * Layout:
 * - Eyebrow: "THE LAW FIRM CMO" (mint, uppercase, tracked)
 * - Headline: "Predictable Growth." (large, white, bold)
 * - Subheadline: "Without the Guesswork." (large, white, bold)
 * - All within 80px safe area
 */
function createHomepageTextOverlaySVG(): string {
  const SAFE_PADDING = 80

  // Vertical positioning (centered in upper 2/3)
  const eyebrowY = HEIGHT * 0.32
  const headlineY = HEIGHT * 0.48
  const subheadlineY = HEIGHT * 0.62

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .eyebrow {
          font-family: ${FONT_BODY};
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .headline {
          font-family: ${FONT_DISPLAY};
          font-size: 64px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .subheadline {
          font-family: ${FONT_DISPLAY};
          font-size: 52px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
      </style>

      <!-- Eyebrow: THE LAW FIRM CMO -->
      <text x="${SAFE_PADDING}" y="${eyebrowY}" class="eyebrow" fill="${HEX_COLORS.mint}">
        THE LAW FIRM CMO
      </text>

      <!-- Headline: Predictable Growth. -->
      <text x="${SAFE_PADDING}" y="${headlineY}" class="headline" fill="${HEX_COLORS.white}">
        Predictable Growth.
      </text>

      <!-- Subheadline: Without the Guesswork. -->
      <text x="${SAFE_PADDING}" y="${subheadlineY}" class="subheadline" fill="${HEX_COLORS.white}" opacity="0.9">
        Without the Guesswork.
      </text>
    </svg>
  `
}

/**
 * Composite final OG image with all brand elements
 */
export async function compositeOGImage(options: CompositeOptions): Promise<Buffer> {
  const { slug, title, category, force = false } = options

  // Determine prompt key for base image selection
  const promptKey = options.promptKey || getPromptKeyFromSlug(slug)

  // Output path
  const outputSlug = slug.replace(/^\/+|\/+$/g, '') || 'index'
  const outputPath = path.join(OUTPUT_DIR, `${outputSlug}.png`)
  const outputDir = path.dirname(outputPath)

  // Check if already exists (skip if not forcing)
  if (!force && fs.existsSync(outputPath)) {
    isDev && console.log(`[OG] Exists: ${outputSlug}`)
    return fs.readFileSync(outputPath)
  }

  // Get base image (from cache or create fallback)
  const baseCachePath = path.join(CACHE_DIR, `${promptKey}.png`)
  let baseImage: Buffer

  if (fs.existsSync(baseCachePath)) {
    baseImage = fs.readFileSync(baseCachePath)
    isDev && console.log(`[OG] Using cached base: ${promptKey}`)
  } else {
    isDev && console.log(`[OG] Creating fallback gradient for: ${promptKey}`)
    baseImage = await createFallbackBase(promptKey)
  }

  // Create overlay buffers
  const overlayBuffer = Buffer.from(createOverlaySVG())
  const accentBuffer = Buffer.from(createAccentBarSVG())

  // Use homepage-specific text layout for homepage, otherwise standard
  const isHomepage = promptKey === 'homepage'
  const textBuffer = isHomepage
    ? Buffer.from(createHomepageTextOverlaySVG())
    : Buffer.from(createTextOverlaySVG(title, category))
  const brandingBuffer = Buffer.from(createBrandingSVG())

  // Start compositing
  let composite = sharp(baseImage)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .png()

  // Layer 1: Dark gradient overlay
  composite = sharp(await composite.toBuffer()).composite([
    { input: overlayBuffer, blend: 'over' },
  ])

  // Layer 2: Green accent bar
  composite = sharp(await composite.toBuffer()).composite([
    { input: accentBuffer, blend: 'over' },
  ])

  // Layer 3: Text (category + title)
  composite = sharp(await composite.toBuffer()).composite([
    { input: textBuffer, blend: 'over' },
  ])

  // Layer 4: Branding
  composite = sharp(await composite.toBuffer()).composite([
    { input: brandingBuffer, blend: 'over' },
  ])

  // Add LEXGRO logo (bottom right)
  const SAFE_PADDING = 80
  if (fs.existsSync(LOGO_PATH)) {
    try {
      const logo = await sharp(LOGO_PATH)
        .resize(140, 40, { fit: 'inside' })
        .toBuffer()

      composite = sharp(await composite.toBuffer()).composite([
        {
          input: logo,
          top: HEIGHT - SAFE_PADDING - 40,
          left: WIDTH - SAFE_PADDING - 140,
        },
      ])
    } catch (e) {
      // Logo not critical, continue without it
    }
  }

  // Generate final PNG
  const result = await composite
    .png({ quality: 90, compressionLevel: 6 })
    .toBuffer()

  // Ensure output directory exists and save
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(outputPath, result)

  const sizeKB = Math.round(result.length / 1024)
  isDev && console.log(`[OG] Generated: ${outputSlug}.png (${sizeKB}KB)`)

  return result
}

/**
 * Generate OG image and return the URL path
 */
export async function getOGImageUrl(
  slug: string,
  title: string,
  category?: string,
  baseUrl = ''
): Promise<string> {
  await compositeOGImage({ slug, title, category })
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '') || 'index'
  return `${baseUrl}/og/${normalizedSlug}.png`
}

/**
 * Batch generate OG images for multiple pages
 */
export async function batchGenerateOGImages(
  pages: Array<{ slug: string; title: string; category?: string }>
): Promise<{ success: number; failed: number }> {
  isDev && console.log(`\n[OG] Batch generating ${pages.length} images...\n`)

  let success = 0
  let failed = 0

  for (const page of pages) {
    try {
      await compositeOGImage(page)
      success++
    } catch (err: any) {
      console.error(`[OG] Failed: ${page.slug} - ${err.message}`)
      failed++
    }
  }

  isDev && console.log(`\n[OG] Batch complete: ${success} success, ${failed} failed\n`)
  return { success, failed }
}
