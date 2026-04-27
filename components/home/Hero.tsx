import Link from 'next/link'
import { siteConfig } from '@/lib/data'

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-[center_30%]"
        style={{ backgroundImage: "url('/tc-hero.jpg')" }}
        role="img"
        aria-label="Transcarta — climate and sustainability consultants"
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
          training
          {' '}& board service{' '}
          <em className="not-italic text-green-light">for climate.</em>
        </h1>

        {/* Sub */}
        <p
          className="mb-9 max-w-[480px] font-body text-base leading-7 text-white/80"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.15)' }}
        >
          {siteConfig.vision}
        </p>

        {/* CTAs */}
        <div className="mb-14 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[6px] bg-green-primary px-7 py-3 font-heading text-sm font-semibold text-white shadow-[0_4px_14px_rgba(5,150,105,0.4)] transition hover:bg-green-dark"
          >
            Work With Us →
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-[6px] border-2 border-white/30 bg-white/10 px-7 py-3 font-heading text-sm font-semibold text-blue-200 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20"
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
              <p className="font-body text-[11px] leading-snug text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
