/**
 * Generate Editorial Hero Images for Blog Posts and Guides
 *
 * ALL prompts follow the OG Image Style Guide:
 * - 35mm documentary film photography
 * - Film stocks: Kodak Portra 400, Kodak Gold 200, Fuji Pro 400H
 * - NO people, NO faces, NO readable text, NO logos, NO screens
 * - Empty professional spaces, natural light, warm muted tones
 * - 1970s-1990s documentary aesthetic
 *
 * Images are saved to public/images/heroes/blog/ and public/images/heroes/guide/
 *
 * Usage:
 *   npx tsx scripts/generate-content-heroes.ts           # Generate all missing
 *   npx tsx scripts/generate-content-heroes.ts --force    # Regenerate all
 *   npx tsx scripts/generate-content-heroes.ts --blogs    # Blogs only
 *   npx tsx scripts/generate-content-heroes.ts --guides   # Guides only
 *   npx tsx scripts/generate-content-heroes.ts --slug=fractional-cmo-for-law-firms
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

/**
 * OG-SPEC-COMPLIANT PROMPTS
 *
 * Every prompt follows these rules:
 * - 35mm documentary film photography
 * - Specific film stock reference
 * - NO people, NO faces, NO readable text, NO logos, NO computer screens
 * - Empty professional spaces with signs of recent activity
 * - Natural light (golden hour preferred)
 * - Warm muted tones, natural grain
 * - 1970s-1990s era reference
 */

// === BLOG POST PROMPTS ===
const BLOG_PROMPTS: Record<string, string> = {
  // Fractional CMO posts
  'fractional-cmo-for-law-firms': `Corner office at dusk, empty leather chair behind mahogany desk, briefcase set beside desk, city skyline through floor-to-ceiling windows, strategic leadership atmosphere, 1990s corporate documentary photography, shot on Kodak Portra 400, warm colors with cool exterior light, natural grain, no people, no text, no logos, no screens`,
  'top-fractional-cmo-benefits': `Executive boardroom just after meeting, chairs pushed back from conference table, water glasses left behind, golden hour light through tall windows, accomplished atmosphere, 1990s corporate interiors, shot on Fuji Pro 400H, warm muted tones, natural grain, no people, no text, no logos`,
  'how-a-fractional-cmo-can-transform': `Empty corner office at golden hour, leather portfolio on desk, fountain pen uncapped beside it, warm light through wooden blinds, transformation atmosphere, 1980s executive photography, shot on Kodak Gold 200, warm amber tones, slight grain, no people, no text, no logos`,

  // Fractional C-suite
  'fractional-cfo-for-law-firms': `Antique wooden desk with leather blotter, brass desk lamp illuminating stacked ledgers, evening light through window, financial precision atmosphere, 1970s accounting office documentary style, shot on Kodak Portra 160, muted warm colors, visible grain, no people, no readable text, no logos`,
  'unlocking-peak-performance': `Executive conference table with leather chairs around it, morning light streaming through floor-to-ceiling windows, tall green plant in corner, peak performance atmosphere, 1990s corporate photography, shot on Kodak Portra 400, warm balanced tones, natural grain, no people, no text, no logos`,

  // Bankruptcy posts
  'bankruptcy-lawyer-marketing-guide': `Fresh start: clean minimalist desk with single green plant, morning light through window, fresh notebook closed on surface, new beginning atmosphere, 1990s lifestyle documentary style, shot on Kodak Portra 160, soft warm colors, slight grain, no people, no text, no logos`,
  'how-bankruptcy-lawyers-can-generate-more-leads-with-smart-marketing': `Polished reception desk in law office, natural morning light, small potted succulent, welcoming professional atmosphere, 1980s services photography, shot on Fuji Pro 400H, warm muted tones, natural grain, no people, no readable text, no logos`,
  'marketing-for-bankruptcy-lawyers': `Stack of manila folders on wooden desk, warm afternoon light through blinds casting horizontal lines, pen set beside folders, organized case management atmosphere, 1970s office documentary style, shot on Kodak Gold 200, warm amber tones, visible grain, no people, no text, no logos`,

  // Divorce/Family posts
  'mastering-divorce-lawyer-marketing': `Two empty leather chairs facing each other across small table, natural side light through window, supportive consultation atmosphere, warm law office setting, 1980s interiors photography, shot on Kodak Portra 400, soft warm colors, natural grain, no people, no text, no logos`,
  '5-divorce-lawyer-marketing-strategies-to-dominate-your-local-market': `Comfortable law office waiting area, empty chairs arranged invitingly, green fern on side table, late afternoon light through tall windows, welcoming family law atmosphere, 1990s interiors documentary style, shot on Fuji Pro 400H, muted warm tones, slight grain, no people, no text, no logos`,
  'divorce-lawyer-seo': `Research workspace with stacked reference books, warm desk lamp, leather notebook closed beside them, evening study atmosphere, 1970s library documentary style, shot on Kodak Portra 800, warm amber colors, visible grain, no people, no readable text, no logos`,

  // Personal Injury posts
  'personal-injury-lawyer-marketing': `Empty courthouse steps at morning, marble texture visible, fallen autumn leaves on steps, overcast soft lighting, dignified institutional atmosphere, documentary photography, shot on Kodak Tri-X converted to warm color, natural grain, no people, no text, no logos`,
  'personal-injury-lawyer-marketing-tips': `Professional desk with legal pad and brass pen holder, morning light through window blinds, advocacy atmosphere, 1980s law office documentary style, shot on Kodak Gold 200, warm golden tones, natural grain, no people, no readable text, no logos`,
  'personal-injury-lawyer-online-presence-guide': `Modern law firm lobby, polished marble floor reflecting natural light, empty leather seating, green plant accent, welcoming professional atmosphere, 1990s architectural interiors, shot on Fuji Pro 400H, muted warm colors, slight grain, no people, no text, no logos`,
  'personal-injury-lawyer-marketing-a-winning-strategy': `Leather briefcase on polished desk, morning golden hour light through tall window, strategic planning atmosphere, 1980s corporate photography, shot on Kodak Portra 400, warm professional tones, natural grain, no people, no text, no logos, no screens`,

  // Criminal Defense
  'criminal-defense-attorney-seo-strategies': `Law library with leather-bound books on dark wood shelves, warm reading lamp casting pool of light, serious scholarly atmosphere, 1970s legal documentary style, shot on Kodak Ektar, muted warm colors, visible grain, no people, no readable titles, no logos`,

  // DUI
  'market-your-dui-law-practice': `Dignified law library corner, leather wingback chair beside tall bookshelf, warm lamp light, serious professional atmosphere, 1980s legal practice photography, shot on Kodak Portra 400, warm muted tones, natural grain, no people, no text, no logos`,
  'dui-lawyer-marketing-tips': `Dark wood desk with brass desk lamp, leather desk pad, evening light through window, focused professional atmosphere, 1970s office documentary style, shot on Kodak Ektar, warm subdued colors, visible grain, no people, no text, no logos`,

  // Immigration
  'how-immigration-lawyers-can-market-ethically-and-effectively': `Globe on credenza with afternoon light, wooden desk in foreground, small potted succulent, hopeful welcoming atmosphere, law office setting, 1990s documentary interiors, shot on Fuji Pro 400H, warm colors, natural grain, no readable text on globe, no flags, no people, no logos`,

  // Estate Planning
  'how-to-educate-vs-sell-in-estate-law-marketing': `Antique desk with fountain pen and leather document folder, natural light from tall window, estate planning atmosphere, dignified trustworthy mood, 1970s professional photography, shot on Kodak Portra 400, warm vintage tones, slight grain, no people, no readable text, no logos`,

  // Workers Comp
  'get-more-workers-comp-clients': `Comfortable consultation office corner, natural afternoon light through window, green plant on windowsill, supportive professional atmosphere, 1990s interiors documentary style, shot on Kodak Portra 160, warm soft colors, natural grain, no people, no text, no logos`,
  'workers-comp-lawyer-marketing-strategies-that-actually-work': `Reception area of professional office, empty comfortable chairs, warm natural light, welcoming advocate atmosphere, 1980s services photography, shot on Fuji Pro 400H, muted warm tones, slight grain, no people, no text, no logos`,

  // Sales Training
  'law-firm-sales-training': `Empty training room, rows of chairs facing whiteboard with erased marks, handout stack on front table, morning light through windows, professional development atmosphere, 1980s corporate training documentary, shot on Kodak Ektar, muted warm colors, no people, no readable text, no logos`,
  'why-every-law-firm-needs-sales-training': `Whiteboard with erased dry-erase marks, markers on tray, empty conference room, morning light through frosted glass, recent coaching session atmosphere, 1990s consulting firm aesthetic, shot on Fuji Pro 400H, muted tones, natural grain, no readable text, no people, no logos`,

  // Budgeting
  'law-firm-budgeting-101': `Vintage calculator beside stack of legal pads on oak desk, pencil cup nearby, warm afternoon light through blinds, financial planning atmosphere, 1980s accounting office style, shot on Kodak Portra 160, muted warm colors, natural grain, no readable numbers, no people, no logos`,
  'law-firm-budgeting-for-growth': `Leather-bound ledger open on wooden desk, fountain pen beside it, warm desk lamp light, fiscal strategy atmosphere, 1970s professional photography, shot on Kodak Gold 200, warm amber tones, visible grain, no people, no readable text, no logos`,
  'ways-to-reduce-cost-per-case-acquisition': `Filing cabinet drawer half open, manila folders visible with colored tabs, warm afternoon light from window, organized operations atmosphere, 1970s office documentary style, shot on Fuji Superia 400, warm muted tones, natural grain, no people, no readable text, no logos`,

  // Digital Marketing
  'attorney-digital-marketing-a-definitive-guide-for-law-firms': `Reference books stacked on wooden desk, reading glasses set down beside them, warm evening lamp light, comprehensive research atmosphere, 1980s study documentary style, shot on Kodak Portra 400, warm professional tones, natural grain, no people, no readable text, no logos`,
  'how-cmos-help-law-firms-scale-with-digital-channels': `Empty executive office with tall window overlooking trees, leather chair at desk, afternoon light casting long shadows, strategic leadership atmosphere, 1990s corporate interiors photography, shot on Kodak Portra 400, warm balanced tones, slight grain, no people, no text, no logos, no screens`,
  'attorney-facebook-ads': `Marketing materials spread on conference table, color swatches and layout mockups, warm afternoon light, creative campaign planning atmosphere, 1990s advertising agency aesthetic, shot on Fuji Pro 400H, warm muted colors, natural grain, no people, no readable text, no logos, no screens`,

  // Agency/Consulting
  'why-marketing-agencies-fail-law-firms': `Empty conference room after meeting, papers left scattered on table, water glasses half empty, chair pushed back, frustrated departure atmosphere, overcast light through windows, 1980s corporate documentary style, shot on Kodak Portra 400, cool muted tones, visible grain, no people, no readable text, no logos`,
}

// === GUIDE PROMPTS ===
const GUIDE_PROMPTS: Record<string, string> = {
  'law-firm-web-design': `Architect drafting table with blueprints and tracing paper, T-square ruler, warm desk lamp, design workspace atmosphere, 1980s studio documentary style, shot on Kodak Portra 400, warm muted tones, natural grain, no people, no readable text, no logos, no screens`,
  'law-firm-seo': `Research library corner with stacked reference books, magnifying glass on open book, warm reading lamp, analytical investigation atmosphere, 1970s library documentary style, shot on Fuji Pro 400H, warm muted colors, visible grain, no people, no readable text, no logos, no screens`,
  'law-firm-ppc': `Vintage calculator beside budget ledger on oak desk, sharp pencil nearby, warm afternoon light through wooden blinds, strategic ad planning atmosphere, 1980s accounting office style, shot on Kodak Gold 200, warm amber tones, natural grain, no people, no readable numbers, no logos`,
  'law-firm-marketing-budget': `Financial planning desk with leather-bound ledger open, fountain pen, stacked folders on credenza, morning light through tall windows, fiscal strategy atmosphere, 1970s professional office documentary, shot on Kodak Portra 160, muted warm colors, visible grain, no people, no readable text, no logos`,
  'fractional-cmo-law-firms': `Corner office at golden hour, empty leather chair at executive desk, city view through window, briefcase beside chair, strategic leadership atmosphere, 1990s corporate documentary photography, shot on Kodak Portra 400, warm colors with cool exterior light, natural grain, no people, no text, no logos, no screens`,
  'law-firm-lead-generation': `Organized desk with stacked client folders, intake forms in neat pile, warm afternoon light, systematic case management atmosphere, 1980s law office documentary style, shot on Fuji Pro 400H, warm muted tones, natural grain, no people, no readable text, no logos`,
  'law-firm-marketing': `Conference table after strategy session, whiteboard with erased marks visible, dry erase markers scattered, morning light through industrial windows, comprehensive planning atmosphere, 1990s agency documentary style, shot on Kodak Portra 400, warm professional tones, natural grain, no people, no readable text, no logos`,
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
      const slug = data.slug || file.replace('.mdx', '')
      // ALWAYS use our spec-compliant prompts, never frontmatter geminiPrompt
      const prompt = BLOG_PROMPTS[slug] || ''
      if (prompt) {
        items.push({ slug, title: data.title || '', prompt, type: 'blog' })
      } else {
        console.log(`⚠️  No prompt defined for blog/${slug}`)
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
      const prompt = GUIDE_PROMPTS[slug] || ''
      if (prompt) {
        items.push({ slug, title: data.title || '', prompt, type: 'guide' })
      } else {
        console.log(`⚠️  No prompt defined for guide/${slug}`)
      }
    }
  }

  return items
}

async function generateImage(item: ContentItem): Promise<boolean> {
  const outputDir = item.type === 'blog' ? BLOG_OUTPUT : GUIDE_OUTPUT
  const outputPath = path.join(outputDir, `${item.slug}.jpg`)

  if (!force && fs.existsSync(outputPath)) {
    return true
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
  console.log('🖼️  Generating OG-Spec Editorial Hero Images\n')

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

  for (const item of items) {
    const ok = await generateImage(item)
    if (ok) success++
    else failed++

    // Delay between API calls to avoid rate limits
    if (items.indexOf(item) < items.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log(`\n📊 Results: ${success} generated, ${failed} failed`)
  console.log('✅ Done!')
}

main().catch(console.error)
