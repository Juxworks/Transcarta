import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SectionLabel } from '@/components/ui/SectionLabel'

describe('SectionLabel', () => {
  it('renders children text', () => {
    render(<SectionLabel>Our Mission</SectionLabel>)
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
  })
})
