/**
 * OG Image Prompts for Gemini Imagen 3 Generation
 * Following brand guidelines for LEXGRO
 *
 * Target: 1200x630px (1.9:1 ratio)
 * Generate at 16:9 then crop with Sharp
 */

// Negative prompt (always used) - Anti-AI aesthetic blockers
export const NEGATIVE_PROMPT = 'text, words, letters, numbers, watermark, logo, signature, blurry, low quality, distorted, faces, people, hands, fingers, bodies, cartoon, anime, illustration, painting, drawing, sketch, hyperrealistic, oversaturated, HDR, oversharpened, airbrushed, plastic, artificial, stock photo, perfect lighting, too clean, digital art, CGI, 3D render, smooth gradients, perfect symmetry, clip art, generic business'

// Prompt types
export type PromptKey =
  // Homepage
  | 'homepage'
  // Static pages
  | 'about'
  | 'contact'
  | 'faq'
  | 'results'
  | 'podcast'
  | 'careers'
  | 'calculator'
  | 'tips'
  // Services
  | 'fractional-cmo'
  | 'marketing-strategy'
  | 'intake-optimization'
  | 'seo'
  | 'training'
  | 'vendor-platform'
  | 'evergreen'
  // Content types
  | 'guide'
  | 'blog'
  | 'case-study'
  | 'answers'
  // Practice areas
  | 'personal-injury'
  | 'family-law'
  | 'criminal-defense'
  | 'estate-planning'
  | 'immigration'
  | 'bankruptcy'
  | 'divorce'
  | 'dui'
  | 'workers-comp'
  // General
  | 'growth'
  | 'consulting'
  | 'default'

// Style mode for overlay
export type StyleMode = 'dark' | 'light'

export interface PromptConfig {
  prompt: string
  style: StyleMode
  /** Fallback gradient when API unavailable */
  fallbackGradient: [[number, number, number], [number, number, number]]
}

// All prompts by type
export const PROMPTS: Record<PromptKey, PromptConfig> = {
  // === HOMEPAGE ===

  homepage: {
    prompt: `Upward view through glass atrium of modern office building, morning light streaming through skylights, green plants visible on interior balconies, architectural lines converging toward bright sky, sense of growth and ambition, warm golden hour tones with deep shadows, shot on Kodak Portra 400 35mm film, natural grain and imperfections, documentary architectural photography, no people visible, no text, no logos, authentic aspirational business atmosphere`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  // === STATIC PAGES ===

  about: {
    prompt: `Corner office with window overlooking trees, afternoon light through blinds casting patterns, green plant on credenza, worn leather chair, stack of folders on desk, 1980s professional atmosphere, documentary photography style, Kodak Gold 200 warm colors, dust visible in light shafts, no people, no text, no logos, authentic lived-in executive office`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  contact: {
    prompt: `Law firm reception area late afternoon, empty leather waiting chairs, natural light through tall windows, fern on side table, polished marble floor reflecting light, 1990s professional services aesthetic, editorial interiors photography, Fuji Pro 400H muted warm tones, quiet anticipation atmosphere, no people, no text, no logos`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  faq: {
    prompt: `Reference books stacked on wooden desk, reading glasses set down, warm desk lamp illuminating papers, evening light through window, 1970s study corner aesthetic, Kodak Portra 800 colors, slight grain, cozy knowledge atmosphere, shallow depth of field on book spine, no readable text visible, no people, authentic learning environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  results: {
    prompt: `Framed certificates on credenza, morning light through blinds, trophy visible out of focus, polished dark wood surface, 1980s achievement display aesthetic, Kodak Gold 200 warm tones, editorial photography, dust motes in light, no readable text on frames, no faces, no logos, authentic professional success atmosphere`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  podcast: {
    prompt: `Professional condenser microphone on boom arm, empty recording studio, acoustic foam panels in background, warm tungsten lighting, mixing board out of focus, 1990s radio station aesthetic, Kodak Portra 400 colors, slight grain, creative production atmosphere, no people, no text, no logos, authentic audio studio feel`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  careers: {
    prompt: `Empty office bullpen morning before staff arrives, desks with personal items, natural light through large windows, green plants on desks, promising career opportunity atmosphere, 1990s workplace documentary style, Kodak Gold 200 warm colors, dust in morning light, no people, no text, no logos, authentic team culture environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  calculator: {
    prompt: `Vintage calculator beside stack of legal pads on oak desk, pencil cup nearby, warm afternoon light through blinds, 1980s accounting office aesthetic, strategic planning atmosphere, Kodak Portra 160 muted colors, shallow focus on calculator keys, no readable numbers, no people, authentic financial planning workspace`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  tips: {
    prompt: `Worn leather executive chair behind cluttered desk, afternoon light through window blinds, framed photos out of focus, coffee mug left behind, mentorship atmosphere, 1980s executive office documentary style, Portra 400 warm tones, slight grain, no people visible, no text, authentic expert wisdom environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  // === SERVICES ===

  'fractional-cmo': {
    prompt: `Corner office at dusk, city lights beginning to glow through window, empty leather chair at mahogany desk, briefcase beside, strategic leadership atmosphere, 1990s corporate photography style, Kodak Portra 400 warm colors with cool exterior, no people, no text, no computer screens, authentic C-suite executive environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'marketing-strategy': {
    prompt: `Whiteboard with erased marks visible, dry erase markers scattered on tray, empty conference chairs, morning light through frosted glass, recent planning session atmosphere, 1990s consulting firm aesthetic, Fuji Pro 400H muted tones, documentary style, no readable text, no people, authentic strategy meeting environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  'intake-optimization': {
    prompt: `Law firm reception area after hours, empty waiting chairs in row, phone console on desk, late afternoon light through tall windows, client service atmosphere, 1980s professional services documentary style, Kodak Gold 200 warm tones, no people, no readable text, authentic intake process environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  seo: {
    prompt: `Research library corner with reference books, warm reading lamp, notepad with pen, old keyboard partially visible, investigative research atmosphere, 1990s information gathering aesthetic, Kodak Portra 160 muted colors, dust visible in light, no readable text, no people, no screens glowing, authentic research workspace`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  training: {
    prompt: `Empty training room with rows of chairs facing whiteboard, projector screen pulled down, handouts on seats, morning light through windows, professional development atmosphere, 1980s corporate training documentary style, Kodak Ektar muted colors, no people, no readable text on board, authentic learning environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'vendor-platform': {
    prompt: `Filing cabinet drawer half open, manila folders visible, labeled tabs out of focus, warm desk lamp nearby, organized operations atmosphere, 1970s office documentary style, Fuji Superia 400 warm muted tones, shallow focus on folder edges, no readable text, no people, authentic business systems environment`,
    style: 'dark',
    fallbackGradient: [[35, 59, 41], [41, 140, 66]],
  },

  evergreen: {
    prompt: `Potted fern catching morning light in office corner, window condensation visible, growth and nurturing atmosphere, natural imperfections, 1990s lifestyle documentary style, Kodak Portra 400 vivid greens, shallow depth of field, no people, no text, authentic sustainable growth metaphor`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  // === CONTENT TYPES ===

  guide: {
    prompt: `Heavy reference book open on wooden desk, reading glasses set aside, warm lamp light in evening, leather desk blotter worn, 1970s study atmosphere, educational research mood, Kodak Portra 800 warm tones, shallow focus on page edges, no readable text, no people, authentic knowledge-sharing environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  blog: {
    prompt: `Morning coffee steam rising beside leather journal, pen uncapped, natural window light, green plant leaf in soft focus, creative workspace atmosphere, 1990s journaling documentary style, 35mm film grain, Portra 400 warm colors, no readable text, no people, authentic content creation space`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  'case-study': {
    prompt: `Stack of manila folders on conference table, natural afternoon light, glass of water nearby, professional meeting aftermath, serious business atmosphere, editorial photography, Kodak Gold 200 muted warmth, no visible text, no logos, no people, authentic results-focused business aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  answers: {
    prompt: `Question mark shaped light pattern on professional desk, warm afternoon light, curious learning atmosphere, educational helpful mood, modern law office setting, editorial photography, Portra 160 warm colors, shallow depth of field, no readable text, no people, authentic knowledge Q&A aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  // === PRACTICE AREAS ===

  'personal-injury': {
    prompt: `Empty courthouse steps in morning light, marble texture visible, fallen autumn leaves, dignified institutional architecture, overcast soft lighting, documentary photography style, Tri-X film grain converted to muted color, no people, no text, no scales of justice, authentic legal justice atmosphere`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  'family-law': {
    prompt: `Comfortable home office corner, family photo frames face-down for privacy, warm lamp light, wooden desk with leather chair, supportive welcoming atmosphere, evening golden hour, Portra 160 warm tones, shallow depth of field, no visible faces, no text, no identifiable photos, compassionate professional aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'criminal-defense': {
    prompt: `Law library with leather-bound books, warm reading lamp, dark wood shelving, serious scholarly atmosphere, late evening study, classic legal aesthetic, Kodak Ektar muted colors, shallow focus on book spines, no readable titles, no people, no text, dignified defense practice atmosphere`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  'estate-planning': {
    prompt: `Antique wooden desk with fountain pen, natural light from tall window, leather document folder, estate planning atmosphere, dignified trustworthy mood, morning light, Portra 400 warm vintage tones, shallow depth of field, no readable text, no people, no logos, authentic legacy planning aesthetic`,
    style: 'dark',
    fallbackGradient: [[35, 59, 41], [41, 140, 66]],
  },

  immigration: {
    prompt: `World map on wall out of focus, wooden desk in foreground, small potted succulent, hopeful professional atmosphere, natural afternoon light, welcoming law office, documentary style, Fuji Pro 400H warm colors, no readable text on map, no flags, no people, authentic global legal practice aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  bankruptcy: {
    prompt: `Fresh start minimalist desk, single green plant in pot, clean organized surface, natural morning light, hopeful new beginning atmosphere, modern professional space, editorial photography, Portra 160 soft colors, shallow depth of field, no paper clutter, no people, no text, authentic financial recovery aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  divorce: {
    prompt: `Two empty chairs at table in warm light, compassionate supportive atmosphere, morning light through window, family law office setting, respectful transition mood, editorial interiors photography, Portra 400 soft warm colors, no people, no text, authentic family law support aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  dui: {
    prompt: `Dignified law library with leather chairs, warm reading lamp, serious professional atmosphere, evening study mood, defense practice setting, editorial photography, Kodak Ektar muted tones, shallow focus on chair, no people, no text, no alcohol references, authentic criminal defense aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  'workers-comp': {
    prompt: `Comfortable consultation office with natural light, supportive professional environment, warm afternoon light, worker advocacy atmosphere, welcoming law firm setting, editorial interiors, Portra 160 warm colors, no people, no text, authentic workers rights aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  // === GENERAL ===

  growth: {
    prompt: `Tall green plant reaching toward window light, modern office corner, morning golden hour, upward growth visible, inspiring professional atmosphere, editorial lifestyle photography, Kodak Portra 400 warm greens, shallow depth of field on leaves, no people, no text, no logos, authentic business growth metaphor`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  consulting: {
    prompt: `Two leather chairs facing each other in professional setting, coffee table between, natural light from side window, consultation atmosphere, warm inviting mood, editorial interiors photography, Fuji Pro 400H warm tones, no people visible, no text, no logos, authentic advisory meeting aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  // === FALLBACK ===

  default: {
    prompt: `Modern law office lobby corner, comfortable seating area, green plant accent, warm natural light through windows, professional welcoming atmosphere, editorial interiors photography, Kodak Portra 400 warm colors, shallow depth of field, no people, no text, no logos visible, authentic law firm growth aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },
}

/**
 * Get prompt key from URL slug
 */
export function getPromptKeyFromSlug(slug: string): PromptKey {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '').toLowerCase()

  // Homepage
  if (normalizedSlug === '' || normalizedSlug === 'index' || normalizedSlug === 'home') return 'homepage'

  // Static pages (exact matches)
  if (normalizedSlug === 'about') return 'about'
  if (normalizedSlug === 'contact') return 'contact'
  if (normalizedSlug === 'faq') return 'faq'
  if (normalizedSlug === 'results') return 'results'
  if (normalizedSlug === 'careers') return 'careers'
  if (normalizedSlug === 'calculator') return 'calculator'
  if (normalizedSlug.includes('tips-from-keith') || normalizedSlug.includes('tips')) return 'tips'
  if (normalizedSlug.includes('podcast') || normalizedSlug.includes('cmo-podcast')) return 'podcast'

  // Services
  if (normalizedSlug.includes('fractional-cmo')) return 'fractional-cmo'
  if (normalizedSlug.includes('marketing-strategy') || normalizedSlug.includes('strategy')) return 'marketing-strategy'
  if (normalizedSlug.includes('intake')) return 'intake-optimization'
  if (normalizedSlug.includes('seo')) return 'seo'
  if (normalizedSlug.includes('training')) return 'training'
  if (normalizedSlug.includes('vendor')) return 'vendor-platform'
  if (normalizedSlug.includes('evergreen')) return 'evergreen'

  // Content types
  if (normalizedSlug.startsWith('guide/') || normalizedSlug === 'guide') return 'guide'
  if (normalizedSlug.startsWith('blog/') || normalizedSlug === 'blog') return 'blog'
  if (normalizedSlug.startsWith('answers/') || normalizedSlug === 'answers') return 'answers'
  if (normalizedSlug.includes('case-study')) return 'case-study'

  // Practice areas (more specific first)
  if (normalizedSlug.includes('divorce') || normalizedSlug.includes('family-law')) return 'divorce'
  if (normalizedSlug.includes('dui')) return 'dui'
  if (normalizedSlug.includes('workers-comp')) return 'workers-comp'
  if (normalizedSlug.includes('personal-injury') || normalizedSlug.includes('pi-')) return 'personal-injury'
  if (normalizedSlug.includes('criminal')) return 'criminal-defense'
  if (normalizedSlug.includes('estate') || normalizedSlug.includes('elder')) return 'estate-planning'
  if (normalizedSlug.includes('immigration')) return 'immigration'
  if (normalizedSlug.includes('bankruptcy')) return 'bankruptcy'

  // General
  if (normalizedSlug.includes('growth')) return 'growth'
  if (normalizedSlug.includes('consult')) return 'consulting'

  return 'default'
}

/**
 * Build category breadcrumb for OG display
 */
export function getCategoryBreadcrumb(slug: string): string {
  const parts = slug.replace(/^\/+|\/+$/g, '').split('/')

  if (parts.length === 1) {
    return parts[0].toUpperCase().replace(/-/g, ' ')
  }

  // Max 3 levels for readability
  return parts
    .slice(0, 3)
    .map(p => p.toUpperCase().replace(/-/g, ' '))
    .join(' › ')
}

// Brand colors as RGB for Sharp compositing
export const COLORS = {
  darkBg: [1, 25, 7] as [number, number, number],           // #011907
  darkAlt: [35, 59, 41] as [number, number, number],        // #233B29
  primary: [41, 140, 66] as [number, number, number],       // #298C42
  primaryDark: [31, 130, 56] as [number, number, number],   // #1F8238
  teal: [26, 167, 116] as [number, number, number],         // #1AA774
  mint: [37, 185, 123] as [number, number, number],         // #25B97B
  accent: [255, 129, 88] as [number, number, number],       // #FF8158
  purple: [103, 58, 228] as [number, number, number],       // #673AE4
  white: [255, 255, 255] as [number, number, number],
  lightBg: [192, 233, 202] as [number, number, number],     // #C0E9CA
}

/**
 * Per-slug unique gradient overrides for blog posts
 * Each post gets a unique color combination
 */
export const BLOG_SLUG_GRADIENTS: Record<string, [[number, number, number], [number, number, number]]> = {
  // Fractional CMO posts - greens and teals
  'fractional-cmo-for-law-firms': [[1, 25, 7], [41, 140, 66]],
  'top-fractional-cmo-benefits': [[10, 45, 20], [26, 167, 116]],
  'how-a-fractional-cmo-can-transform': [[5, 35, 15], [37, 185, 123]],

  // Fractional C-suite - purples and deep greens
  'fractional-cfo-for-law-firms': [[20, 10, 45], [103, 58, 228]],
  'unlocking-peak-performance': [[15, 25, 50], [80, 45, 180]],

  // Bankruptcy posts - hopeful greens and mints
  'bankruptcy-lawyer-marketing-guide': [[1, 30, 15], [37, 185, 123]],
  'how-bankruptcy-lawyers-can-generate-more-leads-with-smart-marketing': [[5, 40, 20], [50, 200, 140]],
  'marketing-for-bankruptcy-lawyers': [[10, 35, 18], [45, 175, 115]],

  // Divorce/Family posts - warm supportive tones
  'mastering-divorce-lawyer-marketing': [[25, 15, 5], [180, 100, 50]],
  '5-divorce-lawyer-marketing-strategies-to-dominate-your-local-market': [[30, 20, 10], [200, 120, 60]],
  'divorce-lawyer-seo': [[20, 25, 15], [150, 90, 45]],

  // Personal Injury - oranges and warm colors
  'personal-injury-lawyer-marketing': [[35, 15, 5], [255, 129, 88]],
  'personal-injury-lawyer-marketing-tips': [[40, 20, 8], [230, 110, 70]],
  'personal-injury-lawyer-online-presence-guide': [[30, 18, 6], [245, 140, 95]],
  'personal-injury-lawyer-marketing-a-winning-strategy': [[38, 12, 4], [220, 100, 65]],

  // Criminal Defense - deep purples and blues
  'criminal-defense-attorney-seo-strategies': [[15, 10, 35], [103, 58, 228]],

  // DUI - similar purple family
  'market-your-dui-law-practice': [[20, 15, 40], [90, 50, 200]],
  'dui-lawyer-marketing-tips': [[18, 12, 38], [110, 65, 215]],

  // Immigration - hopeful teals and greens
  'how-immigration-lawyers-can-market-ethically-and-effectively': [[5, 30, 25], [26, 167, 116]],

  // Estate Planning - dignified warm browns/greens
  'how-to-educate-vs-sell-in-estate-law-marketing': [[35, 40, 25], [85, 110, 55]],

  // Workers Comp - supportive warm oranges
  'get-more-workers-comp-clients': [[40, 20, 10], [255, 129, 88]],
  'workers-comp-lawyer-marketing-strategies-that-actually-work': [[35, 18, 8], [240, 115, 75]],

  // Sales Training - professional blues/greens
  'law-firm-sales-training': [[10, 20, 35], [50, 100, 180]],
  'why-every-law-firm-needs-sales-training': [[15, 25, 40], [60, 110, 190]],

  // Budgeting - financial greens
  'law-firm-budgeting-101': [[5, 35, 20], [41, 140, 66]],
  'law-firm-budgeting-for-growth': [[8, 40, 25], [50, 155, 80]],
  'ways-to-reduce-cost-per-case-acquisition': [[10, 38, 22], [45, 148, 72]],

  // Digital Marketing - modern teals/purples
  'attorney-digital-marketing-a-definitive-guide-for-law-firms': [[12, 25, 40], [80, 140, 200]],
  'how-cmos-help-law-firms-scale-with-digital-channels': [[15, 28, 45], [70, 130, 190]],
  'attorney-facebook-ads': [[20, 30, 50], [60, 100, 180]],

  // Agency/Consulting - professional greens
  'why-marketing-agencies-fail-law-firms': [[25, 35, 20], [120, 80, 50]],
}

// Hex colors for CSS/SVG
export const HEX_COLORS = {
  darkBg: '#011907',
  darkAlt: '#233B29',
  primary: '#298C42',
  primaryDark: '#1F8238',
  teal: '#1AA774',
  mint: '#25B97B',
  accent: '#FF8158',
  purple: '#673AE4',
  white: '#FFFFFF',
  lightBg: '#C0E9CA',
}

/**
 * CARD IMAGE PROMPTS - Abstract Geometric Style
 *
 * Card images (800x450) use a different aesthetic than OG images:
 * - Abstract data visualizations
 * - Geometric shapes and patterns
 * - Growth/progress metaphors (upward arrows, networks, pathways)
 * - Dark green background with orange/coral and green accents
 * - Clean, modern, illustrative (NOT photographic)
 * - No text, no people, no logos
 */
export interface CardPromptConfig {
  prompt: string
  /** Fallback gradient when API unavailable */
  fallbackGradient: [[number, number, number], [number, number, number]]
}

export const CARD_PROMPTS: Record<string, CardPromptConfig> = {
  // === GROWTH / GENERAL ===
  'growth': {
    prompt: `Abstract geometric data visualization on dark forest green background, glowing orange upward trending line graph with illuminated nodes at data points, thin parallel diagonal lines in corner, minimalist growth chart aesthetic, warm orange and gold accent colors, clean modern vector illustration style, no text, no people, no logos, corporate data visualization art`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'network': {
    prompt: `Abstract network diagram on dark green background, interconnected nodes in orange coral and mint green colors, glowing connection lines between circular nodes of varying sizes, data visualization aesthetic, clean geometric shapes, modern abstract illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  'pathway': {
    prompt: `Abstract minimalist pathway leading to glowing orange sunrise on horizon, dark teal green sky and ground, geometric white stepping stones or ladder rungs receding into distance, hope and progress metaphor, clean vector illustration style, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  'chart': {
    prompt: `Abstract bar chart or graph visualization on dark green background, glowing orange and mint green bars ascending upward, subtle grid lines, minimalist data visualization, modern geometric illustration, no text, no numbers, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  // === PRACTICE AREAS ===
  'personal-injury-card': {
    prompt: `Abstract shield or protection symbol made of glowing orange geometric lines on dark green background, strength and advocacy visual metaphor, interconnected nodes forming protective shape, modern data visualization aesthetic, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  'family-law-card': {
    prompt: `Abstract interconnected circles representing family bonds on dark green background, warm coral orange and soft green glowing nodes, supportive connected network visualization, clean geometric illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'bankruptcy-card': {
    prompt: `Abstract pathway or staircase leading upward toward glowing orange sunrise on dark green background, fresh start and new beginning metaphor, clean geometric minimalist illustration, hope and progress visualization, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  'criminal-defense-card': {
    prompt: `Abstract balanced scales made of glowing geometric lines on dark purple-green background, justice and defense visual metaphor, modern minimalist data visualization style, subtle purple and green accents, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  'immigration-card': {
    prompt: `Abstract globe or world map made of interconnected glowing nodes on dark green background, teal and orange connection lines spanning continents, global network visualization, modern geometric illustration, no text, no people, no flags, no logos`,
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  'divorce-card': {
    prompt: `Abstract two paths diverging then finding parallel harmony on dark green background, warm supportive orange and green tones, geometric line illustration showing transition and new direction, minimalist metaphor visualization, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'workers-comp-card': {
    prompt: `Abstract protective gear or shield shape made of glowing orange geometric nodes and lines on dark green background, worker protection and support metaphor, modern data visualization aesthetic, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  'dui-card': {
    prompt: `Abstract balanced scales of justice with glowing purple and green geometric elements on dark background, defense and fairness metaphor, modern minimalist legal visualization, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  'estate-card': {
    prompt: `Abstract tree with branching geometric lines representing legacy and growth on dark green background, warm orange and green nodes at branch points, family tree data visualization metaphor, modern illustration, no text, no people, no logos`,
    fallbackGradient: [[35, 59, 41], [41, 140, 66]],
  },

  // === SERVICES ===
  'fractional-cmo-card': {
    prompt: `Abstract upward trending arrow made of glowing orange line with illuminated data nodes on dark forest green background, growth trajectory visualization, thin parallel accent lines, clean modern executive aesthetic, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  'marketing-card': {
    prompt: `Abstract funnel or conversion flow made of glowing geometric shapes on dark green background, orange and mint green nodes showing progression, marketing data visualization, modern minimalist illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  'seo-card': {
    prompt: `Abstract upward climbing graph or ranking visualization on dark green background, glowing orange and green ascending nodes connected by lines, search visibility metaphor, modern data visualization, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  'training-card': {
    prompt: `Abstract ascending steps or levels made of glowing geometric shapes on dark green background, skill progression visualization, orange and green illuminated platforms, learning journey metaphor, modern illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'consulting-card': {
    prompt: `Abstract two overlapping circles or venn diagram with glowing intersection on dark green background, partnership and collaboration visualization, orange and teal geometric elements, modern minimalist illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  // === CONTENT TYPES ===
  'blog-card': {
    prompt: `Abstract network of interconnected ideas represented by glowing nodes on dark green background, orange and mint green connection lines, knowledge network visualization, modern data illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'guide-card': {
    prompt: `Abstract roadmap or journey path with glowing waypoints on dark green background, orange milestone nodes connected by green pathway lines, navigation and guidance metaphor, modern geometric illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  'default-card': {
    prompt: `Abstract upward growth visualization on dark forest green background, glowing orange trending line with connected data nodes, subtle diagonal accent lines, clean modern corporate aesthetic, minimalist geometric illustration, no text, no people, no logos`,
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },
}

/**
 * Get card prompt key from content slug
 */
export function getCardPromptKey(slug: string): string {
  const normalizedSlug = slug.toLowerCase()

  // Practice areas
  if (normalizedSlug.includes('personal-injury') || normalizedSlug.includes('pi-')) return 'personal-injury-card'
  if (normalizedSlug.includes('family-law')) return 'family-law-card'
  if (normalizedSlug.includes('bankruptcy')) return 'bankruptcy-card'
  if (normalizedSlug.includes('criminal')) return 'criminal-defense-card'
  if (normalizedSlug.includes('immigration')) return 'immigration-card'
  if (normalizedSlug.includes('divorce')) return 'divorce-card'
  if (normalizedSlug.includes('workers-comp')) return 'workers-comp-card'
  if (normalizedSlug.includes('dui')) return 'dui-card'
  if (normalizedSlug.includes('estate') || normalizedSlug.includes('elder')) return 'estate-card'

  // Services
  if (normalizedSlug.includes('fractional-cmo') || normalizedSlug.includes('cmo')) return 'fractional-cmo-card'
  if (normalizedSlug.includes('seo')) return 'seo-card'
  if (normalizedSlug.includes('training') || normalizedSlug.includes('sales')) return 'training-card'
  if (normalizedSlug.includes('consult')) return 'consulting-card'

  // Content types
  if (normalizedSlug.includes('marketing') || normalizedSlug.includes('lead')) return 'marketing-card'
  if (normalizedSlug.includes('budget') || normalizedSlug.includes('cost')) return 'chart'
  if (normalizedSlug.includes('growth') || normalizedSlug.includes('scale')) return 'growth'
  if (normalizedSlug.includes('digital') || normalizedSlug.includes('online')) return 'network'

  // Fallback based on content type prefix
  if (normalizedSlug.startsWith('guide/')) return 'guide-card'
  if (normalizedSlug.startsWith('blog/')) return 'blog-card'

  return 'default-card'
}
