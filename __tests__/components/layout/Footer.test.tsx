import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/layout/Footer'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

describe('Footer', () => {
  it('renders logo', () => {
    render(<Footer />)
    expect(screen.getByAltText('Transcarta')).toBeInTheDocument()
  })
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Transcarta/)).toBeInTheDocument()
  })
})
