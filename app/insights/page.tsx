'use client'
import { useState } from 'react'
import Image from 'next/image'
import { PageHero } from '@/components/shared/PageHero'
import { ContactCTA } from '@/components/home/ContactCTA'
import { insightTopics, substackPosts } from '@/lib/data'

export default function InsightsPage() {
  const [active, setActive] = useState('All')

  const featured = substackPosts[0]
  const rest = substackPosts.slice(1)
  const filtered = active === 'All' ? rest : rest.filter(p => p.topic === active)

  return (
    <>
      <PageHero
        label="Insights"
        heading="Perspectives on climate, finance & sustainability"
        sub="Original thinking from the Transcarta team on the issues shaping our world."
      />

      <div className="mx-auto max-w-content px-14 py-20">
        {/* Featured */}
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-14 block overflow-hidden rounded-md border border-border bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
        >
          <div className="relative h-[300px] w-full">
            <Image src={featured.image} alt={featured.title} fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="p-8">
            <span className="mb-2 inline-block rounded-full bg-blue-tint px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-blue-brand">
              {featured.topic}
            </span>
            <h2 className="mb-3 font-heading text-2xl font-bold text-ink group-hover:text-blue-brand">
              {featured.title}
            </h2>
            <p className="mb-3 font-body text-sm leading-relaxed text-muted">{featured.summary}</p>
            <p className="mb-4 font-body text-xs text-muted">{featured.date}</p>
            <span className="font-body text-sm font-semibold text-blue-brand group-hover:underline">Read on Substack →</span>
          </div>
        </a>

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
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-md border border-border bg-white transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="relative h-40 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
              <div className="p-4">
                <span className="mb-2 inline-block rounded-full bg-blue-tint px-2.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-wider text-blue-brand">
                  {post.topic}
                </span>
                <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-ink group-hover:text-blue-brand">
                  {post.title}
                </h3>
                <p className="mb-2 font-body text-[11px] leading-relaxed text-muted line-clamp-2">
                  {post.summary}
                </p>
                <p className="mb-3 font-body text-[11px] text-muted">{post.date}</p>
                <span className="font-body text-xs font-semibold text-blue-brand group-hover:underline">Read on Substack →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <ContactCTA />
    </>
  )
}
