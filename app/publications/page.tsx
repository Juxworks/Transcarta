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
          className="inline-block rounded-[6px] bg-green-primary px-8 py-3 font-heading text-sm font-semibold text-white hover:bg-green-dark"
        >
          Get In Touch
        </a>
      </div>

      <ContactCTA />
    </>
  )
}
