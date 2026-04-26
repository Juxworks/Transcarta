import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { Chip } from '@/components/ui/Chip'
import { Affiliations } from '@/components/home/Affiliations'
import { ContactCTA } from '@/components/home/ContactCTA'
import { siteConfig } from '@/lib/data'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`Est. ${siteConfig.founded} · Singapore`}
        heading="About Transcarta"
        sub="A sustainability consulting firm working at the intersection of climate, capital and communication."
      />

      {/* Our Story */}
      <section className="mx-auto max-w-content px-14 py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mb-4 font-heading text-3xl font-bold text-green-dark">
              Two decades of climate and finance expertise
            </h2>
            <p className="mb-4 font-body text-[15px] leading-7 text-[#374151]">
              Founded in 2002, Transcarta brings together expertise in financial services, sustainability
              and communications. Operating across Asia Pacific and North America, we work with
              organisations seeking to align their capital, communications and culture with a more
              sustainable future.
            </p>
            <p className="font-body text-[15px] leading-7 text-[#374151]">
              Our team has deep roots in banking and financial services — from payments strategy and
              retail banking to investment and startup ecosystems — paired with a long-standing
              commitment to climate action.
            </p>
          </div>
          <ImagePlaceholder label="Office / Team Photo" dimensions="680 × 480px" className="h-[340px]" />
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="bg-[#f9fafb] py-20">
        <div className="mx-auto max-w-content px-14">
          <SectionLabel>Mission & Vision</SectionLabel>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="rounded-md border border-border bg-white p-8">
              <h3 className="mb-3 font-heading text-lg font-semibold text-green-dark">Our Vision</h3>
              <p className="font-body text-[15px] italic leading-7 text-[#374151]">
                &ldquo;{siteConfig.vision}&rdquo;
              </p>
            </div>
            <div className="rounded-md border border-blue-brand/20 bg-blue-tint p-8">
              <h3 className="mb-3 font-heading text-lg font-semibold text-blue-brand">Our Mission</h3>
              <p className="font-body text-[15px] leading-7 text-[#374151]">
                {siteConfig.mission}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Chip variant="green">Climate Action</Chip>
            <Chip variant="blue">Sustainable Finance</Chip>
            <Chip variant="green">ESG Training</Chip>
            <Chip variant="blue">Asia Pacific</Chip>
            <Chip variant="green">Impact Writing</Chip>
          </div>
        </div>
      </div>

      {/* The Team */}
      <section className="mx-auto max-w-content px-14 py-20">
        <SectionLabel>The Team</SectionLabel>
        <h2 className="mb-4 font-heading text-3xl font-bold text-green-dark">
          Collective expertise, shared mission
        </h2>
        <p className="mb-10 max-w-xl font-body text-[15px] leading-7 text-[#374151]">
          Our team brings together experience spanning financial services, sustainability consulting,
          writing and board governance — united by a commitment to a more sustainable world.
        </p>
        <ImagePlaceholder label="Team Photo" dimensions="560 × 400px" className="h-[320px] lg:w-2/3" />
      </section>

      <Affiliations />
      <ContactCTA />
    </>
  )
}
