import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Nav } from '@/components/layout/Nav'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))
vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))
vi.mock('@/components/layout/MobileMenu', () => ({
  MobileMenu: () => <div data-testid="mobile-menu" />,
}))

describe('Nav', () => {
  it('renders the Transcarta logo alt text', () => {
    render(<Nav />)
    expect(screen.getByAltText('Transcarta')).toBeInTheDocument()
  })
  it('renders all navigation links', () => {
    render(<Nav />)
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Publications').length).toBeGreaterThan(0)
  })
  it('renders Work With Us CTA', () => {
    render(<Nav />)
    expect(screen.getAllByText('Work With Us').length).toBeGreaterThan(0)
  })
})
