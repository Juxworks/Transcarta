import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

describe('ImagePlaceholder', () => {
  it('renders the label', () => {
    render(<ImagePlaceholder label="Team Photo" dimensions="680 × 480px" />)
    expect(screen.getByText('Team Photo')).toBeInTheDocument()
  })

  it('renders the dimensions', () => {
    render(<ImagePlaceholder label="Team Photo" dimensions="680 × 480px" />)
    expect(screen.getByText('680 × 480px')).toBeInTheDocument()
  })

  it('accepts a custom className', () => {
    const { container } = render(
      <ImagePlaceholder label="Test" dimensions="100 × 100px" className="h-40" />
    )
    expect(container.firstChild).toHaveClass('h-40')
  })
})
