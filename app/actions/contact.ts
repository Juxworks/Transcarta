'use server'

export type ContactFormData = {
  name: string
  email: string
  service: string
  message: string
}

export type ContactResult = { ok: true } | { ok: false; error: string }

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  if (!data.name.trim())        return { ok: false, error: 'Name is required.' }
  if (!data.email.includes('@')) return { ok: false, error: 'Valid email required.' }
  if (!data.message.trim())     return { ok: false, error: 'Message is required.' }

  // TODO: connect to email service (e.g. Resend, SendGrid, or SMTP)
  console.log('[Contact form submission]', data)
  return { ok: true }
}
