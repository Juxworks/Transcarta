import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Chip } from '@/components/ui/Chip'
import { siteConfig } from '@/lib/data'

const chips: { label: string; variant: 'green' | 'blue' }[] = [
  { label: 'Climate Action',      variant: 'green' },
  { label: 'Sustainable Finance', variant: 'blue' },
  { label: 'ESG Training',        variant: 'green' },
  { label: 'Asia Pacific',        variant: 'blue' },
  { label: 'Impact Writing',      variant: 'green' },
]

export function Mission() {
  return (
    <section className="mx-auto max-w-content px-14 py-20">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionLabel>Our Mission</SectionLabel>
          <blockquote className="mb-5 border-l-4 border-blue-brand pl-6 font-heading text-xl font-semibold leading-relaxed text-green-dark">
            &ldquo;{siteConfig.vision}&rdquo;
          </blockquote>
          <p className="mb-5 font-body text-[15px] leading-7 text-[#374151]">
            Transcarta focuses on making the world a better and more sustainable place — through
            writing, capital, training and board service across Asia Pacific and North America.
          </p>
          <div>
            {chips.map(c => <Chip key={c.label} variant={c.variant}>{c.label}</Chip>)}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/profile-rh.png"
            alt="Richard Hartung, Founder and Principal"
            width={360}
            height={360}
            className="h-auto w-full max-w-[360px]"
          />
        </div>
      </div>
    </section>
  )
}
