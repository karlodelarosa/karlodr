export const PROJECT_DATA = [
  {
    name: 'PRODUCT',
    items: [
      {
        title: 'ELGC Church',
        description:
          "Full church website — worship schedule, events, gallery, and contact for Emmanuel's Living Gospel Church",
        thumbnail: '/projects/elgc_thumbnail.svg',
        url: 'https://elgchurch.com/',
        tags: ['Vue', 'Vite', 'Tailwind'],
        featured: true,
      },
      {
        title: 'Lyric Lens',
        description: 'Worship platform with org accounts and lyric presentation tooling',
        thumbnail: '/projects/lyric-lens_thumbnail.svg',
        url: 'https://lyric-lens.karlo-karlo59.workers.dev/',
        tags: ['Vue', 'Cloudflare Workers'],
        featured: true,
      },
      {
        title: 'Ministry Lens',
        description: 'Church management and ministry insights dashboard',
        thumbnail: '/projects/ministry-lens_thumbnail.svg',
        url: 'https://sheepcount.karlo-karlo59.workers.dev/',
        tags: ['Vue', 'Cloudflare Workers'],
        featured: true,
      },
    ],
  },
  {
    name: 'APPS',
    items: [
      {
        title: 'CKOOB',
        description: 'System Health Tracker',
        thumbnail: '/projects/ckoob_thumbnail.png',
        url: 'https://ckoob.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Scribblenotes',
        description: 'Note-taking Application',
        thumbnail: '/projects/scribble_thumbnail.png',
        url: 'https://app-notes-taking.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Info Tracker',
        description: 'Contact tracer',
        thumbnail: '/projects/records_thumbnail.png',
        url: 'https://info-management.vercel.app/',
        tags: ['Vue'],
      },
      {
        title: 'Sprint Board',
        description: 'Project management tool',
        thumbnail: '/projects/pm_thumbnail.png',
        url: 'https://sprint-board.pages.dev/',
        tags: ['Vue'],
      },
      {
        title: 'Cat Browser',
        description: 'Browse cat breeds',
        thumbnail: '/projects/cat_thumbnail.png',
        url: 'https://cat-library.vercel.app/',
        tags: ['Vue'],
      },
    ],
  },
  {
    name: 'WEB DESIGN',
    items: [
      {
        title: 'Gallery Template',
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
