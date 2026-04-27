'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/data'
import { MobileMenu } from './MobileMenu'

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) { setScrolled(false); return }
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const transparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 z-40 h-[72px] w-full transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'border-b-2 border-blue-brand bg-white/97 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-14">
        {/* Logo — white-inverted on transparent, colour on solid */}
        <Link href="/" aria-label="Transcarta home">
          <Image
            src="/logo.png"
            alt="Transcarta"
            width={160}
            height={47}
            priority
            className={transparent ? 'brightness-0 invert' : ''}
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  transparent
                    ? 'text-white/90 hover:text-white'
                    : active
                    ? 'font-semibold text-blue-brand'
                    : 'text-ink hover:text-blue-brand'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA + mobile */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden rounded-[6px] px-5 py-2.5 font-heading text-xs font-semibold transition md:block ${
              transparent
                ? 'border border-white/60 text-white hover:bg-white/15'
                : 'bg-green-primary text-white hover:bg-green-dark'
            }`}
          >
            Work With Us
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
