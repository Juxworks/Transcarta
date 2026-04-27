import Image from 'next/image'
import { PenLine, TrendingUp, Users, Building2 } from 'lucide-react'
import type { Service } from '@/lib/data'

const iconMap: Record<Service['icon'], React.ReactNode> = {
  pen:           <PenLine    className="h-6 w-6" strokeWidth={2} />,
  'trending-up': <TrendingUp className="h-6 w-6" strokeWidth={2} />,
  users:         <Users      className="h-6 w-6" strokeWidth={2} />,
  building:      <Building2  className="h-6 w-6" strokeWidth={2} />,
}

type Props = { service: Service; reverse?: boolean }

export function ServiceBlock({ service, reverse = false }: Props) {
  const textCol = (
    <div className="flex flex-col justify-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[10px] bg-blue-tint text-blue-brand">
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
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
      <Image src={service.image} alt={service.name} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  )

  return (
    <div className={`grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-last' : ''}`}>
      {textCol}
      {imageCol}
    </div>
  )
}
