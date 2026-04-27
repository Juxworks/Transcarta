'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/data'
import { MobileMenu } from './MobileMenu'

export function Nav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 h-[72px] w-full border-b-2 border-blue-brand bg-white shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-14">
        <Link href="/" aria-label="Transcarta home">
          <Image src="/logo.png" alt="Transcarta" width={160} height={47} priority />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  active ? 'font-semibold text-blue-brand' : 'text-ink hover:text-blue-brand'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-[6px] bg-green-primary px-5 py-2.5 font-heading text-xs font-semibold text-white transition hover:bg-green-dark md:block"
          >
            Work With Us
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
