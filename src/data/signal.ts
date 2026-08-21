// Content for the "signal" home page — Karlo Dela Rosa, ported from the
// blur-distort design reference and wired to the site's real project data.

export const profile = {
  name: 'Karlo Dela Rosa',
  role: 'Web Developer',
  location: 'Bulacan, Philippines — remote',
  tagline:
    'I work where signal meets noise: composable commerce, worship tech, and the creative interfaces that bring them to life.',
  bio: [
    'Web developer specializing in composable commerce and CMS platforms, with adaptable expertise across React/Next.js and Vue/Laravel systems. I actively build real-time software tools (Lyric Lens, Ministry Lens) for live events, while currently expanding my skill set into creative engineering.',
  ],
  email: 'karlordr@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/karlodelarosa' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karlo-dela-rosa/' },
    { label: 'Facebook', href: 'https://www.facebook.com/karlodelarosa' },
  ],
}

export const stats = [
  { value: '2017', unit: '', label: 'building on the web since' },
  { value: '5', unit: '', label: 'roles — e-commerce, CMS & real-time' },
  { value: '4', unit: '', label: 'builds shipped for ELGC' },
]

export type Project = {
  id: string
  channel: string
  name: string
  summary: string
  description: string
  stack: string[]
  slug: string
  url: string
  status: 'live' | 'archived' | 'in progress'
  visual: 'mesh' | 'waveform' | 'scan' | 'grid'
}

export const projects: Project[] = [
  {
    id: 'ministry-lens',
    channel: '88.3',
    name: 'Ministry Lens',
    summary: 'SaaS church management system — scheduling, teams, and Sunday operations.',
    description:
      'A multi-tenant platform for churches to run ministry scheduling, teams, and day-to-day operations from one place. Currently in production, with Emmanuel’s Living Gospel Church as its first organization.',
    stack: ['React', 'JavaScript', 'Supabase', 'Cloudflare Workers'],
    slug: 'ministry-lens',
    url: 'https://ministrylens.elgchurch.com/',
    status: 'live',
    visual: 'grid',
  },
  {
    id: 'lyric-lens',
    channel: '94.7',
    name: 'Lyric Lens',
    summary: 'SaaS worship platform for real-time lyrics and service lineups.',
    description:
      'A multi-org worship platform for cueing songs and running live lyric presentations during service. Any church can spin up an organization; ELGC is the first live user.',
    stack: ['React', 'JavaScript', 'Supabase', 'Cloudflare Workers'],
    slug: 'lyric-lens',
    url: 'https://lyriclens.elgchurch.com/',
    status: 'live',
    visual: 'waveform',
  },
  {
    id: 'music-playground',
    channel: '101.5',
    name: 'Music Playground',
    summary: 'Gamified music-theory trainer — note recognition, ear training, chords.',
    description:
      'A browser-based music playground with XP-gated modes (Find the Note, Echo Mode, Memory Mode, Chord Builder, Ear Training), built to make basic music theory click one note at a time.',
    stack: ['Vue'],
    slug: 'music-playground',
    url: 'https://music-playground.pages.dev/',
    status: 'live',
    visual: 'scan',
  },
  {
    id: 'elgc-church',
    channel: '107.1',
    name: 'Emmanuel’s Living Gospel Church',
    summary: 'Church website — gatherings, life groups, and events for ELGC.',
    description:
      'The public home for ELGC in Caloocan: service times, life-group fellowships, upcoming events, and a way for new visitors to find their way in the door.',
    stack: ['Vue', 'Vite', 'Tailwind'],
    slug: 'elgc-church',
    url: 'https://elgchurch.com/',
    status: 'live',
    visual: 'mesh',
  },
]

export type SkillGroup = {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'JavaScript'] },
  { label: 'Backend', items: ['PHP', 'Laravel', 'Node.js', 'MySQL'] },
  { label: 'Platforms', items: ['Sanity', 'Contentful', 'Stripe', 'Commercetools', 'Google Cloud', 'CI/CD'] },
  { label: 'Practice', items: ['Composable Commerce', 'WebRTC', 'Creative Engineering'] },
  { label: '3D & Motion', items: ['Three.js', 'WebGL', 'GSAP', 'Blender', 'Higgsfield'] },
  { label: 'AI & Automation', items: ['Claude (Script Automation)', 'Cursor', 'Copilot', 'ChatGPT', 'Gemini'] },
]

export type LogEntry = {
  period: string
  org: string
  role: string
  stack: string[]
  notes: string[]
}

export const log: LogEntry[] = [
  {
    period: 'Present',
    org: 'Composable Commerce',
    role: 'Senior Web Developer',
    stack: ['React', 'Next.js', 'JavaScript', 'E-commerce', 'CMS'],
    notes: ['Build composable storefronts by wiring React/Next.js frontends to headless commerce backends, leveraging AI helper tools to rapidly debug and resolve system errors'],
  },
  {
    period: '2021 — 2023',
    org: 'B2B Software',
    role: 'Lead Developer',
    stack: ['Vue', 'PHP', 'Laravel', 'Node.js', 'CI/CD', 'Google Cloud', 'MySQL'],
    notes: ["Led a dev team building B2B software. Drove technical planning, established code review standards, and implemented a CI/CD pipeline that streamlined deployments"],
  },
  {
    period: '2020 — 2021',
    org: 'Agency / CMS Solutions',
    role: 'Frontend Developer',
    stack: ['HubSpot', 'WordPress', 'Node.js', 'JavaScript'],
    notes: ['Engineered custom marketing sites and reusable component libraries on HubSpot and WordPress, accelerating project delivery for multiple agency clients'],
  },
  {
    period: '2018 — 2020',
    org: 'Real-Time Communications',
    role: 'Senior Web Developer',
    stack: ['WebRTC', 'JavaScript', 'Vue'],
    notes: ["Built full-stack features for a real-time WebRTC platform and mentored junior developers to level up the team's Vue and JavaScript standards"],
  },
  {
    period: '2017 — 2018',
    org: 'ESL Platform',
    role: 'Web Developer',
    stack: ['PHP', 'Laravel', 'MySQL'],
    notes: ['Built and maintained end-to-end features for a high-traffic ESL learning platform using PHP and Laravel'],
  },
]
