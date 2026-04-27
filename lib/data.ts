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
  image: string
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
    image: '/services_writing.png',
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
    image: '/services_investments.png',
  },
  {
    id: 'training',
    name: 'Sustainability Training',
    description:
      'Environmental sustainability education using Climate Desk and Deep Time Walk methodologies — for organisations, teams and individuals looking to take meaningful action on climate.',
    bullets: [
      'Climate Desk workshops',
      'Deep Time Walk sessions',
      'Briefings on environmental sustainability',
      'Individual climate action facilitation',
    ],
    icon: 'users',
    imageDimensions: '700 × 480px',
    image: '/services_training.png',
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
    image: '/services_board.png',
  },
]

export type Publication = {
  id: string
  outlet: string
  title: string
  summary: string
  topic: string
  year: string
  href: string
  image: string
}

export const publications: Publication[] = [
  {
    id: 'pub-1',
    outlet: 'Impact Entrepreneur',
    title: 'Electrifying Everything: A Strategic Pathway to Decarbonization and Cost Efficiency',
    summary:
      'This article explores the critical role of electrification in achieving net-zero emissions, highlighting that transitioning from fossil fuels to electricity is essential for both environmental sustainability and long-term cost savings.',
    topic: 'Climate & Energy',
    year: '2024',
    href: '#',
    image: '/publication-electrify.webp',
  },
  {
    id: 'pub-2',
    outlet: 'Impact Entrepreneur',
    title: 'Start-ups Battle Bugs to Help Farmers in Southeast Asia',
    summary:
      'Climate change is exacerbating agricultural challenges in Southeast Asia by increasing droughts, shifting temperatures, and enabling invasive pests like the Fall Armyworm to thrive. Farmers are moving away from traditional pest scouting toward innovative, technology-driven solutions from regional start-ups.',
    topic: 'Agriculture & Climate',
    year: '2024',
    href: '/insights/startups-battle-bugs',
    image: '/publication-bugs.webp',
  },
  {
    id: 'pub-3',
    outlet: 'The Asian Banker',
    title: 'Payments Go Green Behind the Scenes',
    summary:
      'Financial institutions and payment companies are moving beyond consumer-facing "green" initiatives to address the significant, often overlooked, environmental impact of their back-office operations.',
    topic: 'Payments & Sustainability',
    year: '2024',
    href: '#',
    image: '/publication-payments.webp',
  },
]

export type Affiliation = {
  id: string
  name: string
  role: string
  logo: string
  href: string
  logoScale?: string
}

export const affiliations: Affiliation[] = [
  { id: 'stanford', name: 'Stanford Alumni in Sustainability', role: 'Board Member',            logo: '/logo-stanford.jpeg', href: '#' },
  { id: 'solar',    name: 'Solar Washington',                  role: 'Board Member',            logo: '/logo-sw.jpeg',       href: 'https://www.solarwa.org/' },
  { id: 'dmv',      name: 'Digital Mission Ventures',          role: 'Co-Lead, Investor Group', logo: '/logo-dmv-2.png',       href: 'https://www.digitalmissionventures.com/', logoScale: 'scale-125' },
]

export const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Services',     href: '/services' },
  { label: 'Insights',     href: '/insights' },
  { label: 'Publications', href: '/publications' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

export const insightTopics = ['All', 'Climate', 'Energy', 'Finance', 'Food & Agriculture']

export type SubstackPost = {
  id: string
  title: string
  summary: string
  topic: string
  date: string
  href: string
  image: string
}

export const substackPosts: SubstackPost[] = [
  {
    id: 'ss-1',
    title: 'Concrete that Heals Itself can Fix all those Cracks',
    summary: 'Those cracks you see everywhere in concrete buildings, roads and bridges actually represent a multi-billion-dollar opportunity.',
    topic: 'Climate',
    date: 'April 7, 2026',
    href: 'https://richardhartung.substack.com/p/concrete-that-heals-itself-can-fix',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F82eb6d94-dd88-4933-84f1-508f56361691_6240x4160.jpeg',
  },
  {
    id: 'ss-2',
    title: 'The Dawn of Solar Panel Recycling Startups in Southeast Asia',
    summary: 'New ventures are extracting valuable materials from worn-out solar panels.',
    topic: 'Energy',
    date: 'March 23, 2026',
    href: 'https://richardhartung.substack.com/p/the-dawn-of-solar-panel-recycling',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F601f68a9-f9e0-474d-9462-794bb3cd1395_2312x3083.jpeg',
  },
  {
    id: 'ss-3',
    title: 'Hyperlocal Weather Forecasts – A New Way to Battle Extreme Weather',
    summary: 'Weather disasters are increasingly frequent, the cost in dollars and people\'s lives is huge and Southeast Asia in particular faces high risks.',
    topic: 'Climate',
    date: 'February 10, 2026',
    href: 'https://richardhartung.substack.com/p/hyperlocal-weather-forecasts-a-new',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd3b28013-fb96-47f6-8914-e7f0c8fee9f0_621x421.jpeg',
  },
  {
    id: 'ss-4',
    title: 'Simple Insurance with a Complex Name Boosts Climate Resilience and Investments',
    summary: 'Parametric insurance adds value to climate adaptation efforts.',
    topic: 'Finance',
    date: 'January 13, 2026',
    href: 'https://richardhartung.substack.com/p/simple-insurance-with-a-complex-name',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F118f0813-c044-4c7e-ab49-a6198385c6ff_4620x3080.jpeg',
  },
  {
    id: 'ss-5',
    title: 'Startup Financing Models Can Drive Cheaper Rooftop Solar in Southeast Asia',
    summary: 'Financing innovation addresses affordability barriers for homeowners.',
    topic: 'Finance',
    date: 'December 29, 2025',
    href: 'https://richardhartung.substack.com/p/startup-financing-models-can-drive',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F95a76139-c9ad-4525-a424-d8e6ceef9803_724x483.jpeg',
  },
  {
    id: 'ss-6',
    title: 'Innovative Financing helps Smallholder Farmers Earn More and Become Eco-friendly',
    summary: 'Angel investors and farmers can both benefit tremendously.',
    topic: 'Finance',
    date: 'December 18, 2025',
    href: 'https://richardhartung.substack.com/p/innovative-financing-helps-smallholder',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdb6fc3a0-bbe1-4e1c-8c91-2cb10fe4a53a_3373x4492.jpeg',
  },
  {
    id: 'ss-7',
    title: 'Solar Can Power Rural Southeast Asia Equitably and Sustainably',
    summary: 'Millions lack reliable electricity access in the region.',
    topic: 'Energy',
    date: 'October 21, 2025',
    href: 'https://richardhartung.substack.com/p/solar-can-power-rural-southeast-asia',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff17fb517-744d-463e-8b99-4256e612846c_8064x4536.jpeg',
  },
  {
    id: 'ss-8',
    title: 'Wind Power can Push Southeast Asia Forward',
    summary: 'There is tremendous potential for wind energy beyond the region\'s focus on solar.',
    topic: 'Energy',
    date: 'October 15, 2025',
    href: 'https://richardhartung.substack.com/p/wind-power-can-push-southeast-asia',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d78fe65-d4e3-4b15-80d6-337181a64a5c_600x399.jpeg',
  },
  {
    id: 'ss-9',
    title: 'Innovation Cuts Waste and Emissions from Building Demolition or Renovation',
    summary: 'Construction sites generate substantial waste requiring innovative solutions.',
    topic: 'Climate',
    date: 'September 3, 2025',
    href: 'https://richardhartung.substack.com/p/innovation-cuts-waste-and-emissions',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb7a3673e-7b55-4944-9a55-8d450bafc6aa_5141x2781.jpeg',
  },
  {
    id: 'ss-10',
    title: 'Innovation in Solar Energy Drives Performance and Benefits Upward',
    summary: 'Solar represents the leading new energy source in many locations.',
    topic: 'Energy',
    date: 'August 9, 2025',
    href: 'https://richardhartung.substack.com/p/innovation-in-solar-energy-drives',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6f9ef3d7-f8b8-4d14-91c1-fcbc8dead946_1000x667.png',
  },
  {
    id: 'ss-11',
    title: 'Digital Devices cause Massive Emissions. You can Easily Reduce the Damage.',
    summary: 'Simple changes can mitigate the environmental harm caused by everyday digital device use.',
    topic: 'Climate',
    date: 'July 6, 2025',
    href: 'https://richardhartung.substack.com/p/digital-devices-cause-massive-emissions',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9bdd7eef-84b3-412f-8238-133094b14451_5753x4315.jpeg',
  },
  {
    id: 'ss-12',
    title: 'Manufacturing Food has a Huge Climate Impact. Solutions are on the Way.',
    summary: 'Food production processes carry significant environmental consequences.',
    topic: 'Food & Agriculture',
    date: 'June 30, 2025',
    href: 'https://richardhartung.substack.com/p/manufacturing-food-has-a-huge-climate',
    image: 'https://substackcdn.com/image/fetch/w_1200,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7400a5be-2c2a-4c8d-a42c-27dc674985c8_6602x4401.jpeg',
  },
]
export const publicationOutlets = ['All', 'Impact Entrepreneur', 'The Asian Banker', 'Today']
