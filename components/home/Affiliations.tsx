import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { affiliations } from '@/lib/data'

export function Affiliations() {
  return (
    <div className="bg-green-mint py-[70px]">
      <div className="mx-auto max-w-content px-14">
        <SectionLabel>Board Affiliations</SectionLabel>
        <h2 className="mb-8 font-heading text-[clamp(24px,3vw,36px)] font-bold leading-tight text-green-dark">
          Organisations We Serve
        </h2>
        <div className="flex flex-wrap gap-5">
          {affiliations.map(aff => (
            <a
              key={aff.id}
              href={aff.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[180px] flex-1 flex-col items-center gap-3 rounded-md border border-emerald-100 border-l-[3px] border-l-blue-brand bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={aff.logo}
                  alt={aff.name}
                  fill
                  className={`object-contain ${aff.logoScale ?? ''}`}
                  sizes="160px"
                />
              </div>
              <p className="text-center font-heading text-[13px] font-semibold text-green-dark">{aff.name}</p>
              <p className="text-center font-body text-[11px] text-muted">{aff.role}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
