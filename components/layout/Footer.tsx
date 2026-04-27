import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-[#0f172a] px-14 py-9">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-blue-brand" />
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4">
        <Image
          src="/logo.png"
          alt="Transcarta"
          width={150}
          height={44}
          className="opacity-65 brightness-0 invert"
        />
        <nav className="flex flex-wrap gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/45 transition hover:text-blue-mid"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-white/30">© {year} Transcarta. All rights reserved.</p>
      </div>
    </footer>
  )
}
