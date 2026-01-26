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
  // Services
  | 'fractional-cmo'
  | 'marketing-strategy'
  | 'intake-optimization'
  | 'seo'
  | 'training'
  | 'vendor-platform'
  // Content types
  | 'guide'
  | 'blog'
  | 'case-study'
  // Practice areas
  | 'personal-injury'
  | 'family-law'
  | 'criminal-defense'
  | 'estate-planning'
  | 'immigration'
  | 'bankruptcy'
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
    prompt: `Dramatic upward perspective of modern glass skyscraper at golden hour, warm sunlight reflecting off windows creating patterns of light, deep green ivy climbing architectural elements, sense of growth and upward momentum, professional urban success atmosphere, shot from below looking up conveying ambition and achievement, editorial architectural photography, Kodak Ektar vivid colors with warm golden tones, dramatic lighting contrast, no people, no text, no logos, authentic aspirational business growth aesthetic, cinematic wide angle lens`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  // === SERVICES ===

  'fractional-cmo': {
    prompt: `Modern executive office at golden hour, warm natural light through floor-to-ceiling windows, polished wood desk with leather chair, city skyline blurred in background, sophisticated professional atmosphere, editorial photography style, Kodak Portra 400 warm tones, shallow depth of field, no people, no text, no computer screens, authentic high-end business aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'marketing-strategy': {
    prompt: `Open planner and notebook on marble desk, morning coffee steam rising, natural window light casting soft shadows, green plant in corner, organized productive workspace, documentary lifestyle photography, Fuji Pro 400H colors, slight grain, no people, no text visible, no screens, authentic strategic planning atmosphere`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [26, 167, 116]],
  },

  'intake-optimization': {
    prompt: `Modern reception desk corner in warm lighting, comfortable waiting area chairs visible, polished surfaces, welcoming professional law firm atmosphere, late afternoon golden light, editorial interiors photography, Kodak Gold 200 warm tones, no people, no text, no logos, inviting client-focused space`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
  },

  seo: {
    prompt: `Laptop keyboard edge in soft focus, natural light from window, notepad beside, clean minimalist desk setup, warm wood tones, productivity atmosphere, documentary style, 35mm film grain, Portra 160 muted colors, no screens visible, no people, no text, authentic digital marketing workspace`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [103, 58, 228]],
  },

  training: {
    prompt: `Empty conference room with whiteboard, morning light through blinds creating patterns, leather chairs around polished table, professional development atmosphere, clean modern corporate interior, editorial photography, Kodak Ektar colors, no people, no text on whiteboard, no logos, authentic learning environment`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  'vendor-platform': {
    prompt: `Organized desk with file folders and documents stacked neatly, warm desk lamp glow, natural wood surface, professional organization aesthetic, evening work atmosphere, documentary style, Fuji Superia 400 warm tones, shallow focus on folder edges, no text visible, no people, authentic business operations feel`,
    style: 'dark',
    fallbackGradient: [[35, 59, 41], [41, 140, 66]],
  },

  // === CONTENT TYPES ===

  guide: {
    prompt: `Open book pages catching warm light, reading glasses resting nearby, cozy study atmosphere, morning light through curtains, educational welcoming mood, editorial lifestyle photography, Kodak Portra 800 warm tones, soft bokeh background, no readable text, no people, no faces, authentic knowledge-sharing aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [41, 140, 66]],
  },

  blog: {
    prompt: `Coffee cup on wooden desk beside open notebook, morning window light, green plant leaf in soft focus, creative workspace atmosphere, journaling moment, documentary lifestyle photography, 35mm film aesthetic, Portra 400 warm colors, no readable text, no people, no screens, authentic content creation space`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [37, 185, 123]],
  },

  'case-study': {
    prompt: `Stack of manila folders on conference table, natural afternoon light, glass of water nearby, professional meeting aftermath, serious business atmosphere, editorial photography, Kodak Gold 200 muted warmth, no visible text, no logos, no people, authentic results-focused business aesthetic`,
    style: 'dark',
    fallbackGradient: [[1, 25, 7], [255, 129, 88]],
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

  // Services
  if (normalizedSlug.includes('fractional-cmo')) return 'fractional-cmo'
  if (normalizedSlug.includes('marketing-strategy') || normalizedSlug.includes('strategy')) return 'marketing-strategy'
  if (normalizedSlug.includes('intake')) return 'intake-optimization'
  if (normalizedSlug.includes('seo')) return 'seo'
  if (normalizedSlug.includes('training')) return 'training'
  if (normalizedSlug.includes('vendor')) return 'vendor-platform'

  // Content types
  if (normalizedSlug.startsWith('guide/') || normalizedSlug === 'guide') return 'guide'
  if (normalizedSlug.startsWith('blog/') || normalizedSlug === 'blog') return 'blog'
  if (normalizedSlug.includes('case-study')) return 'case-study'

  // Practice areas
  if (normalizedSlug.includes('personal-injury') || normalizedSlug.includes('pi-')) return 'personal-injury'
  if (normalizedSlug.includes('family-law') || normalizedSlug.includes('family')) return 'family-law'
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
