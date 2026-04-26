import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from '@/components/contact/ContactForm'

vi.mock('@/app/actions/contact', () => ({
  submitContact: vi.fn().mockResolvedValue({ ok: true }),
}))

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })
})
