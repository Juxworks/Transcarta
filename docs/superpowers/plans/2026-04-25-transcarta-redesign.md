# Transcarta Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Transcarta 6-page Next.js website (Home, Services, About, Publications, Insights, Contact) per the approved design spec — Nature Green + Brand Blue design system, real brand assets, image placeholders throughout.

**Architecture:** Next.js 15 App Router with a shared root layout (Nav + Footer). Page sections are isolated React components under `components/`. Static content (copy, service details, publication stubs) lives in `lib/data.ts`. No CMS — article data is stubbed with placeholders until real content is provided by client.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS 3 · Lucide React · Vitest + React Testing Library

**Design Spec:** `docs/superpowers/specs/2026-04-25-transcarta-redesign-design.md`

---

## File Map

```
/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, Nav, Footer, metadata
│   ├── globals.css                 # CSS variables, base resets
│   ├── page.tsx                    # Home page
│   ├── services/page.tsx           # Services page
│   ├── about/page.tsx              # About page
│   ├── publications/page.tsx       # Publications page
│   ├── insights/page.tsx           # Insights page
│   ├── contact/page.tsx            # Contact page
│   └── actions/contact.ts          # Server Action: contact form submission
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                 # Sticky nav: logo, links, CTA, mobile drawer
│   │   ├── MobileMenu.tsx          # Hamburger drawer (client component)
│   │   └── Footer.tsx              # Footer: white logo, links, copyright
│   ├── ui/
│   │   ├── ImagePlaceholder.tsx    # Dashed-border image slot with label + dimensions
│   │   ├── SectionLabel.tsx        # Blue uppercase label with leading dash
│   │   ├── Button.tsx              # Primary (green) + outline-blue variants
│   │   └── Chip.tsx                # Green/blue alternating topic chips
│   ├── home/
│   │   ├── Hero.tsx                # Full-bleed hero: forest image, overlay, stats
│   │   ├── ServicesStrip.tsx       # 4-column service cards with blue icons
│   │   ├── Mission.tsx             # Two-column: quote + chips | image placeholder
│   │   ├── PublicationsPreview.tsx # 3 publication card grid
│   │   ├── Affiliations.tsx        # Board affiliation cards on mint background
│   │   └── ContactCTA.tsx          # Forest-green CTA band
│   ├── shared/
│   │   ├── PublicationCard.tsx     # Article card: image placeholder, outlet, title
│   │   ├── ServiceBlock.tsx        # Alternating service detail block (Services page)
│   │   └── PageHero.tsx            # Reusable inner-page hero (mint bg, heading)
│   └── contact/
│       └── ContactForm.tsx         # Form with validation + Server Action (client)
├── lib/
│   └── data.ts                     # All static content: services, publications, affiliations
├── public/
│   ├── logo.png                    # Copied from Brand_Assets/Logo_TC.png
│   └── hero-forest.webp            # Copied from Brand_Assets/rs=w_800,cg_true.webp
├── tailwind.config.ts              # Brand colours + font families
├── vitest.config.ts                # Vitest + jsdom + React
├── vitest.setup.ts                 # @testing-library/jest-dom
└── __tests__/                      # Mirrors components/ structure
```

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`

- [ ] **Step 1.1: Run create-next-app**

```bash
cd "/Users/justinxiao/Library/CloudStorage/GoogleDrive-juxworks@gmail.com/My Drive/1.Ideas/1.Claude/Transcarta"
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

When asked about existing files (CLAUDE.md, Brand_Assets/, .claude/): choose **No** to overwrite.

Expected: `next`, `react`, `react-dom`, `typescript` installed. Directories `app/` and `public/` created.

- [ ] **Step 1.2: Install additional dependencies**

```bash
npm install lucide-react
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event @types/node
```

- [ ] **Step 1.3: Create vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.4: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 1.5: Verify scaffold**

```bash
npm run dev
```

Expected: Next.js dev server starts at `http://localhost:3000`. Default Next.js page visible. Ctrl+C to stop.

- [ ] **Step 1.6: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 project with Tailwind and Vitest"
```

---

## Task 2: Tailwind config + global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 2.1: Write failing test for CSS variables**

Create `__tests__/globals.test.ts`:
```ts
import { describe, it, expect } from 'vitest'

describe('brand tokens', () => {
  it('defines green-primary as #059669', () => {
    // Tailwind config exports the correct colour token
    const config = require('../tailwind.config').default
    expect(config.theme.extend.colors['green-primary']).toBe('#059669')
  })

  it('defines blue-brand as #1d4ed8', () => {
    const config = require('../tailwind.config').default
    expect(config.theme.extend.colors['blue-brand']).toBe('#1d4ed8')
  })
})
```

- [ ] **Step 2.2: Run test — confirm fail**

```bash
npm run test:run -- __tests__/globals.test.ts
```

Expected: FAIL — `config.theme.extend.colors['green-primary']` is undefined.

- [ ] **Step 2.3: Update tailwind.config.ts**

Replace the entire file:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#059669',
        'green-dark':    '#065F46',
        'green-mint':    '#ECFDF5',
        'green-light':   '#6ee7b7',
        'blue-brand':    '#1d4ed8',
        'blue-mid':      '#3b82f6',
        'blue-tint':     '#eff6ff',
        ink:             '#111827',
        muted:           '#6b7280',
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'sans-serif'],
        body:    ['var(--font-open-sans)', 'sans-serif'],
      },
      maxWidth: {
        content: '1160px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2.4: Update app/globals.css**

Replace contents:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --green:       #059669;
  --green-dark:  #065F46;
  --green-mint:  #ECFDF5;
  --green-light: #6ee7b7;
  --blue:        #1d4ed8;
  --blue-mid:    #3b82f6;
  --blue-tint:   #eff6ff;
  --ink:         #111827;
  --muted:       #6b7280;
  --border:      #e5e7eb;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.07);
  --shadow-hover: 0 6px 20px rgba(0,0,0,0.08);
  --transition:  200ms ease;
}

* { box-sizing: border-box; }

body {
  font-family: var(--font-open-sans), system-ui, sans-serif;
  color: var(--ink);
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
}

a { cursor: pointer; }

button { cursor: pointer; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2.5: Run test — confirm pass**

```bash
npm run test:run -- __tests__/globals.test.ts
```

Expected: PASS (2 tests).

- [ ] **Step 2.6: Commit**

```bash
git add tailwind.config.ts app/globals.css __tests__/globals.test.ts vitest.config.ts vitest.setup.ts
git commit -m "feat: configure Tailwind with brand colour tokens and CSS variables"
```

---

## Task 3: Brand assets + static content

**Files:**
- Create: `public/logo.png`, `public/hero-forest.webp`
- Create: `lib/data.ts`

- [ ] **Step 3.1: Copy brand assets to public/**

```bash
cp "Brand_Assets/Logo_TC.png" "public/logo.png"
cp "Brand_Assets/rs=w_800,cg_true.webp" "public/hero-forest.webp"
```

Verify:
```bash
ls -lh public/logo.png public/hero-forest.webp
```

Expected: both files present, hero-forest.webp around 200–800KB.

- [ ] **Step 3.2: Write failing test for data**

Create `__tests__/lib/data.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { services, publications, affiliations, siteConfig } from '@/lib/data'

describe('services data', () => {
  it('has exactly 4 services', () => {
    expect(services).toHaveLength(4)
  })
  it('each service has id, name, description, bullets, and icon', () => {
    services.forEach(s => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('description')
      expect(s).toHaveProperty('bullets')
      expect(s).toHaveProperty('icon')
    })
  })
})

describe('publications data', () => {
  it('has at least 3 publications', () => {
    expect(publications.length).toBeGreaterThanOrEqual(3)
  })
  it('each publication has outlet, title, topic, and href', () => {
    publications.forEach(p => {
      expect(p).toHaveProperty('outlet')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('topic')
      expect(p).toHaveProperty('href')
    })
  })
})

describe('siteConfig', () => {
  it('has tagline, vision, mission, address, phone', () => {
    expect(siteConfig.tagline).toBeTruthy()
    expect(siteConfig.vision).toBeTruthy()
    expect(siteConfig.mission).toBeTruthy()
    expect(siteConfig.address).toBeTruthy()
    expect(siteConfig.phone).toBeTruthy()
  })
})
```

- [ ] **Step 3.3: Run test — confirm fail**

```bash
npm run test:run -- __tests__/lib/data.test.ts
```

Expected: FAIL — `@/lib/data` not found.

- [ ] **Step 3.4: Create lib/data.ts**

Create `lib/data.ts`:
```ts
export const siteConfig = {
  tagline:  'Writing, coaching, training & board service for climate.',
  vision:   'A better world with a more sustainable environment and people optimising their potential.',
  mission:  'Make the world a better and more sustainable place',
  address:  '475 River Valley Road, Tanglin, Singapore 248360',
  phone:    '+65 6323 5188',
  founded:  '2002',
  regions:  'Asia Pacific & North America',
  linkedin: 'https://linkedin.com/company/transcarta',
}

export type Service = {
  id: string
  name: string
  description: string
  bullets: string[]
  icon: 'pen' | 'trending-up' | 'users' | 'building'
  imageDimensions: string
}

export const services: Service[] = [
  {
    id: 'writing',
    name: 'Freelance Writing',
    description:
      'Writing for magazines, non-profits and blogs — from in-depth industry articles to copywriting, editing and research for publications and financial services firms.',
    bullets: [
      'Magazine and blog articles',
      'Copywriting and editing',
      'Industry research',
      'Non-profit communications',
    ],
    icon: 'pen',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'investment',
    name: 'Investment Support',
    description:
      'Screening startup investments, co-leading investor groups and coaching founders in sustainability-focused ventures across Asia Pacific.',
    bullets: [
      'Startup investment screening',
      'Co-leading Asia Sustainability Angels',
      'Stanford Angels & Entrepreneurs',
      'Digital Mission Ventures',
      'Founder coaching',
    ],
    icon: 'trending-up',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'training',
    name: 'Sustainability Training',
    description:
      'Environmental sustainability education using Climate Fresk and Deep Time Walk methodologies — for organisations, teams and individuals looking to take meaningful action on climate.',
    bullets: [
      'Climate Fresk workshops',
      'Deep Time Walk sessions',
      'Briefings on environmental sustainability',
      'Individual climate action facilitation',
    ],
    icon: 'users',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'board',
    name: 'Board Service',
    description:
      'Volunteer board positions with non-profit organisations focused on sustainability, clean energy and impact investing.',
    bullets: [
      'Stanford Alumni in Sustainability',
      'Solar Washington',
      'Digital Mission Ventures',
    ],
    icon: 'building',
    imageDimensions: '700 × 480px',
  },
]

export type Publication = {
  id: string
  outlet: string
  title: string
  topic: string
  year: string
  href: string
  imageDimensions: string
}

export const publications: Publication[] = [
  {
    id: 'pub-1',
    outlet: 'Impact Entrepreneur',
    title: 'Article title to be added',
    topic: 'Climate & Finance',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-2',
    outlet: 'The Asian Banker',
    title: 'Article title to be added',
    topic: 'Banking & Sustainability',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-3',
    outlet: 'Today',
    title: 'Article title to be added',
    topic: 'Environment',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-4',
    outlet: 'Impact Entrepreneur',
    title: 'Article title to be added',
    topic: 'Climate & Finance',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-5',
    outlet: 'The Asian Banker',
    title: 'Article title to be added',
    topic: 'Banking & Sustainability',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-6',
    outlet: 'Today',
    title: 'Article title to be added',
    topic: 'Environment',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
]

export type Affiliation = {
  id: string
  name: string
  role: string
}

export const affiliations: Affiliation[] = [
  { id: 'stanford', name: 'Stanford Alumni in Sustainability', role: 'Board Member' },
  { id: 'solar',    name: 'Solar Washington',                  role: 'Board Member' },
  { id: 'dmv',      name: 'Digital Mission Ventures',          role: 'Co-Lead, Investor Group' },
]

export const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'About',        href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Contact',      href: '/contact' },
]

export const insightTopics = ['All', 'Climate', 'Finance', 'Training', 'Policy']
export const publicationOutlets = ['All', 'Impact Entrepreneur', 'The Asian Banker', 'Today']
```

- [ ] **Step 3.5: Run test — confirm pass**

```bash
npm run test:run -- __tests__/lib/data.test.ts
```

Expected: PASS (5 tests).

- [ ] **Step 3.6: Commit**

```bash
git add public/logo.png public/hero-forest.webp lib/data.ts __tests__/lib/data.test.ts
git commit -m "feat: add brand assets to public/ and static content data"
```

---

## Task 4: Shared UI components

**Files:**
- Create: `components/ui/ImagePlaceholder.tsx`
- Create: `components/ui/SectionLabel.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Chip.tsx`
- Create: `__tests__/components/ui/ImagePlaceholder.test.tsx`
- Create: `__tests__/components/ui/SectionLabel.test.tsx`

- [ ] **Step 4.1: Write failing tests**

Create `__tests__/components/ui/ImagePlaceholder.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

describe('ImagePlaceholder', () => {
  it('renders the label', () => {
    render(<ImagePlaceholder label="Team Photo" dimensions="680 × 480px" />)
    expect(screen.getByText('Team Photo')).toBeInTheDocument()
  })

  it('renders the dimensions', () => {
    render(<ImagePlaceholder label="Team Photo" dimensions="680 × 480px" />)
    expect(screen.getByText('680 × 480px')).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    const { container } = render(
      <ImagePlaceholder label="Test" dimensions="100 × 100px" className="h-40" />
    )
    expect(container.firstChild).toHaveClass('h-40')
  })
})
```

Create `__tests__/components/ui/SectionLabel.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionLabel } from '@/components/ui/SectionLabel'

describe('SectionLabel', () => {
  it('renders children text', () => {
    render(<SectionLabel>Our Mission</SectionLabel>)
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
  })
})
```

- [ ] **Step 4.2: Run tests — confirm fail**

```bash
npm run test:run -- __tests__/components/ui/
```

Expected: FAIL — components not found.

- [ ] **Step 4.3: Create ImagePlaceholder**

Create `components/ui/ImagePlaceholder.tsx`:
```tsx
import { ImageIcon } from 'lucide-react'

type Props = {
  label: string
  dimensions: string
  className?: string
}

export function ImagePlaceholder({ label, dimensions, className = '' }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-emerald-300 bg-green-mint p-5 text-center ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-green-primary opacity-50" strokeWidth={1.5} />
      <span className="font-heading text-xs font-semibold text-green-dark">{label}</span>
      <span className="text-[10px] text-muted">Recommended: {dimensions}</span>
    </div>
  )
}
```

- [ ] **Step 4.4: Create SectionLabel**

Create `components/ui/SectionLabel.tsx`:
```tsx
type Props = { children: React.ReactNode }

export function SectionLabel({ children }: Props) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[3px] text-blue-brand">
      <span className="inline-block h-[2px] w-5 bg-blue-brand" />
      {children}
    </div>
  )
}
```

- [ ] **Step 4.5: Create Button**

Create `components/ui/Button.tsx`:
```tsx
import Link from 'next/link'

type Variant = 'primary' | 'outline-blue' | 'white'

type Props = {
  variant?: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

const styles: Record<Variant, string> = {
  primary:
    'bg-green-primary text-white hover:bg-green-dark shadow-[0_4px_14px_rgba(5,150,105,0.35)]',
  'outline-blue':
    'border-2 border-blue-brand text-blue-brand bg-transparent hover:bg-blue-tint',
  white:
    'bg-white text-green-dark hover:bg-green-mint',
}

const base =
  'inline-flex items-center gap-2 rounded-sm px-7 py-3 font-heading text-sm font-semibold transition-all duration-200 cursor-pointer'

export function Button({ variant = 'primary', href, onClick, children, className = '', type = 'button' }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
```

- [ ] **Step 4.6: Create Chip**

Create `components/ui/Chip.tsx`:
```tsx
type Variant = 'green' | 'blue'

type Props = { children: React.ReactNode; variant?: Variant }

export function Chip({ children, variant = 'green' }: Props) {
  const cls =
    variant === 'green'
      ? 'bg-green-mint text-green-dark border-emerald-200'
      : 'bg-blue-tint text-blue-brand border-blue-200'
  return (
    <span className={`mr-1 mt-1 inline-block rounded-full border px-3 py-1 text-[11px] font-semibold ${cls}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 4.7: Run tests — confirm pass**

```bash
npm run test:run -- __tests__/components/ui/
```

Expected: PASS (5 tests).

- [ ] **Step 4.8: Commit**

```bash
git add components/ui/ __tests__/components/ui/
git commit -m "feat: add shared UI components — ImagePlaceholder, SectionLabel, Button, Chip"
```

---

## Task 5: Nav + MobileMenu + Footer

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `__tests__/components/layout/Nav.test.tsx`
- Create: `__tests__/components/layout/Footer.test.tsx`

- [ ] **Step 5.1: Write failing tests**

Create `__tests__/components/layout/Nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Nav } from '@/components/layout/Nav'

// next/link and next/image need mocks in jsdom
vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

describe('Nav', () => {
  it('renders the Transcarta logo alt text', () => {
    render(<Nav />)
    expect(screen.getByAltText('Transcarta')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Nav />)
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Publications').length).toBeGreaterThan(0)
  })

  it('renders Work With Us CTA', () => {
    render(<Nav />)
    expect(screen.getAllByText('Work With Us').length).toBeGreaterThan(0)
  })
})
```

Create `__tests__/components/layout/Footer.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/layout/Footer'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />)
    expect(screen.getByAltText('Transcarta')).toBeInTheDocument()
  })

  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Transcarta/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 5.2: Run tests — confirm fail**

```bash
npm run test:run -- __tests__/components/layout/
```

Expected: FAIL.

- [ ] **Step 5.3: Create MobileMenu (client component)**

Create `components/layout/MobileMenu.tsx`:
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md text-green-dark transition hover:bg-green-mint md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm font-bold tracking-widest text-green-dark">TRANSCARTA</span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-green-dark hover:bg-green-mint"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink hover:text-blue-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Link
              href="/contact"
              className="block w-full rounded-sm bg-green-primary py-3 text-center font-heading text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Work With Us
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 5.4: Create Nav**

Create `components/layout/Nav.tsx`:
```tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/data'
import { MobileMenu } from './MobileMenu'

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 h-[72px] w-full border-b-2 border-blue-brand bg-white/97 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-14">
        {/* Logo */}
        <Link href="/" aria-label="Transcarta home">
          <Image src="/logo.png" alt="Transcarta" width={140} height={36} priority />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active
                    ? 'font-semibold text-blue-brand'
                    : 'text-ink hover:text-blue-brand'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA + mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-sm bg-green-primary px-5 py-2.5 font-heading text-xs font-semibold text-white transition hover:bg-green-dark md:block"
          >
            Work With Us
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 5.5: Create Footer**

Create `components/layout/Footer.tsx`:
```tsx
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-[#0f172a] px-14 py-9">
      {/* Brand blue top bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-blue-brand" />

      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4">
        <Image
          src="/logo.png"
          alt="Transcarta"
          width={130}
          height={34}
          className="opacity-65 brightness-0 invert"
        />
        <nav className="flex flex-wrap gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/45 transition hover:text-blue-mid"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/30">© {year} Transcarta. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5.6: Run tests — confirm pass**

```bash
npm run test:run -- __tests__/components/layout/
```

Expected: PASS (5 tests).

- [ ] **Step 5.7: Commit**

```bash
git add components/layout/ __tests__/components/layout/
git commit -m "feat: add Nav, MobileMenu, and Footer layout components"
```

---

## Task 6: Root layout + fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 6.1: Update app/layout.tsx**

Replace entirely:
```tsx
import type { Metadata } from 'next'
import { Poppins, Open_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Transcarta — Writing, Coaching, Training & Board Service for Climate',
    template: '%s | Transcarta',
  },
  description:
    'Transcarta is a Singapore-based sustainability consulting firm providing writing, investment support, climate training and board service across Asia Pacific and North America.',
  openGraph: {
    siteName: 'Transcarta',
    locale: 'en_SG',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 6.2: Verify layout renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: Nav at top with Transcarta logo and links, footer at bottom with white logo. No console errors. Ctrl+C.

- [ ] **Step 6.3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: root layout with Poppins/Open Sans fonts, Nav, and Footer"
```

---

## Task 7: Hero section

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `__tests__/components/home/Hero.test.tsx`

- [ ] **Step 7.1: Write failing test**

Create `__tests__/components/home/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/home/Hero'

describe('Hero', () => {
  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/Writing, coaching, training/i)).toBeInTheDocument()
  })

  it('renders the mission statement', () => {
    render(<Hero />)
    expect(screen.getByText(/better world/i)).toBeInTheDocument()
  })

  it('renders Work With Us CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Work With Us')).toBeInTheDocument()
  })

  it('renders the stats', () => {
    render(<Hero />)
    expect(screen.getByText('20+')).toBeInTheDocument()
  })
})
```

- [ ] **Step 7.2: Run test — confirm fail**

```bash
npm run test:run -- __tests__/components/home/Hero.test.tsx
```

Expected: FAIL.

- [ ] **Step 7.3: Create Hero component**

Create `components/home/Hero.tsx`:
```tsx
import Link from 'next/link'
import { siteConfig } from '@/lib/data'

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-[center_30%]"
        style={{ backgroundImage: "url('/hero-forest.webp')" }}
        role="img"
        aria-label="Misty tropical rainforest"
      />

      {/* Green gradient overlay — lighter at right so forest breathes through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, rgba(4,80,45,0.68) 0%, rgba(5,150,105,0.42) 55%, rgba(5,150,105,0.18) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-14 pb-24 pt-36">
        {/* Eyebrow */}
        <p className="mb-5 font-body text-[11px] font-semibold uppercase tracking-[3px] text-emerald-300">
          Est. {siteConfig.founded} &nbsp;·&nbsp; Singapore &nbsp;·&nbsp; {siteConfig.regions}
        </p>

        {/* Heading */}
        <h1
          className="mb-5 max-w-[640px] font-heading text-[clamp(32px,4.2vw,54px)] font-bold leading-[1.18] text-white"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}
        >
          Writing, coaching,{' '}
          <span className="border-b-2 border-blue-300 text-blue-200">training</span>
          {' '}& board service{' '}
          <em className="not-italic text-green-light">for climate.</em>
        </h1>

        {/* Sub */}
        <p
          className="mb-9 max-w-[480px] font-body text-base leading-7 text-white/86"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}
        >
          {siteConfig.vision}
        </p>

        {/* CTAs */}
        <div className="mb-14 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-green-primary px-7 py-3 font-heading text-sm font-semibold text-white shadow-[0_4px_14px_rgba(5,150,105,0.4)] transition hover:bg-green-dark"
          >
            Work With Us &nbsp;→
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-sm border-2 border-blue-300/50 bg-blue-brand/18 px-7 py-3 font-heading text-sm font-semibold text-blue-200 backdrop-blur-sm transition hover:border-blue-300 hover:bg-blue-brand/32"
          >
            Our Services
          </Link>
        </div>

        {/* Stats strip */}
        <div className="flex max-w-[480px] border-t border-white/20 pt-6">
          {[
            { number: '20+', label: 'Years in financial & climate services' },
            { number: '4',   label: 'Core service areas' },
            { number: '2',   label: 'Continents served' },
          ].map((stat, i, arr) => (
            <div
              key={stat.number}
              className={`flex-1 ${i < arr.length - 1 ? 'mr-6 border-r border-white/20 pr-6' : ''}`}
            >
              <p className="mb-1 font-heading text-2xl font-bold text-green-light">{stat.number}</p>
              <p className="font-body text-[11px] leading-snug text-white/68">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7.4: Run test — confirm pass**

```bash
npm run test:run -- __tests__/components/home/Hero.test.tsx
```

Expected: PASS (4 tests).

- [ ] **Step 7.5: Commit**

```bash
git add components/home/Hero.tsx __tests__/components/home/Hero.test.tsx
git commit -m "feat: Hero section with forest image, green overlay, and stats strip"
```

---

## Task 8: ServicesStrip + Mission + PublicationsPreview + Affiliations + ContactCTA

**Files:**
- Create: `components/home/ServicesStrip.tsx`
- Create: `components/home/Mission.tsx`
- Create: `components/home/PublicationsPreview.tsx`
- Create: `components/home/Affiliations.tsx`
- Create: `components/home/ContactCTA.tsx`
- Create: `components/shared/PublicationCard.tsx`
- Create: `__tests__/components/home/ServicesStrip.test.tsx`

- [ ] **Step 8.1: Write failing test**

Create `__tests__/components/home/ServicesStrip.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesStrip } from '@/components/home/ServicesStrip'

vi.mock('next/link', () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }))

describe('ServicesStrip', () => {
  it('renders all 4 service names', () => {
    render(<ServicesStrip />)
    expect(screen.getByText('Freelance Writing')).toBeInTheDocument()
    expect(screen.getByText('Investment Support')).toBeInTheDocument()
    expect(screen.getByText('Sustainability Training')).toBeInTheDocument()
    expect(screen.getByText('Board Service')).toBeInTheDocument()
  })

  it('renders Learn more links', () => {
    render(<ServicesStrip />)
    expect(screen.getAllByText(/Learn more/i).length).toBe(4)
  })
})
```

- [ ] **Step 8.2: Run test — confirm fail**

```bash
npm run test:run -- __tests__/components/home/ServicesStrip.test.tsx
```

Expected: FAIL.

- [ ] **Step 8.3: Create PublicationCard (shared)**

Create `components/shared/PublicationCard.tsx`:
```tsx
import Link from 'next/link'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import type { Publication } from '@/lib/data'

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-white shadow-sm transition hover:border-blue-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <ImagePlaceholder
        label="Article Image"
        dimensions={pub.imageDimensions}
        className="h-40 rounded-none border-0"
      />
      <div className="p-4">
        <p className="mb-2 flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-blue-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-brand" />
          {pub.outlet}
        </p>
        <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-ink">
          {pub.title}
        </h3>
        <p className="mb-3 font-body text-[11px] text-muted">
          {pub.year} · {pub.topic}
        </p>
        <Link href={pub.href} className="font-body text-xs font-semibold text-blue-brand hover:underline">
          Read article →
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 8.4: Create ServicesStrip**

Create `components/home/ServicesStrip.tsx`:
```tsx
import Link from 'next/link'
import { PenLine, TrendingUp, Users, Building2 } from 'lucide-react'
import { services } from '@/lib/data'
import type { Service } from '@/lib/data'

const iconMap: Record<Service['icon'], React.ReactNode> = {
  pen:          <PenLine   className="h-[18px] w-[18px]" strokeWidth={2} />,
  'trending-up':<TrendingUp className="h-[18px] w-[18px]" strokeWidth={2} />,
  users:        <Users      className="h-[18px] w-[18px]" strokeWidth={2} />,
  building:     <Building2  className="h-[18px] w-[18px]" strokeWidth={2} />,
}

export function ServicesStrip() {
  return (
    <div className="grid grid-cols-1 border-t-[3px] border-blue-brand bg-white shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
      {services.map((svc, i) => (
        <div
          key={svc.id}
          className={`px-7 py-8 ${i < services.length - 1 ? 'border-b border-border lg:border-b-0 lg:border-r' : ''}`}
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-blue-tint text-blue-brand">
            {iconMap[svc.icon]}
          </div>
          <h3 className="mb-1.5 font-heading text-sm font-semibold text-green-dark">{svc.name}</h3>
          <p className="mb-2.5 font-body text-xs leading-relaxed text-muted">{svc.description.split('—')[0].trim()}</p>
          <Link href={`/services#${svc.id}`} className="font-body text-[11px] font-semibold text-blue-brand hover:underline">
            Learn more →
          </Link>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 8.5: Create Mission**

Create `components/home/Mission.tsx`:
```tsx
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Chip } from '@/components/ui/Chip'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { siteConfig } from '@/lib/data'

const chips: { label: string; variant: 'green' | 'blue' }[] = [
  { label: 'Climate Action',       variant: 'green' },
  { label: 'Sustainable Finance',  variant: 'blue' },
  { label: 'ESG Training',         variant: 'green' },
  { label: 'Asia Pacific',         variant: 'blue' },
  { label: 'Impact Writing',       variant: 'green' },
]

export function Mission() {
  return (
    <section className="mx-auto max-w-content px-14 py-20">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel>Our Mission</SectionLabel>
          <blockquote className="mb-5 border-l-4 border-blue-brand pl-6 font-heading text-xl font-semibold leading-relaxed text-green-dark">
            "{siteConfig.vision}"
          </blockquote>
          <p className="mb-5 font-body text-[15px] leading-7 text-[#374151]">
            Transcarta focuses on making the world a better and more sustainable place — through
            writing, capital, training and board service across Asia Pacific and North America.
          </p>
          <div>
            {chips.map(c => <Chip key={c.label} variant={c.variant}>{c.label}</Chip>)}
          </div>
        </div>
        <ImagePlaceholder label="Team / Mission Photo" dimensions="680 × 480px" className="h-[340px]" />
      </div>
    </section>
  )
}
```

- [ ] **Step 8.6: Create PublicationsPreview**

Create `components/home/PublicationsPreview.tsx`:
```tsx
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PublicationCard } from '@/components/shared/PublicationCard'
import { publications } from '@/lib/data'

export function PublicationsPreview() {
  const preview = publications.slice(0, 3)
  return (
    <div className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-content px-14">
        <SectionLabel>Latest Writing</SectionLabel>
        <div className="mb-9 flex items-end justify-between">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-bold leading-tight text-green-dark">
            From Our Publications
          </h2>
          <Link href="/publications" className="font-body text-xs font-semibold text-blue-brand hover:underline">
            View all publications →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8.7: Create Affiliations**

Create `components/home/Affiliations.tsx`:
```tsx
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { affiliations } from '@/lib/data'

export function Affiliations() {
  return (
    <div className="bg-green-mint py-[70px]">
      <div className="mx-auto max-w-content px-14">
        <SectionLabel>Board Affiliations</SectionLabel>
        <h2 className="mb-8 font-heading text-[clamp(24px,3vw,36px)] font-bold leading-tight text-green-dark">
          Organisations We Serve
        </h2>
        <div className="flex flex-wrap gap-5">
          {affiliations.map(aff => (
            <div
              key={aff.id}
              className="flex min-w-[180px] flex-1 flex-col items-center gap-3 rounded-md border border-emerald-100 border-l-[3px] border-l-blue-brand bg-white p-6"
            >
              <ImagePlaceholder label="Logo" dimensions="200 × 80px" className="h-14 w-full rounded-sm" />
              <p className="text-center font-heading text-[13px] font-semibold text-green-dark">{aff.name}</p>
              <p className="text-center font-body text-[11px] text-muted">{aff.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8.8: Create ContactCTA**

Create `components/home/ContactCTA.tsx`:
```tsx
import Link from 'next/link'
import { siteConfig } from '@/lib/data'

export function ContactCTA() {
  return (
    <div className="bg-green-dark px-14 py-[70px] text-center">
      <h2 className="mb-3 font-heading text-[30px] font-bold text-white">Ready to work together?</h2>
      <p className="mx-auto mb-7 max-w-md font-body text-[15px] text-white/72">
        Whether you need writing, sustainability training, or investment support — let's talk.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-sm bg-white px-8 py-3.5 font-heading text-sm font-semibold text-green-dark transition hover:bg-green-mint"
        >
          Get In Touch
        </Link>
        <Link
          href="/services"
          className="rounded-sm border-2 border-blue-300/50 px-8 py-3.5 font-heading text-sm font-semibold text-blue-200 transition hover:border-blue-300"
        >
          View Services
        </Link>
      </div>
      <p className="mt-5 font-body text-[13px] text-white/45">
        {siteConfig.address} · {siteConfig.phone}
      </p>
    </div>
  )
}
```

- [ ] **Step 8.9: Run test — confirm pass**

```bash
npm run test:run -- __tests__/components/home/ServicesStrip.test.tsx
```

Expected: PASS (2 tests).

- [ ] **Step 8.10: Commit**

```bash
git add components/home/ components/shared/PublicationCard.tsx __tests__/components/home/
git commit -m "feat: Home page sections — ServicesStrip, Mission, Publications, Affiliations, ContactCTA"
```

---

## Task 9: Home page + PageHero

**Files:**
- Create: `components/shared/PageHero.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css` (replace default Next.js styles if present)

- [ ] **Step 9.1: Create PageHero (shared inner-page hero)**

Create `components/shared/PageHero.tsx`:
```tsx
type Props = {
  label?: string
  heading: string
  sub?: string
}

export function PageHero({ label, heading, sub }: Props) {
  return (
    <div className="bg-green-mint px-14 py-16">
      <div className="mx-auto max-w-content">
        {label && (
          <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[3px] text-blue-brand">
            {label}
          </p>
        )}
        <h1 className="font-heading text-[clamp(28px,4vw,48px)] font-bold leading-tight text-green-dark">
          {heading}
        </h1>
        {sub && (
          <p className="mt-4 max-w-xl font-body text-[15px] leading-7 text-muted">{sub}</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 9.2: Replace app/page.tsx**

```tsx
import { Hero } from '@/components/home/Hero'
import { ServicesStrip } from '@/components/home/ServicesStrip'
import { Mission } from '@/components/home/Mission'
import { PublicationsPreview } from '@/components/home/PublicationsPreview'
import { Affiliations } from '@/components/home/Affiliations'
import { ContactCTA } from '@/components/home/ContactCTA'

export const metadata = {
  title: 'Transcarta — Writing, Coaching, Training & Board Service for Climate',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Mission />
      <PublicationsPreview />
      <Affiliations />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 9.3: Verify home page renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: full homepage — forest hero, service strip, mission section, 3 publication cards, affiliations, CTA band, footer. Ctrl+C.

- [ ] **Step 9.4: Commit**

```bash
git add app/page.tsx components/shared/PageHero.tsx
git commit -m "feat: Home page assembled with all sections"
```

---

## Task 10: Services page

**Files:**
- Create: `components/shared/ServiceBlock.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 10.1: Create ServiceBlock**

Create `components/shared/ServiceBlock.tsx`:
```tsx
import { PenLine, TrendingUp, Users, Building2 } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import type { Service } from '@/lib/data'

const iconMap: Record<Service['icon'], React.ReactNode> = {
  pen:          <PenLine    className="h-6 w-6" strokeWidth={2} />,
  'trending-up':<TrendingUp className="h-6 w-6" strokeWidth={2} />,
  users:        <Users      className="h-6 w-6" strokeWidth={2} />,
  building:     <Building2  className="h-6 w-6" strokeWidth={2} />,
}

type Props = { service: Service; reverse?: boolean }

export function ServiceBlock({ service, reverse = false }: Props) {
  const textCol = (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-tint text-blue-brand">
        {iconMap[service.icon]}
      </div>
      <h2 id={service.id} className="mb-3 font-heading text-2xl font-bold text-green-dark">
        {service.name}
      </h2>
      <p className="mb-4 font-body text-[15px] leading-7 text-[#374151]">{service.description}</p>
      <ul className="space-y-2">
        {service.bullets.map(b => (
          <li key={b} className="flex items-start gap-2 font-body text-sm text-[#374151]">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-brand" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )

  const imageCol = (
    <ImagePlaceholder label={service.name} dimensions={service.imageDimensions} className="h-[320px]" />
  )

  return (
    <div className={`grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-last' : ''}`}>
      {textCol}
      {imageCol}
    </div>
  )
}
```

- [ ] **Step 10.2: Create Services page**

Create `app/services/page.tsx`:
```tsx
import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceBlock } from '@/components/shared/ServiceBlock'
import { ContactCTA } from '@/components/home/ContactCTA'
import { services } from '@/lib/data'

export const metadata: Metadata = { title: 'Services' }

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What We Do"
        heading="Our Services"
        sub="Four areas where Transcarta makes an impact — for clients across Asia Pacific and North America."
      />
      <div className="mx-auto max-w-content divide-y divide-border px-14">
        {services.map((svc, i) => (
          <ServiceBlock key={svc.id} service={svc} reverse={i % 2 !== 0} />
        ))}
      </div>
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 10.3: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/services`. Expected: page hero, 4 alternating service blocks (text left/right) each with image placeholder, CTA at bottom. Ctrl+C.

- [ ] **Step 10.4: Commit**

```bash
git add app/services/page.tsx components/shared/ServiceBlock.tsx
git commit -m "feat: Services page with alternating service blocks"
```

---

## Task 11: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 11.1: Create About page**

Create `app/about/page.tsx`:
```tsx
import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { Chip } from '@/components/ui/Chip'
import { Affiliations } from '@/components/home/Affiliations'
import { ContactCTA } from '@/components/home/ContactCTA'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`Est. ${siteConfig.founded} · Singapore`}
        heading="About Transcarta"
        sub="A sustainability consulting firm working at the intersection of climate, capital and communication."
      />

      {/* Our Story */}
      <section className="mx-auto max-w-content px-14 py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mb-4 font-heading text-3xl font-bold text-green-dark">
              Two decades of climate and finance expertise
            </h2>
            <p className="mb-4 font-body text-[15px] leading-7 text-[#374151]">
              Founded in 2002, Transcarta brings together expertise in financial services, sustainability
              and communications. Operating across Asia Pacific and North America, we work with
              organisations seeking to align their capital, communications and culture with a more
              sustainable future.
            </p>
            <p className="font-body text-[15px] leading-7 text-[#374151]">
              Our team has deep roots in banking and financial services — from payments strategy and
              retail banking to investment and startup ecosystems — paired with a long-standing
              commitment to climate action.
            </p>
          </div>
          <ImagePlaceholder label="Office / Team Photo" dimensions="680 × 480px" className="h-[340px]" />
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="bg-[#f9fafb] py-20">
        <div className="mx-auto max-w-content px-14">
          <SectionLabel>Mission & Vision</SectionLabel>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="rounded-md border border-border bg-white p-8">
              <h3 className="mb-3 font-heading text-lg font-semibold text-green-dark">Our Vision</h3>
              <p className="font-body text-[15px] italic leading-7 text-[#374151]">
                "{siteConfig.vision}"
              </p>
            </div>
            <div className="rounded-md border border-blue-brand/20 bg-blue-tint p-8">
              <h3 className="mb-3 font-heading text-lg font-semibold text-blue-brand">Our Mission</h3>
              <p className="font-body text-[15px] leading-7 text-[#374151]">
                {siteConfig.mission}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Chip variant="green">Climate Action</Chip>
            <Chip variant="blue">Sustainable Finance</Chip>
            <Chip variant="green">ESG Training</Chip>
            <Chip variant="blue">Asia Pacific</Chip>
            <Chip variant="green">Impact Writing</Chip>
          </div>
        </div>
      </div>

      {/* The Team */}
      <section className="mx-auto max-w-content px-14 py-20">
        <SectionLabel>The Team</SectionLabel>
        <h2 className="mb-4 font-heading text-3xl font-bold text-green-dark">
          Collective expertise, shared mission
        </h2>
        <p className="mb-10 max-w-xl font-body text-[15px] leading-7 text-[#374151]">
          Our team brings together experience spanning financial services, sustainability consulting,
          writing and board governance — united by a commitment to a more sustainable world.
        </p>
        <ImagePlaceholder label="Team Photo" dimensions="560 × 400px" className="h-[320px] lg:w-2/3" />
      </section>

      <Affiliations />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 11.2: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/about`. Expected: page hero, story section, mission/vision cards, team placeholder, affiliations, CTA. Ctrl+C.

- [ ] **Step 11.3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: About page with story, mission/vision, and team sections"
```

---

## Task 12: Publications page

**Files:**
- Create: `components/publications/OutletFilter.tsx`
- Create: `app/publications/page.tsx`

- [ ] **Step 12.1: Create OutletFilter (client component)**

Create `components/publications/OutletFilter.tsx`:
```tsx
'use client'
type Props = { outlets: string[]; active: string; onChange: (o: string) => void }

export function OutletFilter({ outlets, active, onChange }: Props) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {outlets.map(outlet => (
        <button
          key={outlet}
          onClick={() => onChange(outlet)}
          className={`rounded-full px-4 py-1.5 font-body text-xs font-semibold transition ${
            active === outlet
              ? 'bg-blue-brand text-white'
              : 'border border-border bg-white text-muted hover:border-blue-brand hover:text-blue-brand'
          }`}
        >
          {outlet}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 12.2: Create Publications page**

Create `app/publications/page.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { PageHero } from '@/components/shared/PageHero'
import { OutletFilter } from '@/components/publications/OutletFilter'
import { PublicationCard } from '@/components/shared/PublicationCard'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { ContactCTA } from '@/components/home/ContactCTA'
import { publications, publicationOutlets } from '@/lib/data'

export default function PublicationsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? publications : publications.filter(p => p.outlet === active)

  return (
    <>
      <PageHero
        label="Our Writing"
        heading="Publications"
        sub="Writing for magazines, non-profits and industry publications on climate, finance and sustainability."
      />

      <div className="mx-auto max-w-content px-14 py-20">
        {/* Featured */}
        <div className="mb-14">
          <p className="mb-4 font-body text-[11px] font-bold uppercase tracking-[3px] text-blue-brand">
            Featured Article
          </p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ImagePlaceholder label="Featured Article Image" dimensions="1160 × 520px" className="h-[280px]" />
            <div className="flex flex-col justify-center">
              <span className="mb-2 inline-flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-blue-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-brand" /> Impact Entrepreneur
              </span>
              <h2 className="mb-3 font-heading text-2xl font-bold text-ink">
                Article title to be added
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-muted">
                2024 · Climate & Finance
              </p>
              <a href="#" className="font-body text-sm font-semibold text-blue-brand hover:underline">
                Read article →
              </a>
            </div>
          </div>
        </div>

        {/* Filter + grid */}
        <OutletFilter outlets={publicationOutlets} active={active} onChange={setActive} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
        </div>
      </div>

      {/* Writing CTA */}
      <div className="bg-green-mint py-16 text-center">
        <h2 className="mb-3 font-heading text-2xl font-bold text-green-dark">
          Need writing for your organisation?
        </h2>
        <p className="mx-auto mb-6 max-w-md font-body text-sm text-muted">
          From articles and newsletters to research and copywriting — get in touch.
        </p>
        <a
          href="/contact"
          className="inline-block rounded-sm bg-green-primary px-8 py-3 font-heading text-sm font-semibold text-white hover:bg-green-dark"
        >
          Get In Touch
        </a>
      </div>

      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 12.3: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/publications`. Expected: page hero, featured article (with placeholder), filter buttons (All, Impact Entrepreneur, etc.), publication card grid, writing CTA. Filter buttons should narrow the grid. Ctrl+C.

- [ ] **Step 12.4: Commit**

```bash
git add app/publications/page.tsx components/publications/OutletFilter.tsx
git commit -m "feat: Publications page with outlet filter and article grid"
```

---

## Task 13: Insights page

**Files:**
- Create: `app/insights/page.tsx`

- [ ] **Step 13.1: Create Insights page**

Create `app/insights/page.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { PageHero } from '@/components/shared/PageHero'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { ContactCTA } from '@/components/home/ContactCTA'
import { insightTopics } from '@/lib/data'

const stubs = [
  { id: '1', topic: 'Climate',  title: 'Insight title to be added', date: 'April 2024' },
  { id: '2', topic: 'Finance',  title: 'Insight title to be added', date: 'March 2024' },
  { id: '3', topic: 'Training', title: 'Insight title to be added', date: 'February 2024' },
  { id: '4', topic: 'Policy',   title: 'Insight title to be added', date: 'January 2024' },
  { id: '5', topic: 'Climate',  title: 'Insight title to be added', date: 'December 2023' },
  { id: '6', topic: 'Finance',  title: 'Insight title to be added', date: 'November 2023' },
]

export default function InsightsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? stubs : stubs.filter(s => s.topic === active)

  return (
    <>
      <PageHero
        label="Insights"
        heading="Perspectives on climate, finance & sustainability"
        sub="Original thinking from the Transcarta team on the issues shaping our world."
      />

      <div className="mx-auto max-w-content px-14 py-20">
        {/* Featured */}
        <div className="mb-14 overflow-hidden rounded-md border border-border bg-white shadow-sm">
          <ImagePlaceholder label="Featured Post Image" dimensions="1160 × 520px" className="h-[300px] rounded-none border-0" />
          <div className="p-8">
            <span className="mb-2 inline-block rounded-full bg-blue-tint px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-blue-brand">
              Climate
            </span>
            <h2 className="mb-3 font-heading text-2xl font-bold text-ink">Insight title to be added</h2>
            <p className="mb-4 font-body text-sm text-muted">April 2024</p>
            <a href="#" className="font-body text-sm font-semibold text-blue-brand hover:underline">Read more →</a>
          </div>
        </div>

        {/* Topic filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {insightTopics.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-semibold transition ${
                active === t
                  ? 'bg-blue-brand text-white'
                  : 'border border-border bg-white text-muted hover:border-blue-brand hover:text-blue-brand'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(post => (
            <article key={post.id} className="overflow-hidden rounded-md border border-border bg-white transition hover:border-blue-200 hover:shadow-md">
              <ImagePlaceholder label="Post Image" dimensions="760 × 440px" className="h-40 rounded-none border-0" />
              <div className="p-4">
                <span className="mb-2 inline-block rounded-full bg-blue-tint px-2.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-wider text-blue-brand">
                  {post.topic}
                </span>
                <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-ink">{post.title}</h3>
                <p className="mb-3 font-body text-[11px] text-muted">{post.date}</p>
                <a href="#" className="font-body text-xs font-semibold text-blue-brand hover:underline">Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 13.2: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/insights`. Expected: featured post, topic filter (All/Climate/Finance/Training/Policy), 6-card grid. Filter updates the grid. Ctrl+C.

- [ ] **Step 13.3: Commit**

```bash
git add app/insights/page.tsx
git commit -m "feat: Insights page with topic filter and article grid"
```

---

## Task 14: Contact page + form

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `app/actions/contact.ts`
- Create: `app/contact/page.tsx`
- Create: `__tests__/components/contact/ContactForm.test.tsx`

- [ ] **Step 14.1: Write failing test**

Create `__tests__/components/contact/ContactForm.test.tsx`:
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '@/components/contact/ContactForm'

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 14.2: Run test — confirm fail**

```bash
npm run test:run -- __tests__/components/contact/ContactForm.test.tsx
```

Expected: FAIL.

- [ ] **Step 14.3: Create Server Action**

Create `app/actions/contact.ts`:
```ts
'use server'

export type ContactFormData = {
  name: string
  email: string
  service: string
  message: string
}

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  // Validate
  if (!data.name.trim())    return { ok: false, error: 'Name is required.' }
  if (!data.email.includes('@')) return { ok: false, error: 'Valid email required.' }
  if (!data.message.trim()) return { ok: false, error: 'Message is required.' }

  // TODO: connect to email service (e.g. Resend, SendGrid, or SMTP)
  // Example with Resend:
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({ from: 'web@transcarta.com', to: 'info@transcarta.com', ... })

  console.log('[Contact form submission]', data)
  return { ok: true }
}
```

- [ ] **Step 14.4: Create ContactForm**

Create `components/contact/ContactForm.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'

const serviceOptions = ['Writing', 'Investment Support', 'Sustainability Training', 'Board Service', 'Other']

type Errors = { name?: string; email?: string; message?: string }

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {}
  if (!name.trim())           errors.name = 'Name is required.'
  if (!email.includes('@'))   errors.email = 'Valid email required.'
  if (!message.trim())        errors.message = 'Message is required.'
  return errors
}

export function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors]   = useState<Errors>({})
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(name, email, message)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    const result = await submitContact({ name, email, service, message })
    setStatus(result.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-emerald-200 bg-green-mint p-8 text-center">
        <p className="font-heading text-lg font-semibold text-green-dark">Message sent!</p>
        <p className="mt-2 font-body text-sm text-muted">We'll be in touch shortly.</p>
      </div>
    )
  }

  const field = 'w-full rounded-sm border border-border px-4 py-3 font-body text-sm text-ink transition focus:border-blue-brand focus:outline-none focus:ring-2 focus:ring-blue-brand/20'
  const label = 'mb-1.5 block font-body text-sm font-medium text-ink'
  const err   = 'mt-1 font-body text-xs text-red-500'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} className={field} placeholder="Your name" />
        {errors.name && <p className={err}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={field} placeholder="you@example.com" />
        {errors.email && <p className={err}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="service" className={label}>Service Interest</label>
        <select id="service" value={service} onChange={e => setService(e.target.value)} className={field}>
          <option value="">Select a service…</option>
          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={field}
          placeholder="Tell us about your project or enquiry…"
        />
        {errors.message && <p className={err}>{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-sm bg-green-primary py-3 font-heading text-sm font-semibold text-white transition hover:bg-green-dark disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
```

- [ ] **Step 14.5: Create Contact page**

Create `app/contact/page.tsx`:
```tsx
import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig } from '@/lib/data'
import { MapPin, Phone, Linkedin } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        heading="Work With Us"
        sub="Whether you need writing, sustainability training, or investment support — we'd love to hear from you."
      />

      <div className="mx-auto max-w-content px-14 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-green-dark">Send a message</h2>
            <ContactForm />
          </div>

          {/* Details */}
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-green-dark">Our details</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Address</p>
                  <p className="font-body text-sm text-muted">{siteConfig.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="font-body text-sm text-blue-brand hover:underline">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Linkedin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">LinkedIn</p>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-blue-brand hover:underline">
                    Follow Transcarta
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-md border border-border bg-[#f9fafb] p-6">
              <p className="font-body text-sm font-semibold text-ink">Coverage</p>
              <p className="mt-1 font-body text-sm text-muted">{siteConfig.regions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 14.6: Run tests — confirm pass**

```bash
npm run test:run -- __tests__/components/contact/ContactForm.test.tsx
```

Expected: PASS (3 tests).

- [ ] **Step 14.7: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Expected: two-column layout — form on left, address/phone/LinkedIn on right. Submit empty form → inline error messages appear. Ctrl+C.

- [ ] **Step 14.8: Commit**

```bash
git add app/contact/page.tsx components/contact/ContactForm.tsx app/actions/contact.ts __tests__/components/contact/
git commit -m "feat: Contact page with validated form and server action"
```

---

## Task 15: Full test run + build check

- [ ] **Step 15.1: Run all tests**

```bash
npm run test:run
```

Expected: all tests PASS. If any fail, fix before proceeding.

- [ ] **Step 15.2: Run production build**

```bash
npm run build
```

Expected: build completes with no errors. Note: warnings about `'use client'` boundaries on pages with Server Actions are expected — errors are not.

- [ ] **Step 15.3: Lint check**

```bash
npm run lint
```

Expected: no errors. Fix any reported by ESLint before committing.

- [ ] **Step 15.4: Check responsive layout**

```bash
npm run dev
```

Open `http://localhost:3000` and resize the browser to:
- 375px — hamburger menu visible, hero readable, services stack vertically
- 768px — services in 2 columns, nav links visible
- 1024px — full desktop layout

Ctrl+C.

- [ ] **Step 15.5: Final commit**

```bash
git add -A
git commit -m "feat: complete Transcarta redesign — 6 pages, design system, image placeholders"
```

---

## Self-Review Notes

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Nature Green + Brand Blue design system | Task 2 |
| Logo in nav (colour) and footer (white) | Task 5 |
| Forest hero image with lighter green overlay | Task 7 |
| ImagePlaceholder component with labelled dimensions | Task 4 |
| 6 pages: Home, Services, About, Publications, Insights, Contact | Tasks 9–14 |
| Services strip with blue icons | Task 8 |
| Mission with blue-bar quote + chips | Task 8 |
| Publications preview (3 cards, blue outlet labels) | Task 8 |
| Affiliations with blue left border | Task 8 |
| Contact CTA band (forest green) | Task 8 |
| Alternating service blocks | Task 10 |
| About: story, mission/vision, team, partnerships | Task 11 |
| Publications: filter by outlet | Task 12 |
| Insights: filter by topic | Task 13 |
| Contact form: validation + server action | Task 14 |
| UI/UX rules: focus rings, cursor-pointer, 200ms transitions, reduced-motion | globals.css (Task 2) + component implementations |
| No emoji icons — Heroicons/Lucide only | All component tasks |
| Responsive at 375/768/1024/1440px | Task 15 |
| No individual focus (Richard not named) | Tasks 9, 11 — About page describes collective team |
