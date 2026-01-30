/**
 * Content Style Audit Script for LEXGRO
 *
 * Audits all content (pages, blogs, guides, etc.) against the style guide rules.
 *
 * Usage:
 *   npx tsx scripts/audit-content.ts              # Audit all content
 *   npx tsx scripts/audit-content.ts --fix        # Show suggested fixes
 *   npx tsx scripts/audit-content.ts --verbose    # Show all issues with context
 *
 * Checks for:
 *   - Em-dashes (—)
 *   - Percentage symbols (% instead of "percent")
 *   - Jargon words (synergy, leverage, utilize, etc.)
 *   - Paragraphs over 5 lines
 *   - Sentences starting with numbers
 *   - Passive voice indicators
 *   - Ampersands (&)
 *   - And more...
 */

import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'

const PROJECT_ROOT = process.cwd()

// CLI args
const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const showFixes = args.includes('--fix')

// Style guide rules
const RULES = {
  // Characters to avoid
  emDash: {
    pattern: /—/g,
    message: 'Em-dash found. Use periods, commas, colons, or parentheses instead.',
    fix: (match: string) => '. ',
  },
  percentSymbol: {
    pattern: /(\d+)%/g,
    message: 'Percentage symbol found. Use "percent" spelled out (e.g., "25 percent").',
    fix: (match: string, num: string) => `${num} percent`,
  },
  ampersand: {
    pattern: /\s&\s/g,
    message: 'Ampersand found. Use "and" instead.',
    fix: () => ' and ',
  },
  withAbbrev: {
    pattern: /\bw\//gi,
    message: 'Abbreviation "w/" found. Spell out "with".',
    fix: () => 'with',
  },

  // Jargon words
  jargonSynergy: {
    pattern: /\bsynerg(y|ize|ies|istic)\b/gi,
    message: 'Jargon "synergy" found. Use "combine," "integrate," or be specific.',
  },
  jargonLeverage: {
    pattern: /\bleverage\b/gi,
    message: 'Jargon "leverage" (as verb) found. Use "use," "apply," or "build on".',
  },
  jargonUtilize: {
    pattern: /\butilize[sd]?\b/gi,
    message: 'Jargon "utilize" found. Use "use" instead.',
    fix: (match: string) => match.replace(/utiliz/gi, 'us'),
  },
  jargonHolistic: {
    pattern: /\bholistic(ally)?\b/gi,
    message: 'Jargon "holistic" found. Be more specific about what you mean.',
  },
  jargonParadigm: {
    pattern: /\bparadigm\s*(shift)?\b/gi,
    message: 'Jargon "paradigm" found. Use simpler language.',
  },
  // Note: "optimize/optimization" excluded - "Intake Optimization" is a service name
  // Review these manually if needed
  jargonBandwidth: {
    pattern: /\bbandwidth\b/gi,
    message: 'Jargon "bandwidth" found. Use "time" or "capacity" instead.',
  },
  jargonCircleBack: {
    pattern: /\bcircle\s*back\b/gi,
    message: 'Jargon "circle back" found. Use "follow up" instead.',
  },
  jargonMoveNeedle: {
    pattern: /\bmove\s*the\s*needle\b/gi,
    message: 'Jargon "move the needle" found. Use "make a difference" or "improve".',
  },

  // === GPT/AI VOCABULARY (sounds machine-generated) ===
  aiDelve: {
    pattern: /\bdelve(s|d)?\s*(into|deeper)?\b/gi,
    message: 'AI vocabulary "delve" found. Use "explore," "examine," or "look at."',
  },
  aiLandscape: {
    pattern: /\b(the\s+)?(marketing|digital|legal|business|competitive)\s+landscape\b/gi,
    message: 'AI vocabulary "landscape" found. Be more specific about what you mean.',
  },
  aiCrucial: {
    pattern: /\bcrucial(ly)?\b/gi,
    message: 'AI vocabulary "crucial" found. Use "important," "critical," or "essential."',
  },
  aiRobust: {
    pattern: /\brobust\b/gi,
    message: 'AI vocabulary "robust" found. Use "strong," "solid," or be specific.',
  },
  aiSeamless: {
    pattern: /\bseamless(ly)?\b/gi,
    message: 'AI vocabulary "seamless" found. Use "smooth," "easy," or be specific.',
  },
  aiCuttingEdge: {
    pattern: /\bcutting[- ]edge\b/gi,
    message: 'AI vocabulary "cutting-edge" found. Use "modern," "new," or be specific.',
  },
  aiGameChanger: {
    pattern: /\bgame[- ]changer\b/gi,
    message: 'AI vocabulary "game-changer" found. Be specific about the impact.',
  },
  aiEmpower: {
    pattern: /\bempower(s|ed|ing|ment)?\b/gi,
    message: 'AI vocabulary "empower" found. Use "help," "enable," or "give."',
  },
  aiUnlock: {
    pattern: /\bunlock(s|ed|ing)?\s+(the\s+)?(potential|power|value|growth)\b/gi,
    message: 'AI vocabulary "unlock [potential]" found. Be specific about what happens.',
  },
  aiElevate: {
    pattern: /\belevate(s|d)?\s+(your|their|the)?\b/gi,
    message: 'AI vocabulary "elevate" found. Use "improve," "raise," or be specific.',
  },
  aiStreamline: {
    pattern: /\bstreamline(s|d)?\b/gi,
    message: 'AI vocabulary "streamline" found. Use "simplify," "speed up," or be specific.',
  },
  aiHarness: {
    pattern: /\bharness(es|ed|ing)?\s+(the\s+)?(power|potential)\b/gi,
    message: 'AI vocabulary "harness the power" found. Be specific.',
  },
  aiNavigate: {
    pattern: /\bnavigate\s+(the\s+)?(complex|challenging|difficult)\b/gi,
    message: 'AI vocabulary "navigate the complex" found. Be more direct.',
  },
  aiRealm: {
    pattern: /\b(in\s+the\s+)?realm\s+of\b/gi,
    message: 'AI vocabulary "realm of" found. Just say "in" or be specific.',
  },
  aiMultifaceted: {
    pattern: /\bmultifaceted\b/gi,
    message: 'AI vocabulary "multifaceted" found. Use "complex" or list the facets.',
  },
  aiMyriad: {
    pattern: /\bmyriad\s+(of\s+)?\b/gi,
    message: 'AI vocabulary "myriad" found. Use "many" or give a number.',
  },
  aiPlethora: {
    pattern: /\bplethora\s+of\b/gi,
    message: 'AI vocabulary "plethora" found. Use "many" or give a number.',
  },
  aiFoster: {
    pattern: /\bfoster(s|ed|ing)?\s+(a\s+)?(relationship|growth|environment)\b/gi,
    message: 'AI vocabulary "foster" found. Use "build," "create," or "develop."',
  },
  aiPivotal: {
    pattern: /\bpivotal\b/gi,
    message: 'AI vocabulary "pivotal" found. Use "important" or "key."',
  },
  aiParamount: {
    pattern: /\bparamount\b/gi,
    message: 'AI vocabulary "paramount" found. Use "most important" or "top priority."',
  },
  aiMoreover: {
    pattern: /\bMoreover,\b/g,
    message: 'AI transition "Moreover" found. Use "Also" or restructure.',
  },
  aiFurthermore: {
    pattern: /\bFurthermore,\b/g,
    message: 'AI transition "Furthermore" found. Use "Also" or restructure.',
  },
  aiInConclusion: {
    pattern: /\bIn conclusion,?\b/gi,
    message: 'AI phrase "In conclusion" found. Just state your conclusion.',
  },
  aiImportantToNote: {
    pattern: /\b(It'?s\s+)?(important|worth)\s+(to\s+)?not(e|ing)\s+(that\s+)?\b/gi,
    message: 'AI phrase "important to note" found. Just state the point directly.',
  },
  aiComprehensive: {
    pattern: /\bcomprehensive\s+(guide|overview|look|analysis)\b/gi,
    message: 'AI phrase "comprehensive guide" found. Be specific about what it covers.',
  },
  aiDeepDive: {
    pattern: /\bdeep\s*dive\b/gi,
    message: 'AI vocabulary "deep dive" found. Use "detailed look" or "analysis."',
  },
  aiTakeaway: {
    pattern: /\bkey\s+takeaway(s)?\b/gi,
    message: 'AI phrase "key takeaways" found. Just list the points.',
  },
  aiAtTheEndOfTheDay: {
    pattern: /\bat the end of the day\b/gi,
    message: 'AI phrase "at the end of the day" found. Use "ultimately" or remove.',
  },
  aiLeverageInsights: {
    pattern: /\bleverage\s+(insights|data|analytics)\b/gi,
    message: 'AI phrase found. Use "use" instead of "leverage."',
  },
  aiDriveResults: {
    pattern: /\bdrive\s+(results|growth|success|value)\b/gi,
    message: 'AI phrase "drive results" found. Be specific about what happens.',
  },
  aiEnsure: {
    pattern: /\bensure\s+(that\s+)?(you|your|the)\b/gi,
    message: 'AI word "ensure" found. Use "make sure" or rewrite.',
  },

  // Fluff words
  fluffInOrderTo: {
    pattern: /\bin order to\b/gi,
    message: 'Fluff phrase "in order to" found. Replace with "to".',
    fix: () => 'to',
  },
  fluffVery: {
    pattern: /\bvery\s+\w+/gi,
    message: 'Fluff word "very" found. Be more specific or remove.',
  },
  fluffReally: {
    pattern: /\breally\b/gi,
    message: 'Fluff word "really" found. Be specific with numbers/facts instead.',
  },
  fluffALot: {
    pattern: /\ba\s+lot\b/gi,
    message: 'Fluff phrase "a lot" found. Quantify with specific numbers.',
  },
  fluffWhetherOrNot: {
    pattern: /\bwhether\s+or\s+not\b/gi,
    message: 'Fluff phrase "whether or not" found. Use just "whether".',
    fix: () => 'whether',
  },
  fluffInAdditionToThis: {
    pattern: /\bin addition to this\b/gi,
    message: 'Fluff phrase found. Use "in addition" instead.',
    fix: () => 'in addition',
  },

  // Formatting issues
  sentenceStartsWithNumber: {
    pattern: /(?:^|\.\s+)(\d+)\s+\w+/gm,
    message: 'Sentence starts with a number. Rewrite to avoid starting with a number.',
  },
  usDotted: {
    pattern: /\bU\.S\./g,
    message: 'Use "US" without periods, or spell out "United States".',
    fix: () => 'US',
  },
  yearApostrophe: {
    pattern: /\d{4}'s\b/g,
    message: 'Incorrect year format. Use "1990s" not "1990\'s".',
    fix: (match: string) => match.replace("'s", 's'),
  },
  decimalNoDot: {
    pattern: /(?<!\d)\.\d+/g,
    message: 'Decimal without leading zero. Use "0.5" not ".5".',
    fix: (match: string) => '0' + match,
  },

  // Passive voice indicators (simplified check)
  passiveVoice: {
    pattern: /\b(was|were|been|being|is|are|am)\s+(being\s+)?\w+ed\b/gi,
    message: 'Possible passive voice detected. Consider using active voice.',
  },
}

// Meta description length check
const META_RULES = {
  descriptionTooLong: {
    pattern: /description:\s*["']?(.{161,})["']?/i,
    message: 'Meta description exceeds 160 characters.',
  },
  titleTooLong: {
    pattern: /title:\s*["']?(.{61,})["']?/i,
    message: 'Meta title exceeds 60 characters.',
  },
}

interface Issue {
  file: string
  line: number
  column: number
  rule: string
  message: string
  context: string
  fix?: string
}

/**
 * Check a file for style violations
 */
function auditFile(filePath: string): Issue[] {
  const issues: Issue[] = []
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relativePath = path.relative(PROJECT_ROOT, filePath)

  // Check each rule
  for (const [ruleName, rule] of Object.entries(RULES)) {
    let match
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags)

    while ((match = regex.exec(content)) !== null) {
      // Find line number
      const beforeMatch = content.slice(0, match.index)
      const lineNum = beforeMatch.split('\n').length
      const lineStart = beforeMatch.lastIndexOf('\n') + 1
      const column = match.index - lineStart + 1

      // Get context (the line containing the match)
      const contextLine = lines[lineNum - 1] || ''

      const issue: Issue = {
        file: relativePath,
        line: lineNum,
        column,
        rule: ruleName,
        message: rule.message,
        context: contextLine.trim().slice(0, 100),
      }

      // Add fix suggestion if available
      if (showFixes && 'fix' in rule && typeof rule.fix === 'function') {
        issue.fix = match[0].replace(rule.pattern, rule.fix as any)
      }

      issues.push(issue)
    }
  }

  // Check meta rules for frontmatter
  if (content.startsWith('---')) {
    const frontmatterEnd = content.indexOf('---', 3)
    if (frontmatterEnd > 0) {
      const frontmatter = content.slice(0, frontmatterEnd)

      for (const [ruleName, rule] of Object.entries(META_RULES)) {
        const match = rule.pattern.exec(frontmatter)
        if (match) {
          issues.push({
            file: relativePath,
            line: 1,
            column: 1,
            rule: ruleName,
            message: rule.message,
            context: match[1]?.slice(0, 60) + '...',
          })
        }
      }
    }
  }

  // Check paragraph length for MDX content files only (skip .astro files which have JSX)
  if (filePath.endsWith('.mdx') || filePath.endsWith('.md')) {
    let consecutiveLines = 0
    let paragraphStart = 0
    let inFrontmatter = false
    let inCodeBlock = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Track frontmatter
      if (line === '---') {
        inFrontmatter = !inFrontmatter
        consecutiveLines = 0
        continue
      }
      if (inFrontmatter) continue

      // Track code blocks
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock
        consecutiveLines = 0
        continue
      }
      if (inCodeBlock) continue

      // Skip headers, lists, tables, HTML, imports, and empty lines
      if (
        line.length === 0 ||
        line.startsWith('#') ||
        line.startsWith('-') ||
        line.startsWith('*') ||
        line.startsWith('|') ||
        line.startsWith('<') ||
        line.startsWith('>') ||
        line.startsWith('import ') ||
        line.startsWith('export ') ||
        line.match(/^\d+\./)
      ) {
        consecutiveLines = 0
        continue
      }

      // Count consecutive prose lines
      if (consecutiveLines === 0) paragraphStart = i + 1
      consecutiveLines++

      if (consecutiveLines > 5) {
        issues.push({
          file: relativePath,
          line: paragraphStart,
          column: 1,
          rule: 'paragraphTooLong',
          message: `Paragraph exceeds 5 lines (${consecutiveLines} lines). Add a line break for readability.`,
          context: lines[paragraphStart - 1]?.trim().slice(0, 60) + '...',
        })
        consecutiveLines = 0 // Reset to avoid duplicate warnings
      }
    }
  }

  return issues
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
 * Format issue for output
 */
function formatIssue(issue: Issue, index: number): string {
  let output = `\n${index + 1}. ${issue.file}:${issue.line}:${issue.column}`
  output += `\n   Rule: ${issue.rule}`
  output += `\n   ${issue.message}`

  if (verbose) {
    output += `\n   Context: "${issue.context}"`
  }

  if (issue.fix) {
    output += `\n   Suggested fix: "${issue.fix}"`
  }

  return output
}

/**
 * Main audit function
 */
async function main() {
  console.log('\n📋 LEXGRO Content Style Audit\n')
  console.log('Checking all content against style guide rules...\n')

  const files = await getContentFiles()
  console.log(`Found ${files.length} content files to audit.\n`)

  const allIssues: Issue[] = []
  const fileIssues: Map<string, Issue[]> = new Map()

  for (const file of files) {
    try {
      const issues = auditFile(file)
      if (issues.length > 0) {
        allIssues.push(...issues)
        fileIssues.set(path.relative(PROJECT_ROOT, file), issues)
      }
    } catch (error: any) {
      console.error(`Error auditing ${file}: ${error.message}`)
    }
  }

  // Summary by rule
  const ruleCount: Map<string, number> = new Map()
  for (const issue of allIssues) {
    ruleCount.set(issue.rule, (ruleCount.get(issue.rule) || 0) + 1)
  }

  // Output results
  if (allIssues.length === 0) {
    console.log('✅ No style guide violations found!\n')
    return
  }

  console.log(`⚠️  Found ${allIssues.length} potential issues in ${fileIssues.size} files.\n`)

  // Summary table
  console.log('📊 Issues by Rule:\n')
  const sortedRules = [...ruleCount.entries()].sort((a, b) => b[1] - a[1])
  for (const [rule, count] of sortedRules) {
    console.log(`   ${rule}: ${count}`)
  }

  // Detailed output if verbose
  if (verbose) {
    console.log('\n📝 Detailed Issues:\n')

    let index = 0
    for (const [file, issues] of fileIssues) {
      console.log(`\n--- ${file} (${issues.length} issues) ---`)
      for (const issue of issues) {
        console.log(formatIssue(issue, index++))
      }
    }
  } else {
    console.log('\nRun with --verbose to see detailed issues.')
    console.log('Run with --fix to see suggested fixes.')
  }

  // Top offending files
  console.log('\n📁 Files with Most Issues:\n')
  const sortedFiles = [...fileIssues.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)

  for (const [file, issues] of sortedFiles) {
    console.log(`   ${issues.length.toString().padStart(3)} issues: ${file}`)
  }

  console.log('\n')
}

main().catch(console.error)
