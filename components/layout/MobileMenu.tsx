'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md text-green-dark transition hover:bg-green-mint md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-heading text-sm font-bold tracking-widest text-green-dark">TRANSCARTA</span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md text-green-dark hover:bg-green-mint"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-ink hover:text-blue-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Link
              href="/contact"
              className="block w-full rounded-[6px] bg-green-primary py-3 text-center font-heading text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Work With Us
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
