import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesStrip } from '@/components/home/ServicesStrip'

vi.mock('next/link', () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }))

describe('ServicesStrip', () => {
  it('renders all 4 service names', () => {
    render(<ServicesStrip />)
    expect(screen.getByText('Freelance Writing')).toBeInTheDocument()
    expect(screen.getByText('Investment Support')).toBeInTheDocument()
    expect(screen.getByText('Sustainability Training')).toBeInTheDocument()
    expect(screen.getByText('Board Service')).toBeInTheDocument()
  })

  it('renders Learn more links', () => {
    render(<ServicesStrip />)
    expect(screen.getAllByText(/Learn more/i).length).toBe(4)
  })
})
