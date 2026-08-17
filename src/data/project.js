export const PROJECT_DATA = [
  {
    name: 'PRODUCT',
    items: [
      {
        title: 'ELGC Church',
        slug: 'elgc-church',
        description:
          "Full church website — worship schedule, events, gallery, and contact for Emmanuel's Living Gospel Church",
        thumbnail: '/elgchurch.png',
        url: 'https://elgchurch.com/',
        tags: ['Vue', 'Vite', 'Tailwind'],
        featured: true,
        detail: {
          type: 'Website',
          year: '2024',
          client: 'ELGC Community',
          quote: '"Built for people who show up every Sunday."',
        },
      },
      {
        title: 'Lyric Lens',
        slug: 'lyric-lens',
        description: 'Worship platform with org accounts and lyric presentation tooling',
        thumbnail: '/lyric-lens.png',
        url: 'https://lyriclens.elgchurch.com/',
        tags: ['React', 'JavaScript', 'Supabase', 'Cloudflare Workers'],
        featured: true,
        detail: {
          type: 'Full-stack Web App',
          year: '2024',
          client: 'Worship Teams',
          quote: '"Built for people who show up every Sunday."',
          intro:
            'A full-stack platform built for worship teams — handling everything from live slide presentation to song management, member access, and leadership analytics. Designed to feel as considered as the community it serves.',
          chapters: [
            {
              num: '01',
              label: 'The Welcome',
              image: '/lyric-lens/ll1.png',
              aspect: '21/9',
              position: 'center 30%',
              pull: 'A living, breathing front door for the congregation.',
              layout: 'overlay',
            },
            {
              num: '02',
              label: 'The Stage',
              image: '/lyric-lens/ll2.png',
              aspect: '4/3',
              position: 'center center',
              pull: 'Slides that belong in the room — not a PowerPoint in a dark theatre.',
              layout: 'split',
            },
            {
              num: '03',
              label: 'The Library',
              image: '/lyric-lens/ll3.png',
              aspect: '21/9',
              position: 'center 40%',
              pull: 'Every song your team has ever needed, exactly when they need it.',
              layout: 'poster',
            },
            {
              num: '04',
              label: 'The Booth',
              image: '/lyric-lens/ll4.png',
              aspect: '21/9',
              position: 'center 35%',
              pull: 'Clean operator view. No fumbling. Just flow.',
              layout: 'split-reverse',
            },
            {
              num: '05',
              label: 'The Overview',
              image: '/lyric-lens/ll5.png',
              aspect: '21/9',
              position: 'center center',
              pull: 'Leadership sees the whole picture — attendance, giving, activity.',
              layout: 'full',
            },
          ],
        },
      },
      {
        title: 'Ministry Lens',
        slug: 'ministry-lens',
        description: 'Church management and ministry insights dashboard',
        thumbnail: '/ministry-lens.png',
        url: 'https://ministrylens.elgchurch.com/',
        tags: ['React', 'JavaScript', 'Supabase', 'Cloudflare Workers'],
        featured: true,
        detail: {
          type: 'Dashboard',
          year: '2024',
          client: 'Church Leadership',
        },
      },
    ],
  },
  {
    name: 'APPS',
    items: [
      {
        title: 'CKOOB',
        slug: 'ckoob',
        description: 'System Health Tracker',
        thumbnail: '/projects/ckoob_thumbnail.png',
        url: 'https://ckoob.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Scribblenotes',
        slug: 'scribblenotes',
        description: 'Note-taking Application',
        thumbnail: '/projects/scribble_thumbnail.png',
        url: 'https://app-notes-taking.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Info Tracker',
        slug: 'info-tracker',
        description: 'Contact tracer',
        thumbnail: '/projects/records_thumbnail.png',
        url: 'https://info-management.vercel.app/',
        tags: ['Vue'],
      },
      {
        title: 'Sprint Board',
        slug: 'sprint-board',
        description: 'Project management tool',
        thumbnail: '/projects/pm_thumbnail.png',
        url: 'https://sprint-board.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Cat Browser',
        slug: 'cat-browser',
        description: 'Browse cat breeds',
        thumbnail: '/projects/cat_thumbnail.png',
        url: 'https://cat-library.vercel.app/',
        tags: ['Vue'],
      },
      {
        title: 'Music Playground',
        slug: 'music-playground',
        description: 'Interactive tool to help musicians learn music',
        thumbnail: '/music-playground.png',
        url: 'https://music-playground.pages.dev/',
        tags: ['Vue'],
        featured: true,
      },
    ],
  },
  {
    name: 'WEB DESIGN',
    items: [
      {
        title: 'Gallery Template',
        slug: 'gallery-template',
        description: 'Good for showing pictures and experience',
        thumbnail: '/projects/gallery_thumbnail.png',
        url: 'https://www.figma.com/proto/Npn3G3yUcCgstJknHGByAL/Gallery-template?type=design&node-id=2-2&t=7E57hKIvpbWFX9Kj-0&scaling=min-zoom&page-id=0%3A1',
        tags: ['Figma'],
      },
    ],
  },
]

export const FEATURED_PROJECTS = PROJECT_DATA.flatMap((group) =>
  group.items.filter((item) => item.featured)
)

export const ALL_PROJECTS = PROJECT_DATA.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.name }))
)
