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
