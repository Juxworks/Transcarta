# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Redesign of the Transcarta website (transcarta.com). Transcarta is a Singapore-based sustainability consulting firm founded in 2002 by Richard Hartung. The redesign is a greenfield build — the current live site is the reference for content and scope.

## Company Context

- **Founder:** Richard Hartung — 20+ years in financial services (MasterCard, Citibank Japan), Stanford MBA
- **Location:** Singapore (Asia Pacific + North America client base)
- **Focus:** Climate, sustainability consulting, writing, training, and non-profit board service
- **Vision:** "A better world with a more sustainable environment and people optimising their potential."

### Services

1. **Freelance Writing** — Articles for Impact Entrepreneur, The Asian Banker, Today newspaper, non-profits, blogs
2. **Investment Support** — Startup screening, investor group co-leadership, founder coaching (sustainability-focused)
3. **Training** — Climate Fresk and Deep Time Walk methodologies
4. **Non-profit Board Service** — Stanford Alumni in Sustainability, Solar Washington, Digital Mission Ventures
5. **Payments & Retail Banking Strategy** — Consulting and research support

### Site Structure (current)

- Home, Services, Contact Us
- Contact: 475 River Valley Road, Tanglin, Singapore | +65 6323 5188

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (default for Next.js)

## Build & Dev Commands

```bash
npm run dev       # start dev server at localhost:3000
npm run build     # production build
npm run lint      # ESLint
```
