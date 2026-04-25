import { describe, it, expect } from 'vitest'
import { services, publications, affiliations, siteConfig } from '@/lib/data'

describe('services data', () => {
  it('has exactly 4 services', () => {
    expect(services).toHaveLength(4)
  })
  it('each service has id, name, description, bullets, and icon', () => {
    services.forEach(s => {
      expect(s).toHaveProperty('id')
      expect(s).toHaveProperty('name')
      expect(s).toHaveProperty('description')
      expect(s).toHaveProperty('bullets')
      expect(s).toHaveProperty('icon')
    })
  })
})

describe('publications data', () => {
  it('has at least 3 publications', () => {
    expect(publications.length).toBeGreaterThanOrEqual(3)
  })
  it('each publication has outlet, title, topic, and href', () => {
    publications.forEach(p => {
      expect(p).toHaveProperty('outlet')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('topic')
      expect(p).toHaveProperty('href')
    })
  })
})

describe('siteConfig', () => {
  it('has tagline, vision, mission, address, phone', () => {
    expect(siteConfig.tagline).toBeTruthy()
    expect(siteConfig.vision).toBeTruthy()
    expect(siteConfig.mission).toBeTruthy()
    expect(siteConfig.address).toBeTruthy()
    expect(siteConfig.phone).toBeTruthy()
  })
})
