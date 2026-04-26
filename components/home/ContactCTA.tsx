import Link from 'next/link'
import { siteConfig } from '@/lib/data'

export function ContactCTA() {
  return (
    <div className="bg-green-dark px-14 py-[70px] text-center">
      <h2 className="mb-3 font-heading text-[30px] font-bold text-white">Ready to work together?</h2>
      <p className="mx-auto mb-7 max-w-md font-body text-[15px] text-white/70">
        Whether you need writing, sustainability training, or investment support &mdash; let&apos;s talk.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-[6px] bg-white px-8 py-3.5 font-heading text-sm font-semibold text-green-dark transition hover:bg-green-mint"
        >
          Get In Touch
        </Link>
        <Link
          href="/services"
          className="rounded-[6px] border-2 border-white/30 px-8 py-3.5 font-heading text-sm font-semibold text-blue-200 transition hover:border-white/60"
        >
          View Services
        </Link>
      </div>
      <p className="mt-5 font-body text-[13px] text-white/40">
        {siteConfig.address} · {siteConfig.phone}
      </p>
    </div>
  )
}
