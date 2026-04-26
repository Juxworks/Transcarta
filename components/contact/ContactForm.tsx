'use client'
import { useState } from 'react'
import { submitContact } from '@/app/actions/contact'

const serviceOptions = ['Writing', 'Investment Support', 'Sustainability Training', 'Board Service', 'Other']

type Errors = { name?: string; email?: string; message?: string }

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {}
  if (!name.trim())          errors.name = 'Name is required.'
  if (!email.includes('@'))  errors.email = 'Valid email required.'
  if (!message.trim())       errors.message = 'Message is required.'
  return errors
}

export function ContactForm() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors]   = useState<Errors>({})
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(name, email, message)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    const result = await submitContact({ name, email, service, message })
    setStatus(result.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-emerald-200 bg-green-mint p-8 text-center">
        <p className="font-heading text-lg font-semibold text-green-dark">Message sent!</p>
        <p className="mt-2 font-body text-sm text-muted">We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  const fieldCls = 'w-full rounded-[6px] border border-border px-4 py-3 font-body text-sm text-ink transition focus:border-blue-brand focus:outline-none focus:ring-2 focus:ring-blue-brand/20'
  const labelCls = 'mb-1.5 block font-body text-sm font-medium text-ink'
  const errCls   = 'mt-1 font-body text-xs text-red-500'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={labelCls}>Name</label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} className={fieldCls} placeholder="Your name" />
        {errors.name && <p className={errCls}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={fieldCls} placeholder="you@example.com" />
        {errors.email && <p className={errCls}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="service" className={labelCls}>Service Interest</label>
        <select id="service" value={service} onChange={e => setService(e.target.value)} className={fieldCls}>
          <option value="">Select a service&hellip;</option>
          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={fieldCls}
          placeholder="Tell us about your project or enquiry&hellip;"
        />
        {errors.message && <p className={errCls}>{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-[6px] bg-green-primary py-3 font-heading text-sm font-semibold text-white transition hover:bg-green-dark disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
