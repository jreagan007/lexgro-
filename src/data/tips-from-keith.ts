/**
 * Tips from Keith - YouTube Shorts Data
 *
 * Real YouTube Shorts from Keith Dyer's LEXGRO channel
 * YouTube Channel: https://www.youtube.com/@LEXGRO
 * Channel ID: UCJ3199OWH5cBbk4HGKQh6Qw
 */

export interface VideoTip {
  slug: string;
  title: string;
  description: string;
  topics: string[];
  youtubeId: string;
}

export const tips: VideoTip[] = [
  // ── Newer shorts (from channel page, Feb 2026) ──
  {
    slug: 'what-really-matters-law-firm-website',
    title: 'What Really Matters on a Law Firm Website',
    description: 'Keith Dyer breaks down the elements that actually drive conversions on law firm websites.',
    topics: ['Website', 'Conversion'],
    youtubeId: 'GWqkNo_zUSE',
  },
  {
    slug: 'two-contact-options-every-website-must-have',
    title: 'The Two Contact Options Every Website Must Have',
    description: 'Your website needs exactly two contact methods to maximize intake. Here is what they are.',
    topics: ['Website', 'Intake'],
    youtubeId: 'VPPuw-XzSyU',
  },
  {
    slug: 'why-calls-to-action-matter',
    title: 'Why Calls to Action Matter on Law Firm Websites',
    description: 'A weak CTA costs you cases every day. Keith explains what makes a call to action work.',
    topics: ['Website', 'CTA'],
    youtubeId: 'v3OnTUfzJj0',
  },
  {
    slug: 'cool-design-hurts-purpose',
    title: "Don't Let Cool Design Hurt Your Website's Purpose",
    description: 'Flashy design can actually hurt conversion rates. Function beats form every time.',
    topics: ['Website', 'Design'],
    youtubeId: '-h_hT_VwlIQ',
  },
  {
    slug: 'case-costs-legal-finance',
    title: 'Case Costs and Legal Finance: What You Need to Know',
    description: 'Understanding the tax implications of case costs and how they affect law firm growth.',
    topics: ['Finance', 'Growth'],
    youtubeId: 'WTIIGS-ucCA',
  },
  {
    slug: 'big-website-mistake-law-firms-make',
    title: 'The Big Website Mistake Law Firms Still Make',
    description: 'Keith Dyer calls out the number one mistake he sees on law firm websites across the country.',
    topics: ['Website', 'Strategy'],
    youtubeId: 'EiVh4f3oqmE',
  },
  // ── Older shorts (from live Framer site) ──
  {
    slug: 'law-firm-marketing-and-intake',
    title: 'Law Firm Marketing and Intake: The Connection',
    description: 'Marketing and intake are two sides of the same coin. Here is how to align them.',
    topics: ['Marketing', 'Intake'],
    youtubeId: '9XlxoExUj_M',
  },
  {
    slug: 'optimize-intake-departments',
    title: "Why Don't Law Firms Optimize Their Intake Departments?",
    description: 'Most firms pour money into marketing but neglect the intake process. Keith explains why that is a mistake.',
    topics: ['Intake', 'Operations'],
    youtubeId: '76XILg-YyaM',
  },
  {
    slug: 'law-firm-advertising-fundamentals',
    title: 'Law Firm Advertising Fundamentals',
    description: 'The basics of law firm advertising that every managing partner should understand.',
    topics: ['Advertising', 'Strategy'],
    youtubeId: '70iRQOnVsk0',
  },
  {
    slug: 'law-firm-advertising-mistakes',
    title: 'Common Law Firm Advertising Mistakes',
    description: 'Keith shares the advertising mistakes he sees law firms make over and over.',
    topics: ['Advertising', 'Budget'],
    youtubeId: 'PN2rIkpox9U',
  },
  {
    slug: 'still-buying-leads',
    title: 'Still Buying Leads? Think Again.',
    description: 'Bought leads are a race to the bottom. Keith explains why building your own pipeline wins.',
    topics: ['Lead Gen', 'Strategy'],
    youtubeId: 'Di1VJ7o_LXo',
  },
];

export function getTips(): VideoTip[] {
  return [...tips];
}
