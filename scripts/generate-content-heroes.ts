/**
 * Generate Editorial Hero Images for Blog Posts and Guides
 *
 * Reads geminiPrompt from frontmatter and generates hero images via Gemini API.
 * Images are saved to public/images/heroes/blog/ and public/images/heroes/guide/
 *
 * Usage:
 *   npx tsx scripts/generate-content-heroes.ts           # Generate all missing
 *   npx tsx scripts/generate-content-heroes.ts --force    # Regenerate all
 *   npx tsx scripts/generate-content-heroes.ts --blogs    # Blogs only
 *   npx tsx scripts/generate-content-heroes.ts --guides   # Guides only
 *   npx tsx scripts/generate-content-heroes.ts --slug=fractional-cmo-for-law-firms  # Single post
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

const BLOG_DIR = path.join(PROJECT_ROOT, 'src/content/blog')
const GUIDE_DIR = path.join(PROJECT_ROOT, 'src/content/guides')
const BLOG_OUTPUT = path.join(PROJECT_ROOT, 'public/images/heroes/blog')
const GUIDE_OUTPUT = path.join(PROJECT_ROOT, 'public/images/heroes/guide')

const API_KEY = process.env.GEMINI_API_KEY
const IMAGE_MODEL = 'gemini-2.0-flash-exp-image-generation'
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`

// Parse CLI args
const args = process.argv.slice(2)
const force = args.includes('--force')
const blogsOnly = args.includes('--blogs')
const guidesOnly = args.includes('--guides')
const slugArg = args.find(a => a.startsWith('--slug='))?.split('=')[1]

// Default prompts for guides that don't have geminiPrompt
const GUIDE_PROMPTS: Record<string, string> = {
  'law-firm-web-design': `Law firm website wireframes sketched on paper beside laptop showing code, warm desk lamp light, UX design atmosphere, conversion optimization workspace, 1990s web design studio documentary style, Kodak Portra 400 warm tones, 35mm film grain, no readable text, no people, no logos, authentic digital design aesthetic`,
  'law-firm-seo': `Research library with SEO reference materials stacked on desk, magnifying glass on keyword printouts, warm reading lamp, analytical investigation atmosphere, 1990s research operations photography, Fuji Pro 400H warm colors, 35mm film grain, no readable text, no people, no screens, authentic search optimization aesthetic`,
  'law-firm-ppc': `Advertising budget spreadsheet on desk beside calculator, marketing analytics printouts stacked, afternoon light through blinds, strategic ad spend atmosphere, 1980s media buying office style, Kodak Gold 200 warm tones, 35mm grain, no readable numbers, no people, no screens, authentic paid media planning aesthetic`,
  'law-firm-marketing-budget': `Financial planning workspace with leather-bound ledger open, fountain pen beside budget documents, stacked folders on credenza, morning light through tall windows, fiscal strategy atmosphere, 1970s accounting office documentary style, Kodak Portra 160 muted warm colors, no readable text, no people, authentic budget planning aesthetic`,
  'fractional-cmo-law-firms': `Executive corner office at golden hour, empty leather chair behind mahogany desk, city skyline through floor-to-ceiling windows, strategic leadership atmosphere, briefcase set beside desk, 1990s corporate documentary photography, Kodak Portra 400 warm colors with cool exterior light, 35mm grain, no people, no text, no screens, authentic C-suite executive aesthetic`,
  'law-firm-lead-generation': `Lead generation funnel visualized through layered documents on conference table, business cards arranged in narrowing pattern, warm afternoon light, systematic client acquisition atmosphere, 1980s sales operations documentary style, Fuji Pro 400H warm tones, 35mm grain, no readable text, no people, authentic pipeline management aesthetic`,
  'law-firm-marketing': `Complete marketing operations war room, whiteboard with erased strategy marks, scattered campaign materials on long table, morning light through industrial windows, comprehensive marketing atmosphere, 1990s advertising agency documentary style, Kodak Portra 400 warm colors, 35mm grain, no readable text, no people, no logos, authentic full-service marketing aesthetic`,
}

interface ContentItem {
  slug: string
  title: string
  prompt: string
  type: 'blog' | 'guide'
}

function readContentFiles(): ContentItem[] {
  const items: ContentItem[] = []

  // Read blog posts
  if (!guidesOnly) {
    const blogFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
    for (const file of blogFiles) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data } = matter(content)
      if (data.geminiPrompt || data.slug) {
        items.push({
          slug: data.slug || file.replace('.mdx', ''),
          title: data.title || '',
          prompt: data.geminiPrompt || '',
          type: 'blog'
        })
      }
    }
  }

  // Read guides
  if (!blogsOnly) {
    const guideFiles = fs.readdirSync(GUIDE_DIR).filter(f => f.endsWith('.mdx'))
    for (const file of guideFiles) {
      const content = fs.readFileSync(path.join(GUIDE_DIR, file), 'utf-8')
      const { data } = matter(content)
      const slug = data.slug || file.replace('.mdx', '')
      items.push({
        slug,
        title: data.title || '',
        prompt: data.geminiPrompt || GUIDE_PROMPTS[slug] || '',
        type: 'guide'
      })
    }
  }

  return items
}

async function generateImage(item: ContentItem): Promise<boolean> {
  const outputDir = item.type === 'blog' ? BLOG_OUTPUT : GUIDE_OUTPUT
  const outputPath = path.join(outputDir, `${item.slug}.jpg`)

  if (!force && fs.existsSync(outputPath)) {
    return true // already exists
  }

  if (!item.prompt) {
    console.log(`⚠️  No prompt for ${item.type}/${item.slug} - skipping`)
    return false
  }

  if (!API_KEY) {
    console.error('❌ No GEMINI_API_KEY')
    return false
  }

  console.log(`🎨 Generating: ${item.type}/${item.slug}...`)

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: item.prompt }]
        }],
        generationConfig: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error(`❌ API Error for ${item.slug}: ${data.error.message}`)
      return false
    }

    const parts = data.candidates?.[0]?.content?.parts || []
    for (const part of parts) {
      if (part.inlineData?.data) {
        const buffer = Buffer.from(part.inlineData.data, 'base64')
        fs.mkdirSync(outputDir, { recursive: true })
        fs.writeFileSync(outputPath, buffer)
        const sizeKB = Math.round(buffer.length / 1024)
        console.log(`✅ ${item.type}/${item.slug}.jpg (${sizeKB}KB)`)
        return true
      }
    }

    console.error(`❌ No image in response for ${item.slug}`)
    return false
  } catch (error: any) {
    console.error(`❌ Error for ${item.slug}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🖼️  Generating Editorial Hero Images for Content\n')

  let items = readContentFiles()

  if (slugArg) {
    items = items.filter(i => i.slug === slugArg)
    if (items.length === 0) {
      console.log(`❌ No content found for slug: ${slugArg}`)
      return
    }
  }

  // Filter to only items that need generation
  if (!force) {
    const before = items.length
    items = items.filter(item => {
      const outputDir = item.type === 'blog' ? BLOG_OUTPUT : GUIDE_OUTPUT
      return !fs.existsSync(path.join(outputDir, `${item.slug}.jpg`))
    })
    console.log(`📊 ${items.length} images to generate (${before - items.length} already exist)\n`)
  } else {
    console.log(`📊 ${items.length} images to generate (force mode)\n`)
  }

  if (items.length === 0) {
    console.log('✅ All images already exist!')
    return
  }

  let success = 0
  let failed = 0

  // Generate sequentially with delay to avoid rate limits
  for (const item of items) {
    const ok = await generateImage(item)
    if (ok) success++
    else failed++

    // Small delay between API calls to avoid rate limits
    if (items.indexOf(item) < items.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log(`\n📊 Results: ${success} generated, ${failed} failed`)
  console.log('✅ Done!')
}

main().catch(console.error)
