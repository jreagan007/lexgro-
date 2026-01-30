/**
 * Auto-fix Content Style Issues for LEXGRO
 *
 * Automatically fixes style guide violations that have clear replacements.
 * Updates lastModified date in frontmatter.
 *
 * Usage:
 *   npx tsx scripts/fix-content-style.ts              # Fix all content
 *   npx tsx scripts/fix-content-style.ts --dry-run    # Preview changes without writing
 */

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'

const PROJECT_ROOT = process.cwd()

// CLI args
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')

// Today's date for lastModified
const TODAY = new Date().toISOString().split('T')[0]

// Auto-fixable patterns
const FIXES: { pattern: RegExp; replacement: string | ((match: string, ...args: any[]) => string); description: string }[] = [
  // Percentage symbols
  {
    pattern: /(\d+)%/g,
    replacement: '$1 percent',
    description: '% → percent',
  },
  // Em-dashes to periods or commas
  {
    pattern: /\s*—\s*/g,
    replacement: '. ',
    description: 'em-dash → period',
  },
  // Ampersands
  {
    pattern: /\s&\s/g,
    replacement: ' and ',
    description: '& → and',
  },
  // w/ abbreviation
  {
    pattern: /\bw\//gi,
    replacement: 'with',
    description: 'w/ → with',
  },
  // U.S. → US
  {
    pattern: /\bU\.S\.\b/g,
    replacement: 'US',
    description: 'U.S. → US',
  },
  // Year apostrophes (1990's → 1990s)
  {
    pattern: /(\d{4})'s\b/g,
    replacement: '$1s',
    description: "1990's → 1990s",
  },
  // Decimal without leading zero
  {
    pattern: /(?<!\d)\.(\d+)/g,
    replacement: '0.$1',
    description: '.5 → 0.5',
  },
  // "in order to" → "to"
  {
    pattern: /\bin order to\b/gi,
    replacement: 'to',
    description: 'in order to → to',
  },
  // "whether or not" → "whether"
  {
    pattern: /\bwhether or not\b/gi,
    replacement: 'whether',
    description: 'whether or not → whether',
  },
  // "in addition to this" → "in addition"
  {
    pattern: /\bin addition to this\b/gi,
    replacement: 'in addition',
    description: 'in addition to this → in addition',
  },
  // "utilize" → "use"
  {
    pattern: /\butilizes\b/gi,
    replacement: 'uses',
    description: 'utilizes → uses',
  },
  {
    pattern: /\butilized\b/gi,
    replacement: 'used',
    description: 'utilized → used',
  },
  {
    pattern: /\butilizing\b/gi,
    replacement: 'using',
    description: 'utilizing → using',
  },
  {
    pattern: /\butilize\b/gi,
    replacement: 'use',
    description: 'utilize → use',
  },
  // Note: "optimize/optimization" kept as-is because "Intake Optimization" is a service name

  // === GPT/AI VOCABULARY FIXES ===
  {
    pattern: /\bdelves?\s+into\b/gi,
    replacement: 'explores',
    description: 'delve into → explores',
  },
  {
    pattern: /\bdelves?\s+deeper\b/gi,
    replacement: 'looks closer',
    description: 'delve deeper → looks closer',
  },
  {
    pattern: /\bthe\s+(marketing|digital|legal|business)\s+landscape\b/gi,
    replacement: 'the $1 environment',
    description: '[x] landscape → [x] environment',
  },
  {
    pattern: /\bcrucially\b/gi,
    replacement: 'importantly',
    description: 'crucially → importantly',
  },
  {
    pattern: /\bcrucial\b/gi,
    replacement: 'critical',
    description: 'crucial → critical',
  },
  {
    pattern: /\brobust\b/gi,
    replacement: 'strong',
    description: 'robust → strong',
  },
  {
    pattern: /\bseamlessly\b/gi,
    replacement: 'smoothly',
    description: 'seamlessly → smoothly',
  },
  {
    pattern: /\bseamless\b/gi,
    replacement: 'smooth',
    description: 'seamless → smooth',
  },
  {
    pattern: /\bcutting[- ]edge\b/gi,
    replacement: 'modern',
    description: 'cutting-edge → modern',
  },
  {
    pattern: /\bgame[- ]changer\b/gi,
    replacement: 'major shift',
    description: 'game-changer → major shift',
  },
  {
    pattern: /\bempowers?\b/gi,
    replacement: 'helps',
    description: 'empower → helps',
  },
  {
    pattern: /\bempowering\b/gi,
    replacement: 'helping',
    description: 'empowering → helping',
  },
  {
    pattern: /\bempowerment\b/gi,
    replacement: 'support',
    description: 'empowerment → support',
  },
  {
    pattern: /\bunlock(s|ed|ing)?\s+the\s+potential\b/gi,
    replacement: 'reach full potential',
    description: 'unlock the potential → reach full potential',
  },
  {
    pattern: /\belevates?\s+(your|their|the)\b/gi,
    replacement: 'improves $1',
    description: 'elevate → improves',
  },
  {
    pattern: /\bstreamlines?\b/gi,
    replacement: 'simplifies',
    description: 'streamline → simplifies',
  },
  {
    pattern: /\bstreamlining\b/gi,
    replacement: 'simplifying',
    description: 'streamlining → simplifying',
  },
  {
    pattern: /\bstreamlined\b/gi,
    replacement: 'simplified',
    description: 'streamlined → simplified',
  },
  {
    pattern: /\bharness(es)?\s+the\s+power\b/gi,
    replacement: 'use the power',
    description: 'harness the power → use the power',
  },
  {
    pattern: /\bnavigate\s+the\s+complex\b/gi,
    replacement: 'handle the complex',
    description: 'navigate the complex → handle the complex',
  },
  {
    pattern: /\bin\s+the\s+realm\s+of\b/gi,
    replacement: 'in',
    description: 'in the realm of → in',
  },
  {
    pattern: /\bmultifaceted\b/gi,
    replacement: 'complex',
    description: 'multifaceted → complex',
  },
  {
    pattern: /\bmyriad\s+of\b/gi,
    replacement: 'many',
    description: 'myriad of → many',
  },
  {
    pattern: /\bmyriad\b/gi,
    replacement: 'many',
    description: 'myriad → many',
  },
  {
    pattern: /\bplethora\s+of\b/gi,
    replacement: 'many',
    description: 'plethora of → many',
  },
  {
    pattern: /\bfosters?\s+a\s+relationship\b/gi,
    replacement: 'builds a relationship',
    description: 'foster a relationship → builds a relationship',
  },
  {
    pattern: /\bfosters?\s+growth\b/gi,
    replacement: 'supports growth',
    description: 'foster growth → supports growth',
  },
  {
    pattern: /\bpivotal\b/gi,
    replacement: 'key',
    description: 'pivotal → key',
  },
  {
    pattern: /\bparamount\b/gi,
    replacement: 'most important',
    description: 'paramount → most important',
  },
  {
    pattern: /\bMoreover,\s*/g,
    replacement: 'Also, ',
    description: 'Moreover → Also',
  },
  {
    pattern: /\bFurthermore,\s*/g,
    replacement: 'Also, ',
    description: 'Furthermore → Also',
  },
  {
    pattern: /\bIn conclusion,?\s*/gi,
    replacement: '',
    description: 'In conclusion → (removed)',
  },
  {
    pattern: /\bIt'?s\s+important\s+to\s+note\s+that\s*/gi,
    replacement: '',
    description: "It's important to note that → (removed)",
  },
  {
    pattern: /\bIt'?s\s+worth\s+noting\s+that\s*/gi,
    replacement: '',
    description: "It's worth noting that → (removed)",
  },
  {
    pattern: /\bcomprehensive\s+guide\b/gi,
    replacement: 'complete guide',
    description: 'comprehensive guide → complete guide',
  },
  {
    pattern: /\bcomprehensive\s+overview\b/gi,
    replacement: 'full overview',
    description: 'comprehensive overview → full overview',
  },
  {
    pattern: /\bdeep\s*dive\b/gi,
    replacement: 'detailed look',
    description: 'deep dive → detailed look',
  },
  {
    pattern: /\bkey\s+takeaways?\b/gi,
    replacement: 'main points',
    description: 'key takeaways → main points',
  },
  {
    pattern: /\bat the end of the day\b/gi,
    replacement: 'ultimately',
    description: 'at the end of the day → ultimately',
  },
  {
    pattern: /\bdrive\s+results\b/gi,
    replacement: 'get results',
    description: 'drive results → get results',
  },
  {
    pattern: /\bdrive\s+growth\b/gi,
    replacement: 'create growth',
    description: 'drive growth → create growth',
  },
  {
    pattern: /\bdrives?\s+success\b/gi,
    replacement: 'creates success',
    description: 'drive success → creates success',
  },
  {
    pattern: /\bensure\s+that\s+you\b/gi,
    replacement: 'make sure you',
    description: 'ensure that you → make sure you',
  },
  {
    pattern: /\bensure\s+your\b/gi,
    replacement: 'make sure your',
    description: 'ensure your → make sure your',
  },
  {
    pattern: /\bensure\s+the\b/gi,
    replacement: 'make sure the',
    description: 'ensure the → make sure the',
  },

  // More AI vocabulary
  {
    pattern: /\b(the\s+)?(marketing|digital|legal|competitive)\s+landscape\b/gi,
    replacement: '$1$2 market',
    description: '[x] landscape → [x] market',
  },
  {
    pattern: /\bensure\s+you\b/gi,
    replacement: 'make sure you',
    description: 'ensure you → make sure you',
  },
  {
    pattern: /\bunlock\s+(your|the|their)\s+(full\s+)?potential\b/gi,
    replacement: 'reach $1 $2potential',
    description: 'unlock potential → reach potential',
  },
  // "leverage" and "synergy" jargon
  {
    pattern: /\bleverage\s+(your|their|our|the)\b/gi,
    replacement: 'use $1',
    description: 'leverage [x] → use [x]',
  },
  {
    pattern: /\bleverage\b/gi,
    replacement: 'use',
    description: 'leverage → use',
  },
  {
    pattern: /\bsynergies\b/gi,
    replacement: 'efficiencies',
    description: 'synergies → efficiencies',
  },
  // "move the needle" jargon
  {
    pattern: /\bmove the needle\b/gi,
    replacement: 'produce results',
    description: 'move the needle → produce results',
  },
  // "a lot" → more specific
  {
    pattern: /\ba lot of\s+(people|firms|clients|lawyers|attorneys)\b/gi,
    replacement: 'many $1',
    description: 'a lot of [x] → many [x]',
  },
  // Very [word] improvements
  {
    pattern: /\bVery expensive\b/gi,
    replacement: 'Expensive',
    description: 'Very expensive → Expensive',
  },
  {
    pattern: /\bVery time-consuming\b/gi,
    replacement: 'Time-consuming',
    description: 'Very time-consuming → Time-consuming',
  },
  {
    pattern: /\bVery specific\b/gi,
    replacement: 'Highly specific',
    description: 'Very specific → Highly specific',
  },
  {
    pattern: /\bVery high\b/gi,
    replacement: 'Extremely high',
    description: 'Very high → Extremely high',
  },
  // More fluff fixes
  {
    pattern: /\bvery little\b/gi,
    replacement: 'little',
    description: 'very little → little',
  },
  {
    pattern: /\bvery small\b/gi,
    replacement: 'small',
    description: 'very small → small',
  },
  {
    pattern: /\bvery important\b/gi,
    replacement: 'critical',
    description: 'very important → critical',
  },
  {
    pattern: /\bvery different\b/gi,
    replacement: 'quite different',
    description: 'very different → quite different',
  },
  {
    pattern: /\bvery few\b/gi,
    replacement: 'few',
    description: 'very few → few',
  },
  {
    pattern: /\breally\s+expensive\b/gi,
    replacement: 'expensive',
    description: 'really expensive → expensive',
  },
  {
    pattern: /\breally\s+important\b/gi,
    replacement: 'critical',
    description: 'really important → critical',
  },
  {
    pattern: /\breally\s+good\b/gi,
    replacement: 'excellent',
    description: 'really good → excellent',
  },
  {
    pattern: /\breally\s+bad\b/gi,
    replacement: 'poor',
    description: 'really bad → poor',
  },
  {
    pattern: /\breally\s+hard\b/gi,
    replacement: 'difficult',
    description: 'really hard → difficult',
  },
  {
    pattern: /\breally\s+well\b/gi,
    replacement: 'effectively',
    description: 'really well → effectively',
  },
  // "a lot" fixes
  {
    pattern: /\ba lot of margin\b/gi,
    replacement: 'significant margin',
    description: 'a lot of margin → significant margin',
  },
  {
    pattern: /\ba lot of time\b/gi,
    replacement: 'significant time',
    description: 'a lot of time → significant time',
  },
  {
    pattern: /\ba lot of money\b/gi,
    replacement: 'significant money',
    description: 'a lot of money → significant money',
  },
  {
    pattern: /\ba lot more\b/gi,
    replacement: 'much more',
    description: 'a lot more → much more',
  },
  // Passive voice common patterns
  {
    pattern: /\bis determined by\b/gi,
    replacement: 'depends on',
    description: 'is determined by → depends on',
  },
  {
    pattern: /\bare determined by\b/gi,
    replacement: 'depend on',
    description: 'are determined by → depend on',
  },
  {
    pattern: /\bis influenced by\b/gi,
    replacement: 'depends on',
    description: 'is influenced by → depends on',
  },
  {
    pattern: /\bis affected by\b/gi,
    replacement: 'depends on',
    description: 'is affected by → depends on',
  },
  {
    pattern: /\bcan be found\b/gi,
    replacement: 'exists',
    description: 'can be found → exists',
  },
  {
    pattern: /\bshould be noted\b/gi,
    replacement: 'note',
    description: 'should be noted → note',
  },
  {
    pattern: /\bneeds to be\b/gi,
    replacement: 'must be',
    description: 'needs to be → must be',
  },
  // Jargon
  {
    pattern: /\bholistic approach\b/gi,
    replacement: 'complete approach',
    description: 'holistic approach → complete approach',
  },
  {
    pattern: /\bholistic\b/gi,
    replacement: 'complete',
    description: 'holistic → complete',
  },
  {
    pattern: /\bsynergy\b/gi,
    replacement: 'collaboration',
    description: 'synergy → collaboration',
  },
  {
    pattern: /\bbandwidth\b/gi,
    replacement: 'capacity',
    description: 'bandwidth → capacity',
  },
]

interface FixResult {
  file: string
  fixCount: number
  fixes: string[]
}

/**
 * Update lastModified in frontmatter
 */
function updateLastModified(content: string): string {
  // Check if file has frontmatter
  if (!content.startsWith('---')) {
    return content
  }

  const frontmatterEnd = content.indexOf('---', 3)
  if (frontmatterEnd === -1) {
    return content
  }

  const frontmatter = content.slice(0, frontmatterEnd + 3)
  const body = content.slice(frontmatterEnd + 3)

  // Check if lastModified exists
  if (frontmatter.includes('lastModified:')) {
    // Update existing
    const updated = frontmatter.replace(
      /lastModified:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/,
      `lastModified: '${TODAY}'`
    )
    return updated + body
  } else {
    // Add lastModified before closing ---
    const lines = frontmatter.split('\n')
    const closingIndex = lines.lastIndexOf('---')
    if (closingIndex > 0) {
      lines.splice(closingIndex, 0, `lastModified: '${TODAY}'`)
      return lines.join('\n') + body
    }
  }

  return content
}

/**
 * Fix a single file
 */
function fixFile(filePath: string): FixResult | null {
  let content = fs.readFileSync(filePath, 'utf-8')
  const originalContent = content
  const relativePath = path.relative(PROJECT_ROOT, filePath)
  const fixes: string[] = []

  // Apply each fix
  for (const fix of FIXES) {
    const matches = content.match(fix.pattern)
    if (matches && matches.length > 0) {
      content = content.replace(fix.pattern, fix.replacement as string)
      fixes.push(`${fix.description} (${matches.length}x)`)
    }
  }

  // If changes were made, update lastModified
  if (content !== originalContent) {
    // Only update lastModified for MDX files with frontmatter
    if (filePath.endsWith('.mdx') || filePath.endsWith('.md')) {
      content = updateLastModified(content)
    }

    if (!dryRun) {
      fs.writeFileSync(filePath, content)
    }

    return {
      file: relativePath,
      fixCount: fixes.length,
      fixes,
    }
  }

  return null
}

/**
 * Get all content files
 */
async function getContentFiles(): Promise<string[]> {
  const patterns = [
    'src/content/**/*.{md,mdx}',
    'src/pages/**/*.astro',
  ]

  const files: string[] = []

  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd: PROJECT_ROOT })
    files.push(...matches.map(f => path.join(PROJECT_ROOT, f)))
  }

  return files
}

/**
 * Main function
 */
async function main() {
  console.log('\n🔧 LEXGRO Content Style Auto-Fix\n')

  if (dryRun) {
    console.log('🔍 DRY RUN - No files will be modified.\n')
  }

  const files = await getContentFiles()
  console.log(`Found ${files.length} content files to process.\n`)

  const results: FixResult[] = []
  let totalFixes = 0

  for (const file of files) {
    try {
      const result = fixFile(file)
      if (result) {
        results.push(result)
        totalFixes += result.fixes.length
      }
    } catch (error: any) {
      console.error(`Error processing ${file}: ${error.message}`)
    }
  }

  // Output results
  if (results.length === 0) {
    console.log('✅ No auto-fixable issues found!\n')
    return
  }

  console.log(`${dryRun ? 'Would fix' : 'Fixed'} ${totalFixes} issues in ${results.length} files.\n`)

  // Show details
  for (const result of results) {
    console.log(`\n📄 ${result.file}`)
    for (const fix of result.fixes) {
      console.log(`   ✓ ${fix}`)
    }
  }

  if (dryRun) {
    console.log('\n\nRun without --dry-run to apply fixes.\n')
  } else {
    console.log('\n\n✅ All auto-fixable issues have been resolved.')
    console.log('   Run `npm run audit` to check remaining issues.\n')
  }
}

main().catch(console.error)
