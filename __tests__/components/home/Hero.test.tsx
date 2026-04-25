import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/home/Hero'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('Hero', () => {
  it('renders the tagline', () => {
    render(<Hero />)
    expect(screen.getByText(/Writing, coaching, training/i)).toBeInTheDocument()
  })

  it('renders the mission statement', () => {
    render(<Hero />)
    expect(screen.getByText(/better world/i)).toBeInTheDocument()
  })

  it('renders Work With Us CTA', () => {
    render(<Hero />)
    expect(screen.getByText('Work With Us →')).toBeInTheDocument()
  })

  it('renders the stats', () => {
    render(<Hero />)
    expect(screen.getByText('20+')).toBeInTheDocument()
  })
})
