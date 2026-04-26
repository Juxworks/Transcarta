import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceBlock } from '@/components/shared/ServiceBlock'
import { ContactCTA } from '@/components/home/ContactCTA'
import { services } from '@/lib/data'

export const metadata: Metadata = { title: 'Services' }

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What We Do"
        heading="Our Services"
        sub="Four areas where Transcarta makes an impact — for clients across Asia Pacific and North America."
      />
      <div className="mx-auto max-w-content divide-y divide-border px-14">
        {services.map((svc, i) => (
          <ServiceBlock key={svc.id} service={svc} reverse={i % 2 !== 0} />
        ))}
      </div>
      <ContactCTA />
    </>
  )
}
