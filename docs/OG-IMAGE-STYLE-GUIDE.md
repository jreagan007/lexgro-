# LEXGRO OG Image Style Guide

## Visual Identity

### Photography Style
- **Aesthetic**: 35mm documentary film photography
- **Era**: 1970s-1990s corporate/editorial
- **Film stocks**: Kodak Portra 400, Kodak Gold 200, Kodak Ektar, Fuji Pro 400H
- **Characteristics**: Natural grain, warm muted tones, imperfect authenticity

### Subject Matter
- Executive boardrooms, corner offices, professional workspaces
- Natural light through windows (golden hour preferred)
- Empty spaces suggesting recent activity (coffee cup left behind, chair pushed back)
- Architectural elements (glass, wood, plants)
- No people, no faces, no readable text

### Composition
- Upward perspectives for ambition/growth
- Leading lines toward light sources
- Depth through foreground elements
- Safe areas for text overlay (left side clear)

---

## Technical Specifications

### Dimensions
- **OG Images**: 1200 x 630px (1.9:1 ratio)
- **Card Images**: 800 x 450px (16:9 ratio)

### Layer Structure
1. **Base Image**: AI-generated film photography via Gemini
2. **Dark Overlay**: Diagonal gradient (90% opacity bottom-left to 30% top-right)
3. **Accent Bar**: 6px green bar on left edge (#298C42)
4. **Text Overlay**: Category, title, branding
5. **Logo**: White LEXGRO wordmark (bottom-right)

### Safe Areas
- 80px padding on all sides for OG images
- 48px padding for card images
- Text positioned in left 60% of image
- Logo positioned in bottom-right corner

---

## Typography

### Fonts
- **Display**: Be Vietnam Pro (headings)
- **Body**: DM Sans (category labels, branding)

### Text Hierarchy
1. **Accent Line**: 50px wide, 4px tall, mint green (#25B97B)
2. **Category**: 13px, 700 weight, 0.3em letter-spacing, uppercase, mint
3. **Title**: 56px (OG) / 42px (cards), 800 weight, -0.02em tracking, white
4. **Branding**: 14px, 600 weight, 0.12em tracking, uppercase, white 50% opacity

---

## Color Palette

### Brand Colors (RGB)
```
darkBg:      #011907  rgb(1, 25, 7)
darkAlt:     #233B29  rgb(35, 59, 41)
primary:     #298C42  rgb(41, 140, 66)
primaryDark: #1F8238  rgb(31, 130, 56)
teal:        #1AA774  rgb(26, 167, 116)
mint:        #25B97B  rgb(37, 185, 123)
accent:      #FF8158  rgb(255, 129, 88)
purple:      #673AE4  rgb(103, 58, 228)
white:       #FFFFFF  rgb(255, 255, 255)
```

### Overlay Gradient
- Start: darkBg at 90% opacity (bottom-left)
- Mid: darkBg at 60% opacity (center)
- End: darkAlt at 30% opacity (top-right)

---

## Prompt Structure

### Base Prompt Template
```
[Subject/setting], [lighting conditions], [atmospheric details],
[era reference] documentary style, shot on [film stock],
[grain/color characteristics], no people, no text, no logos,
[mood/atmosphere description]
```

### Example Prompts by Page Type

**Homepage/About**:
```
Empty executive boardroom at dawn, floor-to-ceiling windows
overlooking city skyline, leather chairs pushed back from long table,
coffee cup left behind, golden hour light casting long shadows,
1990s corporate documentary style, shot on Kodak Portra 400,
slight grain, warm muted professional tones, no people, no text,
no logos, authentic ambitious atmosphere
```

**Blog/Content**:
```
Morning coffee steam rising beside leather journal, pen uncapped,
natural window light, green plant leaf in soft focus, creative
workspace atmosphere, 1990s journaling documentary style, 35mm
film grain, Portra 400 warm colors, no readable text, no people,
authentic content creation space
```

**Services**:
```
Corner office at dusk, city lights beginning to glow through window,
empty leather chair at mahogany desk, briefcase beside, strategic
leadership atmosphere, 1990s corporate photography style, Kodak
Portra 400 warm colors with cool exterior, no people, no text,
no computer screens, authentic C-suite executive environment
```

---

## Logo Usage

### White Logo
- File: `src/assets/images/logos/lexgro-wordmark-white.png`
- White text with green arrow (#6B9B7A)
- Used on dark backgrounds/overlays
- Size: 160px wide (OG) / 100px wide (cards)
- Position: Bottom-right, 80px from edges

### Dark Logo
- File: `src/assets/images/logos/lexgro-wordmark.png`
- Dark gray text (#4A4A4A) with green arrow
- Used on light backgrounds only

---

## Generation Commands

```bash
# Generate all OG images with AI
npx tsx scripts/generate-all-og.ts --force

# Generate only content (blog, guides, answers)
npx tsx scripts/generate-all-og.ts --content --force

# Generate homepage only with AI
npx tsx scripts/generate-homepage-og.ts --force --base

# Clear AI cache and regenerate
rm -rf .cache/og-bases && npx tsx scripts/generate-all-og.ts --force
```

---

## Quality Checklist

- [ ] AI-generated film photography background (not gradient)
- [ ] Warm, muted color tones (not oversaturated)
- [ ] Visible film grain (authentic, not artificial)
- [ ] Dark overlay provides text contrast
- [ ] White logo clearly visible in bottom-right
- [ ] Title readable at small sizes (social previews)
- [ ] No people, faces, or readable text in image
- [ ] 1970s-1990s documentary aesthetic
