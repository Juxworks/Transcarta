# Transcarta Website Redesign — Design Spec

**Date:** 2026-04-25
**Project:** Transcarta (transcarta.com)
**Stack:** Next.js · TypeScript · Tailwind CSS
**Deployment:** Vercel

---

## 1. Project Context

Transcarta is a Singapore-based sustainability consulting firm (est. 2002) operating across Asia Pacific and North America. The site redesign replaces a minimal GoDaddy-hosted site with a professional Next.js site that puts the climate mission front and centre, serves potential clients, and surfaces content (publications, board affiliations) currently buried or absent.

**Primary audience:** Potential clients wanting to hire Transcarta for writing, consulting, or training.
**Tone:** Mission-driven, purposeful, impact-focused. Team behind the work — not individual-focused.

---

## 2. Design System

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--green` | `#059669` | Primary · hero CTA · hover states |
| `--green-dark` | `#065F46` | Headings · nav text · footer background |
| `--green-mint` | `#ECFDF5` | Section backgrounds · chips |
| `--green-light` | `#6ee7b7` | Hero stat numbers · hero em highlights |
| `--blue` | `#1d4ed8` | **Brand highlight** — section labels · service icons · links · borders · nav underline · pub outlet dots · footer bar |
| `--blue-mid` | `#3b82f6` | Hover states for blue elements |
| `--blue-tint` | `#eff6ff` | Service icon backgrounds · blue chips |
| `--ink` | `#111827` | Body text |
| `--muted` | `#6b7280` | Secondary text · metadata |
| `--border` | `#e5e7eb` | Card borders · dividers |

**Rationale:** Green (nature, sustainability) is the primary brand colour. Blue (#1d4ed8) is extracted directly from the Transcarta logo mark and used as a highlight accent throughout — section labels, icons, links, and structural borders — mirroring the dual-colour logo.

### Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Heading | Poppins | 600–700 | H1–H3, card titles, nav brand |
| Body | Open Sans | 400–600 | Paragraphs, nav links, metadata |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
```

**Type scale:** `clamp(32px, 4.2vw, 54px)` for H1 · `clamp(24px, 3vw, 36px)` for H2 · 18px H3 · 15–16px body · 11–12px labels/metadata.

### Spacing & Layout

- Max content width: `1160px`, centered with `56px` horizontal padding (mobile: `24px`)
- Section vertical padding: `80px` top/bottom
- 8px base spacing unit (Tailwind `gap-2` = 8px)
- Breakpoints: `375px` · `768px` · `1024px` · `1440px`

### Component Tokens

```css
--radius-sm: 6px;   /* buttons, tags */
--radius-md: 10px;  /* cards, placeholders */
--radius-lg: 12px;  /* hero image, large panels */
--shadow-card: 0 4px 24px rgba(0,0,0,0.07);
--shadow-hover: 0 6px 20px rgba(0,0,0,0.08);
--transition: 200ms ease;
```

---

## 3. Brand Assets

| Asset | Path | Usage |
|---|---|---|
| Full logo (colour) | `Brand_Assets/Logo_TC.png` | Nav bar, footer (inverted white) |
| Hero background | `Brand_Assets/rs=w_800,cg_true.webp` | Homepage hero full-bleed |

**Image placeholder convention:** All future images use `bg-green-50 border-2 border-dashed border-emerald-300` with centred SVG camera icon, label, and recommended dimensions.

---

## 4. Page Structure (6 pages)

### 4.1 Home (`/`)

| # | Section | Content |
|---|---|---|
| 1 | **Nav** | Logo (colour) · Home · Services · About · Publications · Insights · Contact · "Work With Us" CTA button |
| 2 | **Hero** | Forest background image · lighter green gradient overlay · eyebrow (Est. 2002 · Singapore · Asia Pacific & North America) · H1 tagline · mission sub · two CTAs (green "Work With Us", blue-tinted "Our Services") · stats strip (20+ years · 4 services · 2 continents) |
| 3 | **Services strip** | Blue top border · 4 service cards with blue icons on blue-tint bg · "Learn more →" blue links |
| 4 | **Mission** | Two-column: left = blue-bar quote + mission copy + green/blue alternating chips; right = image placeholder (680×480px, team/office photo) |
| 5 | **Publications preview** | 3 cards (Impact Entrepreneur · The Asian Banker · Today) each with image placeholder (760×440px) · blue outlet label with dot |
| 6 | **Board affiliations** | Mint background · 3 cards with blue left border · logo placeholder (partner logos TBD) |
| 7 | **Contact CTA band** | Forest green background · H2 + body · green "Get In Touch" + blue-outline "View Services" |
| 8 | **Footer** | Blue top bar · logo (white) · nav links · copyright |

### 4.2 Services (`/services`)

| # | Section | Content |
|---|---|---|
| 1 | Page hero | Mint background · "Our Services" heading · tagline |
| 2–5 | Service detail blocks | Alternating layout (text left/right with image placeholder) for each: Freelance Writing · Investment Support · Sustainability Training · Board Service |
| 6 | Enquire CTA | Links to Contact page |

Each service block includes: icon · name · detailed description from current site · bullet list of specifics · image placeholder (700×480px).

### 4.3 About (`/about`) — *New*

| # | Section | Content |
|---|---|---|
| 1 | Page hero | "About Transcarta" · Est. 2002 |
| 2 | Our Story | Origin, Asia focus, mission evolution · image placeholder |
| 3 | Mission & Vision | Full vision ("A better world…") and mission ("Make the world a better and more sustainable place") |
| 4 | The Team | Team intro — collective expertise, not individual-focused · team photo placeholder |
| 5 | Partnerships | Board roles: Stanford Alumni in Sustainability · Solar Washington · Digital Mission Ventures · partner logo placeholders |

### 4.4 Publications (`/publications`) — *New*

| # | Section | Content |
|---|---|---|
| 1 | Page hero | "Publications" heading · writing scope description |
| 2 | Featured articles | Full-width featured article card with large image placeholder |
| 3 | Article grid | Filterable grid by outlet (Impact Entrepreneur · Asian Banker · Today · Other) — each card has image placeholder (760×440px) |
| 4 | Writing CTA | "Need writing for your organisation?" → Contact |

Article card structure: image placeholder · outlet label (blue) · title · date + topic tag · "Read article →" link.

### 4.5 Insights (`/insights`) — *New*

| # | Section | Content |
|---|---|---|
| 1 | Page hero | "Insights" heading · topics: Climate · Finance · Training · Policy |
| 2 | Featured post | Full-width card with large image placeholder |
| 3 | Article grid | Cards with image placeholders · topic filter bar (Climate · Finance · Training · Policy) |

### 4.6 Contact (`/contact`)

| # | Section | Content |
|---|---|---|
| 1 | Page hero | "Work With Us" heading |
| 2 | Contact form | Name · Email · Service interest (dropdown: Writing / Investment / Training / Board / Other) · Message · Submit |
| 3 | Details | 475 River Valley Road, Tanglin, Singapore 248360 · +65 6323 5188 · LinkedIn link |
| 4 | Region note | Asia Pacific & North America coverage |

---

## 5. Navigation

- **Desktop:** Sticky white nav, `height: 72px`, `border-bottom: 2px solid #1d4ed8`, blur backdrop. Logo left, links centre, CTA button right.
- **Mobile:** Hamburger menu, full-screen drawer with same links.
- **Active state:** Current page link has `color: #1d4ed8` + `font-weight: 600`.
- **CTA button:** Always `background: #059669`, "Work With Us", links to `/contact`.

---

## 6. Hero Design

- **Background:** `Brand_Assets/rs=w_800,cg_true.webp` (misty tropical rainforest), `object-cover`, `object-position: center 30%`
- **Overlay:** `linear-gradient(120deg, rgba(4,80,45,0.68) 0%, rgba(5,150,105,0.42) 55%, rgba(5,150,105,0.18) 100%)`  — lighter at right so forest breathes through
- **Text shadow:** `0 2px 16px rgba(0,0,0,0.18)` on H1 for readability
- **Stats strip:** Separated by `border-top: 1px solid rgba(255,255,255,0.2)`, stat numbers in `#6ee7b7`

---

## 7. Image Placeholder System

Every image slot in the codebase uses a consistent placeholder component until real assets arrive:

```tsx
// components/ImagePlaceholder.tsx
// Props: label, dimensions (e.g. "760 × 440px"), className
// Renders: mint bg + dashed emerald border + camera SVG + label + size hint
```

Placeholder dimensions by context:
- Hero: full viewport (no placeholder — real image used)
- Mission / About / Service detail: `680 × 480px`
- Article card thumbnail: `760 × 440px`
- Featured article: `1160 × 520px`
- Partner logo: `200 × 80px`
- Team photo: `560 × 400px`

---

## 8. UI/UX Rules (from ui-ux-pro-max)

Applied rules from the installed skill:

- **Accessibility:** All interactive elements have visible focus rings · WCAG AA contrast (4.5:1 minimum) · alt text on all images
- **Touch targets:** Min 44×44px for all buttons and links
- **Hover transitions:** `200ms ease` on all interactive elements — no instant state changes
- **No emoji icons:** All icons are SVG (Heroicons / Lucide)
- **cursor-pointer** on all clickable elements
- **Mobile-first:** Responsive at 375, 768, 1024, 1440px · no horizontal scroll · `min-h-dvh` for hero
- **Performance:** `font-display: swap` · lazy-load below-fold images · `next/image` for all images
- **Forms:** Visible labels on all inputs · error messages below field · loading + success states on submit
- **Reduced motion:** Respect `prefers-reduced-motion` on any animations

---

## 9. Content Rules

- All copy comes from transcarta.com — no invented text
- Tagline: "Writing, coaching, training & board service for climate."
- Vision: "A better world with a more sustainable environment and people optimising their potential."
- Mission: "Make the world a better and more sustainable place"
- Contact: 475 River Valley Road, Tanglin, Singapore 248360 · +65 6323 5188
- **No individual focus:** The About page and team sections describe collective expertise — Richard Hartung is not named or spotlighted
- Article titles and publication URLs: placeholders until provided by client

---

## 10. Pre-Delivery Checklist

- [ ] Logo (`Logo_TC.png`) used in nav (colour) and footer (white-inverted)
- [ ] Hero forest image renders with correct overlay gradient
- [ ] All image placeholders use `ImagePlaceholder` component with correct dimensions
- [ ] Blue (#1d4ed8) applied consistently: nav border, section labels, icons, links, pub dots, affiliation borders, footer bar
- [ ] Green (#059669) applied consistently: primary CTAs, hero, services background
- [ ] No emoji icons — Heroicons/Lucide SVG only
- [ ] Responsive tested at 375, 768, 1024, 1440px
- [ ] Contact form validates and shows success/error state
- [ ] WCAG AA contrast verified on all text
- [ ] `prefers-reduced-motion` respected
