'use client'
import { useState } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/shared/PageHero'
import { OutletFilter } from '@/components/publications/OutletFilter'
import { PublicationCard } from '@/components/shared/PublicationCard'
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
            <div className="relative h-[280px] overflow-hidden rounded-lg">
              <Image
                src="/publications_Meaning.webp"
                alt="Make Your Life more Meaningful"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="mb-2 inline-flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-blue-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-brand" /> Impact Entrepreneur
              </span>
              <h2 className="mb-3 font-heading text-2xl font-bold text-ink">
                Make Your Life more Meaningful
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-muted">
                A structured framework for reclaiming a sense of purpose and productivity in an often distracted and uncertain world. It emphasizes moving beyond mundane tasks to align daily actions with long-term vision.
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
