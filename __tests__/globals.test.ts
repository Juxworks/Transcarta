import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('brand tokens in globals.css', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf-8')

  it('defines green-primary as #059669', () => {
    expect(css).toContain('--color-green-primary: #059669')
  })

  it('defines blue-brand as #1d4ed8', () => {
    expect(css).toContain('--color-blue-brand: #1d4ed8')
  })

  it('defines font-heading token', () => {
    expect(css).toContain('--font-heading')
  })
})
