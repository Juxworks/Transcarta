import { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig } from '@/lib/data'
import { MapPin, Phone, ExternalLink } from 'lucide-react'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        heading="Work With Us"
        sub="Whether you need writing, sustainability training, or investment support — we'd love to hear from you."
      />

      <div className="mx-auto max-w-content px-14 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-green-dark">Send a message</h2>
            <ContactForm />
          </div>

          {/* Details */}
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-green-dark">Our details</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Address</p>
                  <p className="font-body text-sm text-muted">{siteConfig.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="font-body text-sm text-blue-brand hover:underline">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-brand" strokeWidth={2} />
                <div>
                  <p className="font-body text-sm font-semibold text-ink">LinkedIn</p>
                  <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-blue-brand hover:underline">
                    Follow Transcarta
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-md border border-border bg-[#f9fafb] p-6">
              <p className="font-body text-sm font-semibold text-ink">Coverage</p>
              <p className="mt-1 font-body text-sm text-muted">{siteConfig.regions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
