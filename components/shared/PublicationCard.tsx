import Image from 'next/image'
import Link from 'next/link'
import type { Publication } from '@/lib/data'

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-white shadow-sm transition hover:border-blue-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <div className="relative h-44 w-full">
        <Image
          src={pub.image}
          alt={pub.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="mb-2 flex items-center gap-1.5 font-body text-[10px] font-bold uppercase tracking-[1.5px] text-blue-brand">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-brand" />
          {pub.outlet}
        </p>
        <h3 className="mb-2 font-heading text-sm font-semibold leading-snug text-ink">
          {pub.title}
        </h3>
        <p className="mb-2 font-body text-[11px] leading-relaxed text-muted line-clamp-3">
          {pub.summary}
        </p>
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
