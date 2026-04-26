import { Hero } from '@/components/home/Hero'
import { ServicesStrip } from '@/components/home/ServicesStrip'
import { Mission } from '@/components/home/Mission'
import { PublicationsPreview } from '@/components/home/PublicationsPreview'
import { Affiliations } from '@/components/home/Affiliations'
import { ContactCTA } from '@/components/home/ContactCTA'

export const metadata = {
  title: 'Transcarta — Writing, Coaching, Training & Board Service for Climate',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Mission />
      <PublicationsPreview />
      <Affiliations />
      <ContactCTA />
    </>
  )
}
