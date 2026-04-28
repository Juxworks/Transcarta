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
          <figure className="m-0 w-full max-w-[360px]">
            <div className="relative h-[390px] overflow-hidden">
              <Image
                src="/profile-rh.png"
                alt="Richard Hartung, Founder and Principal"
                fill
                className="object-cover object-top"
              />
              <a
                href="https://www.linkedin.com/in/rihartung/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Richard Hartung on LinkedIn"
                className="absolute bottom-4 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] shadow-lg transition hover:bg-[#004182]"
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <figcaption className="mt-2 text-center">
              <p className="font-heading text-base font-semibold text-green-dark">Richard Hartung</p>
              <p className="font-body text-sm text-muted">Managing Director</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
