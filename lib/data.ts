export const siteConfig = {
  tagline:  'Writing, coaching, training & board service for climate.',
  vision:   'A better world with a more sustainable environment and people optimising their potential.',
  mission:  'Make the world a better and more sustainable place',
  address:  '475 River Valley Road, Tanglin, Singapore 248360',
  phone:    '+65 6323 5188',
  founded:  '2002',
  regions:  'Asia Pacific & North America',
  linkedin: 'https://linkedin.com/company/transcarta',
}

export type Service = {
  id: string
  name: string
  description: string
  bullets: string[]
  icon: 'pen' | 'trending-up' | 'users' | 'building'
  imageDimensions: string
}

export const services: Service[] = [
  {
    id: 'writing',
    name: 'Freelance Writing',
    description:
      'Writing for magazines, non-profits and blogs — from in-depth industry articles to copywriting, editing and research for publications and financial services firms.',
    bullets: [
      'Magazine and blog articles',
      'Copywriting and editing',
      'Industry research',
      'Non-profit communications',
    ],
    icon: 'pen',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'investment',
    name: 'Investment Support',
    description:
      'Screening startup investments, co-leading investor groups and coaching founders in sustainability-focused ventures across Asia Pacific.',
    bullets: [
      'Startup investment screening',
      'Co-leading Asia Sustainability Angels',
      'Stanford Angels & Entrepreneurs',
      'Digital Mission Ventures',
      'Founder coaching',
    ],
    icon: 'trending-up',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'training',
    name: 'Sustainability Training',
    description:
      'Environmental sustainability education using Climate Fresk and Deep Time Walk methodologies — for organisations, teams and individuals looking to take meaningful action on climate.',
    bullets: [
      'Climate Fresk workshops',
      'Deep Time Walk sessions',
      'Briefings on environmental sustainability',
      'Individual climate action facilitation',
    ],
    icon: 'users',
    imageDimensions: '700 × 480px',
  },
  {
    id: 'board',
    name: 'Board Service',
    description:
      'Volunteer board positions with non-profit organisations focused on sustainability, clean energy and impact investing.',
    bullets: [
      'Stanford Alumni in Sustainability',
      'Solar Washington',
      'Digital Mission Ventures',
    ],
    icon: 'building',
    imageDimensions: '700 × 480px',
  },
]

export type Publication = {
  id: string
  outlet: string
  title: string
  topic: string
  year: string
  href: string
  imageDimensions: string
}

export const publications: Publication[] = [
  {
    id: 'pub-1',
    outlet: 'Impact Entrepreneur',
    title: 'Article title to be added',
    topic: 'Climate & Finance',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-2',
    outlet: 'The Asian Banker',
    title: 'Article title to be added',
    topic: 'Banking & Sustainability',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-3',
    outlet: 'Today',
    title: 'Article title to be added',
    topic: 'Environment',
    year: '2024',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-4',
    outlet: 'Impact Entrepreneur',
    title: 'Article title to be added',
    topic: 'Climate & Finance',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-5',
    outlet: 'The Asian Banker',
    title: 'Article title to be added',
    topic: 'Banking & Sustainability',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
  {
    id: 'pub-6',
    outlet: 'Today',
    title: 'Article title to be added',
    topic: 'Environment',
    year: '2023',
    href: '#',
    imageDimensions: '760 × 440px',
  },
]

export type Affiliation = {
  id: string
  name: string
  role: string
}

export const affiliations: Affiliation[] = [
  { id: 'stanford', name: 'Stanford Alumni in Sustainability', role: 'Board Member' },
  { id: 'solar',    name: 'Solar Washington',                  role: 'Board Member' },
  { id: 'dmv',      name: 'Digital Mission Ventures',          role: 'Co-Lead, Investor Group' },
]

export const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'About',        href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Contact',      href: '/contact' },
]

export const insightTopics = ['All', 'Climate', 'Finance', 'Training', 'Policy']
export const publicationOutlets = ['All', 'Impact Entrepreneur', 'The Asian Banker', 'Today']
