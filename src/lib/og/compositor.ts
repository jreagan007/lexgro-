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
 * Create dark overlay for text readability (simple solid works better with Sharp)
 */
function createOverlaySVG(): string {
  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="rgba(0,0,0,0.45)"/></svg>`
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
 * Create text overlay SVG with category, title, URL - all in safe area
 */
function createTextOverlaySVG(title: string, category?: string): string {
  const P = 80
  const maxChars = 26

  const titleLines = wrapTitle(title, maxChars)
  const isTwoLines = titleLines.length === 2
  const titleSize = isTwoLines ? 44 : 52

  const titleElements = titleLines.map((line, i) => {
    const y = P + 120 + (i * titleSize * 1.2)
    return `<text x="${P}" y="${y}" font-family="sans-serif" font-size="${titleSize}" font-weight="bold" fill="${HEX_COLORS.white}">${escapeXml(line)}</text>`
  }).join('\n      ')

  const categoryElement = category ? `
      <text x="${P}" y="${P + 40}" font-family="sans-serif" font-size="18" font-weight="bold" letter-spacing="4" fill="${HEX_COLORS.mint}">${escapeXml(category.toUpperCase())}</text>` : ''

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">${categoryElement}

      ${titleElements}

      <text x="${P}" y="${HEIGHT - P + 5}" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">lexgro.com</text>
    </svg>
  `
}

/**
 * Create branding element for bottom
 */
function createBrandingSVG(): string {
  const P = 80
  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="${WIDTH - P}" y="${HEIGHT - P}" font-family="sans-serif" font-size="16" font-weight="bold" fill="rgba(255,255,255,0.7)" text-anchor="end">LEXGRO</text>
    </svg>
  `
}

/**
 * Create CTA button as PNG
 */
async function createCTAButton(text: string, width: number = 280): Promise<Buffer> {
  const height = 44

  // Create solid green rectangle
  const greenBtn = await sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: { r: 41, g: 140, b: 66, alpha: 1 }
    }
  }).png().toBuffer()

  // Add text
  const textSvg = `<svg width="${width}" height="${height}"><text x="${width / 2}" y="28" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">${text}</text></svg>`

  const result = await sharp(greenBtn)
    .composite([{ input: Buffer.from(textSvg), blend: 'over' }])
    .png()
    .toBuffer()

  return result
}

/**
 * Create homepage-specific text overlay - punchy, safe area
 */
function createHomepageTextOverlaySVG(): string {
  const P = 80

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="${P}" y="${P + 40}" font-family="sans-serif" font-size="18" font-weight="bold" letter-spacing="4" fill="${HEX_COLORS.mint}">THE LAW FIRM CMO</text>
      <text x="${P}" y="${P + 120}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">Marketing That</text>
      <text x="${P}" y="${P + 185}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">Actually Works.</text>
      <text x="${P}" y="${HEIGHT - P + 5}" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">lexgro.com</text>
    </svg>
  `
}

/**
 * Create How We Work text overlay - punchy, safe area
 */
function createHowWeWorkTextOverlaySVG(): string {
  const P = 80

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="${P}" y="${P + 40}" font-family="sans-serif" font-size="18" font-weight="bold" letter-spacing="4" fill="${HEX_COLORS.mint}">THE SYSTEM</text>
      <text x="${P}" y="${P + 120}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">A System.</text>
      <text x="${P}" y="${P + 185}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">Not Services.</text>
      <text x="${P}" y="${HEIGHT - P + 5}" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">lexgro.com</text>
    </svg>
  `
}

/**
 * Create LEXXLY text overlay - punchy, safe area
 */
function createLexxlyTextOverlaySVG(): string {
  const P = 80

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text x="${P}" y="${P + 40}" font-family="sans-serif" font-size="18" font-weight="bold" letter-spacing="4" fill="${HEX_COLORS.mint}">INTELLIGENCE PLATFORM</text>
      <text x="${P}" y="${P + 120}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">Data That Drives</text>
      <text x="${P}" y="${P + 185}" font-family="sans-serif" font-size="56" font-weight="bold" fill="${HEX_COLORS.white}">Decisions.</text>
      <text x="${P}" y="${HEIGHT - P + 5}" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">lexgro.com</text>
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

  // Use page-specific text layouts for key pages, otherwise standard
  let textBuffer: Buffer
  if (promptKey === 'homepage') {
    textBuffer = Buffer.from(createHomepageTextOverlaySVG())
  } else if (promptKey === 'how-we-work' || promptKey === 'preview-how-we-work') {
    textBuffer = Buffer.from(createHowWeWorkTextOverlaySVG())
  } else if (promptKey === 'lexxly' || promptKey === 'preview-lexxly') {
    textBuffer = Buffer.from(createLexxlyTextOverlaySVG())
  } else {
    textBuffer = Buffer.from(createTextOverlaySVG(title, category))
  }
  const brandingBuffer = Buffer.from(createBrandingSVG())

  // CTA Button setup
  let ctaText = 'Learn More →'
  let ctaWidth = 180
  if (promptKey === 'homepage') {
    ctaText = 'Get Your Free Audit →'
    ctaWidth = 280
  } else if (promptKey === 'how-we-work' || promptKey === 'preview-how-we-work') {
    ctaText = 'See How It Works →'
    ctaWidth = 240
  } else if (promptKey === 'lexxly' || promptKey === 'preview-lexxly') {
    ctaText = 'Explore LEXXLY →'
    ctaWidth = 220
  } else if (promptKey === 'contact') {
    ctaText = 'Get Started →'
    ctaWidth = 180
  }
  const SAFE_PADDING = 80
  const ctaButton = await createCTAButton(ctaText, ctaWidth)

  // Composite all layers in one operation
  let composite = sharp(baseImage)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .composite([
      { input: overlayBuffer, blend: 'over' },
      { input: accentBuffer, blend: 'over' },
      { input: textBuffer, blend: 'over' },
      { input: ctaButton, top: HEIGHT - SAFE_PADDING - 100, left: SAFE_PADDING },
      { input: brandingBuffer, blend: 'over' },
    ])

  // Add LEXGRO logo (bottom right)
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
