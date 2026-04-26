import Link from 'next/link'
import { PenLine, TrendingUp, Users, Building2 } from 'lucide-react'
import { services } from '@/lib/data'
import type { Service } from '@/lib/data'

const iconMap: Record<Service['icon'], React.ReactNode> = {
  pen:           <PenLine    className="h-[18px] w-[18px]" strokeWidth={2} />,
  'trending-up': <TrendingUp className="h-[18px] w-[18px]" strokeWidth={2} />,
  users:         <Users      className="h-[18px] w-[18px]" strokeWidth={2} />,
  building:      <Building2  className="h-[18px] w-[18px]" strokeWidth={2} />,
}

export function ServicesStrip() {
  return (
    <div className="grid grid-cols-1 border-t-[3px] border-blue-brand bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] sm:grid-cols-2 lg:grid-cols-4">
      {services.map((svc, i) => (
        <div
          key={svc.id}
          className={`px-7 py-8 ${i < services.length - 1 ? 'border-b border-border lg:border-b-0 lg:border-r' : ''}`}
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[6px] bg-blue-tint text-blue-brand">
            {iconMap[svc.icon]}
          </div>
          <h3 className="mb-1.5 font-heading text-sm font-semibold text-green-dark">{svc.name}</h3>
          <p className="mb-2.5 font-body text-xs leading-relaxed text-muted">
            {svc.description.split('—')[0].trim()}
          </p>
          <Link href={`/services#${svc.id}`} className="font-body text-[11px] font-semibold text-blue-brand hover:underline">
            Learn more →
          </Link>
        </div>
      ))}
    </div>
  )
}
