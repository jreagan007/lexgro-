# LEXGRO Design System

The single source of truth for brand, visual design, content standards, photography, and accessibility. When this document conflicts with any other doc, this document wins.

**Last updated:** 2026-02-17

---

## Table of Contents

1. [Brand Foundation](#1-brand-foundation)
2. [Visual Identity](#2-visual-identity)
3. [Photography and Image Guardrails](#3-photography-and-image-guardrails)
4. [Page Component Patterns](#4-page-component-patterns)
5. [Structured Data (JSON-LD Schema)](#5-structured-data-json-ld-schema)
6. [FAQ Component Pattern](#6-faq-component-pattern)
7. [References Component Pattern](#7-references-component-pattern)
8. [Content Standards](#8-content-standards)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Tool Stack](#10-tool-stack)
11. [Quick Reference Checklists](#11-quick-reference-checklists)

---

## 1. Brand Foundation

### Mission

LEXGRO helps law firms build predictable, durable growth by aligning strategy, execution, and accountability under one system.

### Vision

To become the most trusted growth partner in legal marketing, known for honest advice, deep expertise, and measurable results.

### Positioning

- **Hero tagline:** "Stop Guessing. Start Leading."
- **What we sell:** Research-backed, editorially audited content and full-funnel marketing for law firms.
- **Differentiator:** "Execution Is the Strategy." Plans without implementation are worthless.

### Core Values

1. Aligned Interests Above All
2. Objectivity Over Ego
3. Execution Is the Strategy
4. Accountability Through Data
5. Ethical Conduct, Always
6. Respect for People and Perspectives
7. Trusted Partners Only
8. Professional Communication Is Non-Negotiable
9. Intentional Growth

### Target Audience

Law firms between $2M and $15M in revenue that spend $10K or more per month on marketing but lack strategic ownership and accountability for signed cases. Managing partners and firm leaders who want a partner, not a vendor.

### Brand Voice

LEXGRO speaks as a **trusted partner**, not a vendor. Keith's voice: direct, no fluff, actionable.

| Attribute | What it means |
|-----------|---------------|
| **Conversational** | Write like you talk. Read it out loud. If it sounds stiff, rewrite it. |
| **Confident** | We know what works. No hedging or corporate speak. |
| **Direct** | Get to the point. Respect the reader's time. |
| **Warm** | We genuinely care about helping law firms grow. |

### What to Say vs. What Not to Say

| Say | Do not say |
|-----|-----------|
| Research-backed editorial | AI-generated |
| Data-driven strategy | Guessing |
| Enterprise-level visual brand | Templates |
| Full-funnel approach | Just SEO |
| Partner | Vendor, provider |
| Growth | Success (too vague) |
| Revenue | Results (when talking money) |
| Help | Assist, enable |

### Brand References

- **LEXGRO:** Always all caps
- **Keith Dunnivant:** Full name on first reference, "Keith" after
- **Fractional CMO:** Capitalize when referring to the service or role title

---

## 2. Visual Identity

### Color Palette

#### Primary Colors (Green System)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#298C42` | Main brand green. Buttons, links, accents. |
| `--color-primary-dark` | `#1F8238` | Hover and active states. |
| `--color-primary-light` | `#3DA056` | Light variant. |
| `--color-teal` | `#1AA774` | Secondary green. |
| `--color-mint` | `#25B97B` | Tertiary accent. OG image accent lines. |

#### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#FF8158` | Orange accent for highlights, CTAs. |
| `--color-accent-purple` | `#673AE4` | Purple accent. |

#### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-dark` | `#011907` | Dark hero sections, footer. |
| `--color-bg-dark-alt` | `#233B29` | Alternative dark backgrounds. |
| Light sections | `#fafafa` | All light alternating sections. Use the literal value, NOT a CSS variable. |
| `--color-bg-light` | `#C0E9CA` | Light green tint (use sparingly). |
| `--color-bg-lighter` | `#D6FFE0` | Very light green. |

#### Text Colors

| Token | Hex | Context | WCAG |
|-------|-----|---------|------|
| `--color-text-dark` | `#212121` | Body text on white/light bg | AAA |
| Dark bg muted | `#b0b8b3` | Muted text on `#011907` dark bg | AA (4.8:1) |
| Light bg muted | `#4b5563` | Muted text on `#fafafa` or white | AA (7.5:1) |
| `--color-text-muted` | `#779B80` | Sage muted (decorative only, fails WCAG on some bg) | Check per use |

#### Slate Palette (Neutral UI Elements)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-slate` | `#64748b` | Section badges, neutral muted elements. |
| `--color-slate-light` | `#94a3b8` | Light slate. |
| `--color-slate-dark` | `#475569` | Dark slate. |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Success | `#298C42` | Same as primary green. |
| Warning | `#FFBC00` | Attention states. |
| Error | `#FF8158` | Error states (same as accent orange). |
| Info | `#75ACFF` | Informational. |

### Typography

#### Font Stack

| Role | Font | Fallbacks |
|------|------|-----------|
| **Primary** | Inter | system-ui, -apple-system, sans-serif |
| **Display** | Inter Display | Inter, system-ui, sans-serif |
| **Monospace** | Fragment Mono | SF Mono, Monaco, monospace |
| **OG headings** | Be Vietnam Pro | (image compositing only) |
| **OG body** | DM Sans | (image compositing only) |

#### Type Scale

| Name | Size | Px | Usage |
|------|------|----|-------|
| xs | 0.75rem | 12px | Fine print, labels |
| sm | 0.875rem | 14px | Small text, captions |
| base | 1rem | 16px | Body text |
| lg | 1.125rem | 18px | Large body, lead text |
| xl | 1.375rem | 22px | Small headings |
| 2xl | 1.75rem | 28px | Section subheads |
| 3xl | 2.25rem | 36px | Section headings |
| 4xl | 3rem | 48px | Page headings |
| 5xl | 3.75rem | 60px | Hero headings (desktop) |
| 6xl | 4.5rem | 72px | Display headings |

#### Font Weights

| Name | Weight | Usage |
|------|--------|-------|
| light | 400 | Body text |
| normal | 500 | Standard weight |
| medium | 600 | Emphasized text, subheads |
| bold | 700 | Headings, bold text |
| extrabold | 800 | Hero headings, display |

#### Line Heights

| Name | Value | Usage |
|------|-------|-------|
| tight | 1.2 | Headings |
| snug | 1.3 | Subheadings |
| normal | 1.45 | Body text |
| relaxed | 1.6 | Lead paragraphs, comfortable reading |
| loose | 1.8 | Spacious layouts |

#### Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| tighter | -0.05em | Large display text |
| tight | -0.025em | Headings |
| normal | 0 | Body text |
| wide | 0.025em | Small caps, labels |
| wider | 0.05em | Badges, uppercase text |
| badge | 0.2em | Section badges specifically |

### Layout System

#### Grid

| Token | Value | Usage |
|-------|-------|-------|
| maxWidth | 1440px | Outer container |
| contentWidth | 1200px | Content container |
| narrowWidth | 800px | Prose content, blog posts |

#### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| mobile | 810px | Mobile-first breakpoint |
| tablet | 1200px | Tablet and small desktop |
| desktop | 1440px | Full desktop |

#### Spacing Scale

| Token | Value | Px |
|-------|-------|----|
| 1 | 0.25rem | 4px |
| 2 | 0.5rem | 8px |
| 3 | 0.75rem | 12px |
| 4 | 1rem | 16px |
| 5 | 1.25rem | 20px |
| 6 | 1.5rem | 24px |
| 8 | 2rem | 32px |
| 10 | 2.5rem | 40px |
| 12 | 3rem | 48px |
| 16 | 4rem | 64px |
| 20 | 5rem | 80px |
| 24 | 6rem | 96px |
| 32 | 8rem | 128px |

### Borders and Radii

| Name | Value | Usage |
|------|-------|-------|
| sm | 6px | Small elements, inputs |
| md | 10px | Medium containers |
| lg | 14px | Large containers |
| xl | 24px | Modal-size containers |
| 2xl | 32px | Hero containers |
| pill | 100px | Section badges |
| full | 9999px | Circles, avatars |
| **card** | **16px** | All card components (critical) |
| stat-item | 8px | Hero stat items |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| **card** | `0 4px 24px rgba(0, 0, 0, 0.04)` | All card components (critical) |
| soft | See tokens.ts | Soft elevation |
| deep | See tokens.ts | Modals, dropdowns |
| button | See tokens.ts | Button elevation |

### Transitions

| Name | Duration | Usage |
|------|----------|-------|
| fast | 150ms ease | Hover states |
| normal | 250ms ease | Standard transitions |
| slow | 350ms ease | Layout shifts |
| slower | 500ms ease | Page transitions |

---

## 3. Photography and Image Guardrails

### Hard Rules (Never Break These)

1. **NO people or faces.** Ever. Legal and rights issues.
2. **NO readable text** in the image. No signs, no documents, no screens with text.
3. **NO logos.** Not ours, not anyone's.
4. **NO computer screens, phones, or devices** showing content.
5. **NO perfect studio lighting.** Must feel natural and imperfect.
6. **NO obvious AI artifacts.** If it looks generated, regenerate.
7. **NO generic stock photo compositions.** No handshakes, no pointing at charts.

### Documentary Photography Aesthetic

- **Style:** 35mm documentary film photography
- **Era:** 1970s to 1990s corporate and editorial
- **Film stocks:** Kodak Portra 400, Kodak Gold 200, Kodak Ektar, Fuji Pro 400H
- **Characteristics:** Natural grain, warm muted tones, imperfect authenticity

### Subject Matter

- Executive boardrooms, corner offices, professional workspaces
- Natural light through windows (golden hour preferred)
- Empty spaces suggesting recent activity (coffee cup left behind, chair pushed back)
- Architectural elements (glass, wood, plants)
- Upward perspectives for ambition and growth
- Leading lines toward light sources
- Depth through foreground elements

### Prompt Template

Every image generation prompt MUST follow this structure:

```
[Subject/setting], [lighting conditions], [atmospheric details],
[era reference] documentary style, shot on [film stock],
[grain/color characteristics], no people, no text, no logos,
[mood/atmosphere description]
```

**Required keywords in every prompt:**
- One film stock reference (Kodak Portra 400, Kodak Gold 200, Fuji Pro 400H, or Kodak Ektar)
- "no people, no text, no logos"
- "documentary style" or "documentary photography"
- A grain or color characteristic (e.g., "slight grain," "warm muted tones")

**Forbidden keywords in prompts:**
- "stock photo," "professional," "perfect"
- "modern," "sleek," "minimalist" (contradicts era reference)
- "bright," "vivid," "saturated" (contradicts muted palette)
- "digital," "high resolution," "clean"
- Any person-related words: "man," "woman," "person," "hand," "figure"

### Example Prompts by Page Type

**Homepage and About:**
```
Empty executive boardroom at dawn, floor-to-ceiling windows
overlooking city skyline, leather chairs pushed back from long table,
coffee cup left behind, golden hour light casting long shadows,
1990s corporate documentary style, shot on Kodak Portra 400,
slight grain, warm muted professional tones, no people, no text,
no logos, authentic ambitious atmosphere
```

**Blog and Content:**
```
Morning coffee steam rising beside leather journal, pen uncapped,
natural window light, green plant leaf in soft focus, creative
workspace atmosphere, 1990s journaling documentary style, 35mm
film grain, Portra 400 warm colors, no readable text, no people,
authentic content creation space
```

**Services:**
```
Corner office at dusk, city lights beginning to glow through window,
empty leather chair at mahogany desk, briefcase beside, strategic
leadership atmosphere, 1990s corporate photography style, Kodak
Portra 400 warm colors with cool exterior, no people, no text,
no computer screens, authentic C-suite executive environment
```

### OG Image Specifications

| Property | OG Image | Card Image |
|----------|----------|------------|
| **Dimensions** | 1200 x 630px (1.9:1) | 800 x 450px (16:9) |
| **Padding** | 80px all sides | 48px all sides |
| **Text area** | Left 60% | Left 60% |
| **Logo position** | Bottom-right, 80px from edges | Bottom-right |
| **Logo size** | 160px wide | 100px wide |

#### OG Layer Structure

1. **Base image:** AI-generated film photography (Gemini)
2. **Dark overlay:** Diagonal gradient (90% opacity bottom-left to 30% top-right)
3. **Accent bar:** 6px green bar on left edge (`#298C42`)
4. **Text overlay:** Category, title, branding
5. **Logo:** White LEXGRO wordmark (bottom-right)

#### OG Typography

| Element | Size | Weight | Spacing | Color |
|---------|------|--------|---------|-------|
| Accent line | 50px wide, 4px tall | n/a | n/a | `#25B97B` mint |
| Category | 13px | 700 | 0.3em, uppercase | `#25B97B` mint |
| Title | 56px (OG) / 42px (cards) | 800 | -0.02em | white |
| Branding | 14px | 600 | 0.12em, uppercase | white at 50% opacity |

#### OG Overlay Gradient

```
Start:  #011907 at 90% opacity (bottom-left)
Mid:    #011907 at 60% opacity (center)
End:    #233B29 at 30% opacity (top-right)
```

### Hero Image Specifications

Hero images are background images behind dark overlays on page heroes.

| Property | Value |
|----------|-------|
| Position | `position: absolute; inset: 0` |
| Sizing | `width: 100%; height: 100%; object-fit: cover` |
| z-index | Image: 0, Overlay: 1, Content: 2 |

#### Hero Overlay Values by Page Type

| Page Type | 0% | 40% | 100% | Notes |
|-----------|----|-----|------|-------|
| **Homepage** | `rgba(1,25,7, 0.65)` | `rgba(1,25,7, 0.6)` | `rgba(1,25,7, 0.5)` | Lightest. Keith's photo visible. |
| **Blog posts** | `rgba(1,25,7, 0.82)` | `rgba(1,25,7, 0.75)` | `rgba(1,25,7, 0.65)` | Medium. Text readability priority. |
| **Guides** | `rgba(1,25,7, 0.78)` | `rgba(1,25,7, 0.7)` | `rgba(1,25,7, 0.6)` | Slightly lighter than blog. |
| **Static pages** | `rgba(1,25,7, 0.85)` | `rgba(1,25,7, 0.78)` | `rgba(1,25,7, 0.68)` | Darkest. About, results, how-we-work, lexxly. |

All overlays use `linear-gradient(to right, ...)` direction.

### Pre-Generation Checklist

Before generating ANY image, verify:

- [ ] Prompt includes a film stock reference
- [ ] Prompt includes "no people, no text, no logos"
- [ ] Prompt includes "documentary style" or "documentary photography"
- [ ] Prompt includes a grain or muted color descriptor
- [ ] Prompt does NOT include any forbidden keywords
- [ ] Correct dimensions specified (1200x630 for OG, 800x450 for cards)
- [ ] Using `gemini-2.0-flash-exp-image-generation` model (never change this)

### Post-Generation Checklist

After generating, verify:

- [ ] No people, faces, or readable text visible in the image
- [ ] Warm, muted color tones (not oversaturated)
- [ ] Visible film grain (authentic, not artificial)
- [ ] 1970s to 1990s documentary aesthetic
- [ ] No obvious AI artifacts
- [ ] Dark overlay provides sufficient text contrast when composited
- [ ] Title readable at small sizes (social preview thumbnails)
- [ ] White logo clearly visible in bottom-right on composited OG

### Logo Usage

| Variant | File | Background |
|---------|------|------------|
| White | `src/assets/images/logos/lexgro-wordmark-white.png` | Dark backgrounds and overlays |
| Dark | `src/assets/images/logos/lexgro-wordmark.png` | Light backgrounds only |

White logo: white text with green arrow (`#6B9B7A`).
Dark logo: dark gray text (`#4A4A4A`) with green arrow.

---

## 4. Page Component Patterns

### Dark Hero

Every page has a dark hero section with a background image and overlay gradient.

```css
.hero {
  position: relative;
  background: var(--color-bg-dark);  /* #011907 */
  overflow: hidden;
  /* min-height varies by page type */
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  /* gradient values per page type - see Section 3 */
}

.hero-content {
  position: relative;
  z-index: 2;
}
```

Hero padding: `4rem 1.5rem 3rem` (homepage reference).

### Light Sections

Alternating white and light gray sections.

```css
.section-light {
  background: #fafafa;  /* Use literal value, NOT var(--color-bg-light) */
}
```

### Section Badges

Slate-colored pill badges that label sections.

```css
.section-badge {
  display: inline-block;
  font-size: 0.6875rem;         /* 11px */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-slate);    /* #64748b */
  background: linear-gradient(135deg, rgba(100, 116, 139, 0.12) 0%, rgba(100, 116, 139, 0.06) 100%);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(100, 116, 139, 0.15);
}
```

### Section Dividers

Use between sections for visual separation. Standard approach is alternating `#fafafa` and `#ffffff` backgrounds.

### Cards

All cards use the same base pattern.

```css
.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

/* Green gradient top border (3px) */
.card-header,
.card-image {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%);
  height: 3px;  /* or use as top-border via border-image */
  border-radius: 16px 16px 0 0;
}
```

Critical values:
- `border-radius: 16px` (never approximate)
- `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04)` (never approximate)
- Green gradient top border: 3px, `#298C42` to `#1AA774`

### CTA Blocks

```css
.cta-section {
  background: linear-gradient(135deg, #0d3d1a 0%, #1a5c2e 100%);
}

.cta-section .muted-text {
  color: #b0b8b3;  /* WCAG AA on this gradient */
}
```

### Lead Text

```css
.lead {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: #4b5563;  /* On light backgrounds */
}
```

### Resource Dropdown Pages

These pages all share the same pattern: guide, blog, answers, podcast, cmo-podcast, tips-from-keith.

Required elements:
1. Dark hero with background image and overlay
2. `#fafafa` alternating sections
3. Slate section badges
4. Section dividers between sections
5. `#0d3d1a` to `#1a5c2e` CTA gradient

---

## 5. Structured Data (JSON-LD Schema)

Schema markup is not optional. Every page gets the right structured data. This is how MesoWatch and AEE Law get rich results.

### Site-Wide Schemas (Every Page)

These three schemas go on every page via `BaseLayout`:

1. **WebSite** - Name, URL, publisher reference, `inLanguage: "en-US"`
2. **Organization** - Full business info: name, logo, address, social links, contact points
3. **SiteNavigationElement** - Main nav items with names and URLs (helps Google build sitelinks)

### Page-Type Schemas

| Page Type | Schema Types | Notes |
|-----------|-------------|-------|
| **Homepage** | WebSite + Organization + SiteNavigation | All three site-wide schemas |
| **About** | AboutPage | `mainEntity` references the Organization |
| **Contact** | ContactPage | Includes `contactPoint` with phone, hours, languages |
| **Blog index** | Blog + CollectionPage | List of BlogPosting entries |
| **Blog post** | Article (or NewsArticle) | Author, dates, image, publisher, wordCount |
| **Practice area / Service** | Service | Provider references Organization, areaServed |
| **FAQ sections** | FAQPage | Array of Question/Answer pairs |
| **Team listing** | ItemList of Person | Each attorney with `@id`, `worksFor` |
| **Individual attorney** | Person | Education, awards, barAdmissions, worksFor |
| **Location / Borough** | LegalService (local) | `areaServed` for specific geography, `parentOrganization` |
| **Reviews** | LegalService + AggregateRating | Rating value, count, individual reviews |
| **Results / Case studies** | ItemList | Notable outcomes as ListItems |
| **Resource/Guide** | Article | Standard article schema with breadcrumbs |

### FAQPage Schema

Every page with FAQ content gets FAQPage schema. The schema is separate from the visual FAQ component.

```typescript
// Pattern from production (AEE Law)
function getFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
```

### BreadcrumbList Schema

Every page below the homepage gets breadcrumbs.

```typescript
function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

### Article Schema

Every blog post, guide, and content page gets Article schema.

Required fields:
- `headline` (title)
- `description`
- `datePublished` and `dateModified`
- `author` (Person with `@id`, name, url, jobTitle)
- `publisher` (Organization `@id` reference)
- `image` (ImageObject with url, width, height)
- `mainEntityOfPage` (WebPage `@id`)
- `inLanguage: "en-US"`
- `isAccessibleForFree: true`

### Organization Schema (LEXGRO)

Required fields:
- `@type`: Organization (or LegalService for law firm clients)
- `name`, `legalName`, `url`, `logo`
- `address` with PostalAddress
- `contactPoint` with phone, email, hours
- `sameAs` array of social profile URLs
- `foundingDate`
- `description`

### Implementation Pattern

Use a centralized schema utility (like `src/utils/schema.ts` on AEE Law) with typed functions:

```typescript
// Preferred: centralized schema generators
export function getOrganizationSchema() { ... }
export function getWebSiteSchema() { ... }
export function getFAQSchema(items: FAQItem[]) { ... }
export function getBreadcrumbSchema(items: BreadcrumbItem[]) { ... }
export function getArticleSchema(article: ArticleData) { ... }

// BaseLayout includes site-wide schemas on every page
export function getSiteWideSchemas() {
  return [getWebSiteSchema(), getOrganizationSchema(), getSiteNavigationSchema()];
}
```

Output as `<script type="application/ld+json">` in the `<head>`.

### Schema Checklist

- [ ] Every page has WebSite + Organization + SiteNavigation schemas
- [ ] Every content page has Article schema with author and dates
- [ ] Every page with FAQ content has FAQPage schema
- [ ] Every page below homepage has BreadcrumbList
- [ ] Contact page has ContactPage schema
- [ ] About page has AboutPage schema
- [ ] Review/testimonial pages have AggregateRating
- [ ] All `@id` references are consistent across pages
- [ ] All URLs are absolute (not relative)

---

## 6. FAQ Component Pattern

### Visual Component

FAQs use `<details>/<summary>` for native accordion behavior. No JavaScript required.

```tsx
// FAQ accordion (from MesoWatch production)
function Question({ q, children }) {
  return (
    <details className="faq-details">
      <summary className="faq-summary">
        <span className="faq-question-text">{q}</span>
        <span className="faq-arrow">▼</span>
      </summary>
      <div className="faq-answer-content">
        {children}
      </div>
    </details>
  );
}

function FAQ({ children }) {
  return <div className="faq-section">{children}</div>;
}
```

### Usage in Content

```mdx
<FAQ>
  <Question q="How much does a fractional CMO cost?">
    A fractional CMO typically costs $5,000 to $15,000 per month,
    compared to $200,000 or more for a full-time CMO salary.
  </Question>
  <Question q="How long does it take to see results?">
    Most firms see measurable improvements within 90 days.
    Full system buildout takes 6 to 12 months.
  </Question>
</FAQ>
```

### FAQ Schema Integration

The FAQ visual component and FAQPage schema must stay in sync. When adding FAQ content to a page:

1. Add the visual `<FAQ>` component in the body
2. Add `FAQPage` schema in the page's JSON-LD with the same questions and answers
3. Keep question text identical between visual and schema

---

## 7. References Component Pattern

### Format (APA Style)

References use APA format. On MesoWatch, this is implemented as a typed component.

```tsx
// Sources component (from MesoWatch production)
function Source({ title, org, url, date }) {
  return (
    <p className="source">
      {org && <>{org}. </>}
      {date && <>({date}). </>}
      <em>{title}</em>.
      {url && (
        <>
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </>
      )}
    </p>
  );
}

function Sources({ children }) {
  return (
    <section className="sources">
      <h4>References</h4>
      {children}
    </section>
  );
}
```

### Usage in Content

```mdx
<Sources>
  <Source
    title="2026 Legal Trends Report"
    org="Clio"
    url="https://www.clio.com/resources/legal-trends/"
    date="2026"
  />
  <Source
    title="State of the Legal Market"
    org="Thomson Reuters"
    url="https://www.thomsonreuters.com/..."
    date="2025"
  />
</Sources>
```

### Rendered Output

```
References

Clio. (2026). 2026 Legal Trends Report.
https://www.clio.com/resources/legal-trends/

Thomson Reuters. (2025). State of the Legal Market.
https://www.thomsonreuters.com/...
```

### Rules

- Organization name first
- Year in parentheses
- Title in italics
- Full URL on its own line
- No numbers, no bullets
- One blank line between entries
- Always link to the primary source, not secondary coverage

### Source Priority

1. **Primary:** Bar associations, ABA, state bar journals, CDC, NIH, court records
2. **Industry reports:** Clio Legal Trends, Thomson Reuters State of Legal Market
3. **Marketing data:** HubSpot, Google research studies
4. **Economic data:** Bureau of Labor Statistics, Census Bureau

---

## 8. Content Standards

### Absolute Rules (Never Break These)

1. **No em-dashes (---).** Use periods, commas, colons, or parentheses. Em-dashes sound machine-like.
2. **No horizontal rules (---) in body content.** No `<hr>` tags, no `---` markdown dividers inside articles. Use headings and white space to separate sections. HR rules look like template output, not editorial writing.
3. **No marketing jargon.** Never use "synergy," "leverage" (as verb), "holistic," "paradigm shift," "utilize."
4. **Use % symbol.** Write "25%" not "25 percent."
5. **Active voice.** Maximum 20% passive voice.
6. **Paragraphs under 5 lines.** White space keeps readers moving.
7. **Always cite sources.** Every statistic needs a link to the original source.
8. **Human tone.** Write like Keith talks. Direct, no fluff, actionable.
9. **No AI formatting patterns.** No bold-everything headers, no numbered-list-of-everything structure, no "Key Takeaways" boxes. Write like a journalist, not a prompt engineer.

### Punctuation

| Use | Instead of |
|-----|-----------|
| Period or comma | Em-dash (---) |
| Two sentences | Semicolons (;) |
| Nothing (end the sentence) | Ellipsis (...) |
| "and" | & |
| "with" | w/ |

### Numbers

- Spell out zero through nine, numerals for 10 and above.
- Exceptions: always use numerals for time, measurements, millions.
- Always comma for thousands: 1,000 not 1000.
- Always a digit before decimals: 0.456 not .456.
- Years: 1990s, the '90s (no apostrophe before the s).
- Money: $50,000 (numeral with symbol). Ranges: "$50,000 to $100,000."
- Percentages: 25% (numeral with symbol).
- Do not start a sentence with a numeral.

### Headers

- H1: Page title (one per page).
- H2: Major sections.
- H3: Subsections. Rarely go deeper.
- Title case (APA style) for all headings. Check with capitalizemytitle.com.
- Include keywords in subtitles.
- No AI header patterns: "Introduction:," "Conclusion:," "Overview:," "Key Takeaways:."

### Body Content: Editorial Style

Write like an editorial journalist, not a content mill. Every article should read like something you'd find in Harvard Business Review or Inc., not a template SEO page.

**Structure:**
- Open with a hook. A stat, a question, a provocative statement. Not "In today's competitive landscape..."
- Build a narrative arc. Don't just list facts. Connect them. Show cause and effect.
- Use subheadings (H2/H3) to guide the reader, not to stuff keywords.
- End sections with forward momentum. The reader should want to keep going.

**What NOT to do in body content:**
- No `---` horizontal rules between sections. Use headings and white space.
- No "Key Takeaways" or "Summary" boxes. The content should be the takeaway.
- No bold-everything formatting. Bold is for emphasis, not decoration.
- No walls of bullet points. If a section is all bullets, rewrite it as prose.
- No template structures that scream AI: intro paragraph, 5 H2 sections, conclusion. Vary the structure.
- No "In this article, we will cover..." opening. Just start.
- No "Conclusion" or "Final Thoughts" headers. End with a strong final paragraph.

**What TO do:**
- Start with the reader, not us. "Your firm deserves marketing that works." Not "LEXGRO provides..."
- Mix sentence lengths for rhythm. Short sentences hit harder.
- Use real examples with real numbers. "$47,000 per case" not "significant ROI."
- Cite inline with linked anchor text. Don't save all sources for the bottom.
- Use the `<Sources>` component at the bottom AND inline links throughout.
- Let the content breathe. White space between paragraphs. Short sections.

### Voice and Structure

- Do not begin two paragraphs in a row with the same word.
- Do not start or end a section on a bulleted list. One full line of text minimum before and after.

### Lists

- Bold the term before a colon: **Fractional CMO:** Part-time executive marketing leadership.
- Do not repeat the bolded term after the colon.
- Keep items parallel in structure.
- Numbered lists only for sequential, ranked, or timeline items.

### Linking and References

Link every statistic, study, or research claim to its original source.

**Anchor text:** Use keyword-rich phrases, not single words.

**Good:** "More data based on [studies done on law firm marketing ROI](http://example.com/) is available."

**Bad:** "Available from the [Legal Marketing Association](http://example.com/)."

#### References Section

Every content page with cited sources must include a References section at the bottom using APA format:

```
## References

Author/Organization. (Year). [Article title](https://url).

Author/Organization. (Year). [Article title](https://url).
```

**Format rules:**
- APA style: Author or organization name, year in parentheses, linked title
- No numbers or bullets
- One blank line between each reference
- No descriptions after the link
- Link back to the original study, not secondary sources

**Source priority:**
1. Primary sources: Bar associations, ABA, state bar journals
2. Industry reports: Clio Legal Trends Report, Thomson Reuters State of the Legal Market
3. Marketing data: HubSpot, Google research studies
4. Economic data: Bureau of Labor Statistics, Census Bureau

### Words and Phrases to Avoid

#### Jargon

| Avoid | Use instead |
|-------|-------------|
| utilize | use |
| leverage (verb) | use, apply, build on |
| synergy | combine, integrate |
| holistic | complete, whole |
| robust | strong, solid |
| seamless | smooth, easy |
| cutting-edge | modern, advanced |
| streamline | simplify |
| optimal | best |
| empower | help, enable |
| facilitate | help, enable |
| delve | explore, examine |
| comprehensive | complete, thorough |
| pivotal | key, important |
| foster | build, develop |
| underscore | highlight, emphasize |
| landscape | market, industry |
| actionable | practical, useful |
| bandwidth | capacity, time |
| plethora | many, plenty |
| myriad | many |
| endeavor | try, work |
| paradigm | approach, model |

#### Fluff Words

| Avoid | Do instead |
|-------|-----------|
| really | Be specific: "$2.3M" not "really expensive" |
| very | Be specific or remove |
| a lot | Quantify: "3,000 firms" not "a lot of firms" |
| stuff, things | Name the actual items |
| in order to | to |
| whether or not | whether |
| in addition to this | in addition |
| believe, think | Provide factual statements with sources |
| always, never | rarely, often, typically, seldom |

#### AI Phrase Patterns

These phrases flag content as machine-generated. Never use them.

- "Let me explain..."
- "Here's what you need to know..."
- "Think of it as..."
- "In this article, we will..."
- "To understand X, we must first..."
- "Without further ado..."
- "It goes without saying..."
- "At the end of the day..."
- "Moving forward..."
- "In today's world..."
- "Now more than ever..."
- "It's important to note..."
- "When it comes to..."
- "We need to understand..."
- "You might be wondering..."

#### AI Header Patterns

Do not use these headers:

- "## Introduction:" or "## Introduction"
- "## Conclusion:" or "## Conclusion"
- "## Overview:"
- "## Final Thought:" or "## Final Takeaway:"
- "## Key Takeaways:"

Use descriptive headers that add value: "## The Problem with Traditional Marketing," "## Where to Start."

#### Law Firm Cliches

- "entitled to compensation"
- "call now for a free consultation"
- "don't wait another day"
- "time is running out"
- "you deserve justice"

### CTA Copy

- Use direct second person: "Get Your Free Growth Audit"
- Be specific about what they get.
- Remove friction words: "Submit," "Request."

**Good:** "Get Your Free Growth Audit," "Schedule a Strategy Call," "See the Results"
**Bad:** "Submit," "Learn More," "Contact Us"

### Meta Tags

- **Meta title:** 50 to 60 characters.
- **Meta description:** 150 to 160 characters maximum.
- Check with seomofo.com/snippet-optimizer.html.

### Readability

- Target Flesch reading score: 50 to 60.
- Oxford comma: always.
- Person-first language: "law firms that struggle with marketing" not "struggling law firms."
- US not U.S. when referring to the United States.

### Legal Marketing Terms

Use consistently:

- **Cost per case** (not cost per acquisition or CPA)
- **Case acquisition** (not lead generation, when referring to signed clients)
- **Intake** (qualifying and signing clients)
- **Managing partner** (not "owner" unless quoting)
- **Practice area** (not "legal vertical" or "specialty")

### Spelling Preferences

- healthcare (one word)
- ecommerce (one word)
- email (one word)
- website (one word)
- online (one word)
- co-pay (hyphenated)
- co-insurance (hyphenated)

### Hyphenation

Common hyphenated terms: cost-per-case, full-service, data-driven, results-oriented, client-focused, high-value, long-term, short-term.

### Auto-Fixed Issues

The `npm run fix:style` script handles these automatically:

- `percent` to `%`
- Em-dashes to periods
- `&` to "and"
- `w/` to "with"
- `U.S.` to "US"
- `1990's` to `1990s`
- `.5` to `0.5`
- `in order to` to "to"
- `whether or not` to "whether"
- `utilize` to "use"
- `move the needle` to "produce results"
- `leverage your/the` to "use your/the"
- LLM header patterns (Introduction:, Overview:)
- LLM marker patterns (From Keith's Perspective:, Real Results Example:)
- LLM filler phrases (Let me explain., Here's what you need to know)

---

## 9. Accessibility Requirements

### Minimum Standard

**WCAG 2.1 AA** compliance is the minimum for all pages.

### Color Contrast

| Context | Text color | Background | Ratio | Pass |
|---------|-----------|------------|-------|------|
| Body text on white | `#212121` | `#ffffff` | 16.1:1 | AAA |
| Body text on light section | `#212121` | `#fafafa` | 15.7:1 | AAA |
| Muted text on light bg | `#4b5563` | `#fafafa` | 7.4:1 | AAA |
| Muted text on white | `#4b5563` | `#ffffff` | 7.5:1 | AAA |
| Muted text on dark bg | `#b0b8b3` | `#011907` | 4.8:1 | AA |
| CTA muted text | `#b0b8b3` | `#0d3d1a` | 4.7:1 | AA |
| White on dark bg | `#ffffff` | `#011907` | 17.8:1 | AAA |
| White on CTA gradient | `#ffffff` | `#0d3d1a` | 14.6:1 | AAA |

**Never use `#779B80` (sage muted) for text that must be readable.** It fails WCAG on most backgrounds. Use it only for decorative elements.

### Typography

- Minimum body font size: 16px (1rem).
- Minimum line height for body text: 1.45.
- Minimum line height for headings: 1.2.
- Maximum line width for prose: 800px (narrowWidth token).

### Touch Targets

- Minimum touch target: 44px x 44px.
- Minimum spacing between interactive elements: 8px.
- Mobile CTAs must be in thumb-zone reach.

### Images

- All images must have alt text (decorative images use `alt=""`).
- Hero background images are decorative (`alt=""`).
- OG images and card images do not need alt text (meta only, not displayed inline).

### Motion

- Respect `prefers-reduced-motion` for all animations and transitions.
- No auto-playing video.
- No flashing content.

### Keyboard Navigation

- All interactive elements must be focusable.
- Visible focus indicators on all interactive elements.
- Logical tab order.

---

## 10. Tool Stack

See `docs/TOOLS-WORKFLOW.md` for complete tool documentation, API keys, and usage examples.

**Role separation is critical:**

| Tool | Purpose | When to use |
|------|---------|-------------|
| **Claude** | Reasoning, writing, code, analysis | Strategy, content creation, code changes |
| **Perplexity** | Research with live web citations | Stats, facts, sourced data. Never use Claude for current stats. |
| **Firecrawl** | Web scraping and crawling | Competitor sites, directories |
| **Gemini** | Image generation | OG images, blog cards, hero backgrounds |
| **DataForSEO** | SEO data | Keywords, SERP analysis |

**Gemini model:** `gemini-2.0-flash-exp-image-generation`. Never change this model. If quota is exceeded, wait for reset.

**Firecrawl API:** `fc.scrape(url, opts)` not `fc.scrapeUrl()`. Import as `import Firecrawl from '@mendable/firecrawl-js'`.

---

## 11. Quick Reference Checklists

### Before Generating Any Image

- [ ] Prompt includes film stock reference (Portra 400, Gold 200, Pro 400H, or Ektar)
- [ ] Prompt includes "no people, no text, no logos"
- [ ] Prompt includes "documentary style"
- [ ] Prompt includes grain or muted color descriptor
- [ ] No forbidden keywords (stock photo, modern, sleek, bright, vivid, digital, person words)
- [ ] Correct dimensions (1200x630 OG, 800x450 card)
- [ ] Using gemini-2.0-flash-exp-image-generation model

### Before Publishing Content

- [ ] No em-dashes
- [ ] No jargon (utilize, leverage, synergy, holistic, robust, seamless)
- [ ] Active voice dominant (under 20% passive)
- [ ] Paragraphs under 5 lines
- [ ] Headers include keywords and use title case (APA)
- [ ] All statistics have source links
- [ ] References section at bottom (APA format)
- [ ] Meta title under 60 characters
- [ ] Meta description under 160 characters
- [ ] Flesch score 50 to 60
- [ ] Oxford commas used
- [ ] % symbol used (not "percent")
- [ ] `lastModified` frontmatter updated to today's date
- [ ] `npm run audit` passes
- [ ] No AI phrase patterns or header patterns

### Before Pushing Visual Changes

- [ ] Audit ALL pages affected, not just the one being changed
- [ ] Cards use `border-radius: 16px` and `box-shadow: 0 4px 24px rgba(0,0,0,0.04)`
- [ ] Light sections use `background: #fafafa` (literal, not CSS variable)
- [ ] Section badges use slate gradient and `letter-spacing: 0.2em`
- [ ] CTA sections use `linear-gradient(135deg, #0d3d1a 0%, #1a5c2e 100%)`
- [ ] Dark bg muted text is `#b0b8b3`
- [ ] Light bg muted text is `#4b5563`
- [ ] Hero overlay uses correct gradient for page type (see Section 3)
- [ ] Green gradient top border on cards is 3px
- [ ] All resource dropdown pages follow shared pattern

---

## Source Documents

This document consolidates and supersedes the following:

| Document | Status |
|----------|--------|
| `docs/OG-IMAGE-STYLE-GUIDE.md` | Superseded by Section 3. Keep as detailed reference. |
| `docs/STYLE_GUIDE.md` | Superseded by Section 8. Keep as detailed reference. |
| `docs/COPYWRITING-GUIDE.md` | Superseded by Sections 1 and 8. Keep as detailed reference. |
| `docs/KEITH-SYSTEM-GUIDE.md` | Sales-focused. Not superseded (different audience). |
| `src/lib/theme/tokens.ts` | Code source of truth for token values. Section 2 mirrors it. |
| `docs/TOOLS-WORKFLOW.md` | Referenced from Section 10. Not superseded. |

When values conflict between this document and the source docs listed above, **this document is correct.**
