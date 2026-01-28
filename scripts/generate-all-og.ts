/**
 * Batch OG Image Generator for LEXGRO
 *
 * Generates OG images (1200x630) for all pages and card images (800x450) for articles.
 * Uses Sharp for compositing with fallback gradient backgrounds.
 *
 * Usage:
 *   npx tsx scripts/generate-all-og.ts              # Generate all missing images
 *   npx tsx scripts/generate-all-og.ts --force      # Regenerate all images
 *   npx tsx scripts/generate-all-og.ts --pages      # Only static pages
 *   npx tsx scripts/generate-all-og.ts --content    # Only content collection items
 *   npx tsx scripts/generate-all-og.ts --cards      # Only article cards
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { glob } from 'glob'
import matter from 'gray-matter'
import { PROMPTS, HEX_COLORS, getPromptKeyFromSlug, BLOG_SLUG_GRADIENTS, type PromptKey } from '../src/lib/og/prompts'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

// Paths
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/og')
const CARDS_DIR = path.join(PROJECT_ROOT, 'public/cards')
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src/content')
const LOGO_PATH = path.join(PROJECT_ROOT, 'src/assets/images/logos/lexgro-wordmark.png')

// Dimensions
const OG_WIDTH = 1200
const OG_HEIGHT = 630
const CARD_WIDTH = 800
const CARD_HEIGHT = 450
const SAFE_PADDING = 80

// Brand fonts
const FONT_DISPLAY = "'Be Vietnam Pro', 'DM Sans', 'Inter', system-ui, sans-serif"
const FONT_BODY = "'DM Sans', 'Inter', system-ui, sans-serif"

// CLI args
const args = process.argv.slice(2)
const force = args.includes('--force')
const onlyPages = args.includes('--pages')
const onlyContent = args.includes('--content')
const onlyCards = args.includes('--cards')
const generateAll = !onlyPages && !onlyContent && !onlyCards

// Static pages to generate OG images for
const STATIC_PAGES: { slug: string; title: string; category: string }[] = [
  { slug: 'homepage', title: 'Fractional CMO for Law Firms', category: 'HOME' },
  { slug: 'about', title: 'About LEXGRO', category: 'ABOUT' },
  { slug: 'contact', title: 'Contact Us', category: 'CONTACT' },
  { slug: 'faq', title: 'Frequently Asked Questions', category: 'FAQ' },
  { slug: 'results', title: 'Client Results & Case Studies', category: 'RESULTS' },
  { slug: 'careers', title: 'Careers at LEXGRO', category: 'CAREERS' },
  { slug: 'calculator', title: 'Marketing ROI Calculator', category: 'TOOLS' },
  { slug: 'podcast', title: 'The CMO Podcast', category: 'PODCAST' },
  { slug: 'tips-from-keith', title: 'Tips from Keith', category: 'TIPS' },
  // Index pages
  { slug: 'services', title: 'Law Firm Marketing Services', category: 'SERVICES' },
  { slug: 'guide', title: 'Marketing Guides for Law Firms', category: 'GUIDES' },
  { slug: 'blog', title: 'Law Firm Marketing Blog', category: 'BLOG' },
  { slug: 'answers', title: 'Marketing Answers', category: 'ANSWERS' },
]

interface PageConfig {
  slug: string
  title: string
  category: string
  promptKey: PromptKey
}

/**
 * Create gradient background
 */
async function createGradientBackground(
  promptKey: PromptKey,
  width: number,
  height: number,
  slug?: string
): Promise<Buffer> {
  // Check for per-slug gradient first (for blog posts)
  let startColor: [number, number, number]
  let endColor: [number, number, number]

  if (slug && BLOG_SLUG_GRADIENTS[slug]) {
    [startColor, endColor] = BLOG_SLUG_GRADIENTS[slug]
  } else {
    const config = PROMPTS[promptKey] || PROMPTS.default
    ;[startColor, endColor] = config.fallbackGradient
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
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
 * Create dark overlay gradient
 */
function createOverlaySVG(width: number, height: number): string {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlay" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.9" />
          <stop offset="50%" style="stop-color:${HEX_COLORS.darkBg};stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:${HEX_COLORS.darkAlt};stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  `
}

/**
 * Create accent bar
 */
function createAccentBarSVG(width: number, height: number): string {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="6" height="${height}" fill="${HEX_COLORS.primary}" />
    </svg>
  `
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Wrap title text to max 2 lines
 */
function wrapTitle(title: string, maxCharsPerLine: number = 28): string[] {
  const words = title.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)

  // Max 2 lines
  if (lines.length > 2) {
    return [lines[0], lines.slice(1).join(' ').slice(0, maxCharsPerLine) + '...']
  }
  return lines
}

/**
 * Create text overlay SVG
 */
function createTextOverlaySVG(
  width: number,
  height: number,
  category: string,
  title: string,
  isCard: boolean = false
): string {
  const padding = isCard ? 48 : SAFE_PADDING
  const titleLines = wrapTitle(title, isCard ? 22 : 28)

  // Scale fonts for cards
  const categorySize = isCard ? 11 : 13
  const titleSize = isCard ? 42 : 56
  const lineHeight = isCard ? 50 : 64

  // Position from bottom
  const accentY = height * 0.35
  const categoryY = height * 0.43
  const titleStartY = height * 0.56

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .category {
          font-family: ${FONT_BODY};
          font-size: ${categorySize}px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .title {
          font-family: ${FONT_DISPLAY};
          font-size: ${titleSize}px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
      </style>

      <!-- Accent line -->
      <rect x="${padding}" y="${accentY}" width="50" height="4" fill="${HEX_COLORS.mint}" />

      <!-- Category -->
      <text x="${padding}" y="${categoryY}" class="category" fill="${HEX_COLORS.mint}">
        ${escapeXml(category)}
      </text>

      <!-- Title lines -->
      ${titleLines.map((line, i) => `
        <text x="${padding}" y="${titleStartY + i * lineHeight}" class="title" fill="${HEX_COLORS.white}">
          ${escapeXml(line)}
        </text>
      `).join('')}
    </svg>
  `
}

/**
 * Create branding footer SVG
 */
function createBrandingSVG(width: number, height: number, isCard: boolean = false): string {
  const padding = isCard ? 48 : SAFE_PADDING
  const brandY = height - (isCard ? 30 : 40)

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .brand {
          font-family: ${FONT_BODY};
          font-size: ${isCard ? 12 : 14}px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
      </style>
      <text x="${padding}" y="${brandY}" class="brand" fill="${HEX_COLORS.white}" opacity="0.5">
        lexgro.com
      </text>
    </svg>
  `
}

/**
 * Composite an OG or card image
 */
async function compositeImage(
  config: PageConfig,
  width: number,
  height: number,
  outputPath: string,
  isCard: boolean = false
): Promise<void> {
  // Extract actual slug for per-slug gradient lookup
  const slugParts = config.slug.split('/')
  const actualSlug = slugParts.length > 1 ? slugParts[slugParts.length - 1] : config.slug

  // Create gradient background with per-slug override support
  const baseImage = await createGradientBackground(config.promptKey, width, height, actualSlug)

  // Create all overlays
  const overlayBuffer = Buffer.from(createOverlaySVG(width, height))
  const accentBuffer = Buffer.from(createAccentBarSVG(width, height))
  const textBuffer = Buffer.from(createTextOverlaySVG(width, height, config.category, config.title, isCard))
  const brandingBuffer = Buffer.from(createBrandingSVG(width, height, isCard))

  // Composite layers
  let buffer = baseImage

  // Layer 1: Dark overlay
  buffer = await sharp(buffer)
    .composite([{ input: overlayBuffer, blend: 'over' }])
    .toBuffer()

  // Layer 2: Accent bar
  buffer = await sharp(buffer)
    .composite([{ input: accentBuffer, blend: 'over' }])
    .toBuffer()

  // Layer 3: Text
  buffer = await sharp(buffer)
    .composite([{ input: textBuffer, blend: 'over' }])
    .toBuffer()

  // Layer 4: Branding
  buffer = await sharp(buffer)
    .composite([{ input: brandingBuffer, blend: 'over' }])
    .toBuffer()

  // Layer 5: Logo (bottom right)
  if (fs.existsSync(LOGO_PATH)) {
    try {
      const logoSize = isCard ? { w: 100, h: 28 } : { w: 140, h: 40 }
      const logo = await sharp(LOGO_PATH)
        .resize(logoSize.w, logoSize.h, { fit: 'inside' })
        .toBuffer()

      const padding = isCard ? 48 : SAFE_PADDING
      buffer = await sharp(buffer)
        .composite([{
          input: logo,
          top: height - padding - logoSize.h,
          left: width - padding - logoSize.w,
        }])
        .toBuffer()
    } catch (e) {
      // Logo not critical
    }
  }

  // Final output
  const result = await sharp(buffer)
    .png({ quality: 85, compressionLevel: 7 })
    .toBuffer()

  fs.writeFileSync(outputPath, result)
}

/**
 * Generate OG images for static pages
 */
async function generateStaticPageOG(): Promise<void> {
  console.log('\n📄 Generating OG images for static pages...\n')

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const page of STATIC_PAGES) {
    const filename = `${page.slug}.png`
    const outputPath = path.join(OUTPUT_DIR, filename)

    if (!force && fs.existsSync(outputPath)) {
      console.log(`  ⏭️  ${filename} (exists)`)
      continue
    }

    const config: PageConfig = {
      slug: page.slug,
      title: page.title,
      category: page.category,
      promptKey: getPromptKeyFromSlug(page.slug),
    }

    await compositeImage(config, OG_WIDTH, OG_HEIGHT, outputPath)
    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`  ✅ ${filename} (${sizeKB}KB)`)
  }
}

/**
 * Get all content collection items
 */
async function getContentItems(): Promise<{ type: string; slug: string; title: string }[]> {
  const items: { type: string; slug: string; title: string }[] = []

  const contentTypes = ['blog', 'guides', 'answers', 'services']

  for (const type of contentTypes) {
    const pattern = path.join(CONTENT_DIR, type, '*.{md,mdx}')
    const files = await glob(pattern)

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8')
        const { data } = matter(content)
        const slug = path.basename(file).replace(/\.(md|mdx)$/, '')

        items.push({
          type: type === 'guides' ? 'guide' : type,
          slug,
          title: data.title || slug.replace(/-/g, ' '),
        })
      } catch (e) {
        console.error(`  ⚠️  Error reading ${file}`)
      }
    }
  }

  return items
}

/**
 * Generate OG images for content collection items
 */
async function generateContentOG(): Promise<void> {
  console.log('\n📚 Generating OG images for content items...\n')

  const items = await getContentItems()

  for (const item of items) {
    const dir = path.join(OUTPUT_DIR, item.type)
    fs.mkdirSync(dir, { recursive: true })

    const filename = `${item.slug}.png`
    const outputPath = path.join(dir, filename)

    if (!force && fs.existsSync(outputPath)) {
      console.log(`  ⏭️  ${item.type}/${filename} (exists)`)
      continue
    }

    const fullSlug = `${item.type}/${item.slug}`
    const config: PageConfig = {
      slug: fullSlug,
      title: item.title,
      category: item.type.toUpperCase(),
      promptKey: getPromptKeyFromSlug(fullSlug),
    }

    await compositeImage(config, OG_WIDTH, OG_HEIGHT, outputPath)
    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`  ✅ ${item.type}/${filename} (${sizeKB}KB)`)
  }
}

/**
 * Generate card images for blog/content previews
 */
async function generateCards(): Promise<void> {
  console.log('\n🃏 Generating card images for content previews...\n')

  fs.mkdirSync(CARDS_DIR, { recursive: true })

  const items = await getContentItems()

  for (const item of items) {
    const dir = path.join(CARDS_DIR, item.type)
    fs.mkdirSync(dir, { recursive: true })

    const filename = `${item.slug}.png`
    const outputPath = path.join(dir, filename)

    if (!force && fs.existsSync(outputPath)) {
      console.log(`  ⏭️  ${item.type}/${filename} (exists)`)
      continue
    }

    const fullSlug = `${item.type}/${item.slug}`
    const config: PageConfig = {
      slug: fullSlug,
      title: item.title,
      category: item.type.toUpperCase(),
      promptKey: getPromptKeyFromSlug(fullSlug),
    }

    await compositeImage(config, CARD_WIDTH, CARD_HEIGHT, outputPath, true)
    const sizeKB = Math.round(fs.statSync(outputPath).size / 1024)
    console.log(`  ✅ ${item.type}/${filename} (${sizeKB}KB)`)
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log('\n🖼️  LEXGRO OG Image Generator\n')
  console.log(`   Force: ${force ? 'Yes' : 'No'}`)
  console.log(`   Mode: ${generateAll ? 'All' : [onlyPages && 'Pages', onlyContent && 'Content', onlyCards && 'Cards'].filter(Boolean).join(', ')}`)

  try {
    if (generateAll || onlyPages) {
      await generateStaticPageOG()
    }

    if (generateAll || onlyContent) {
      await generateContentOG()
    }

    if (generateAll || onlyCards) {
      await generateCards()
    }

    console.log('\n✅ Done!\n')
  } catch (error: any) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
