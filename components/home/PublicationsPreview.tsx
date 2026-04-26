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
