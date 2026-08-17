<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ALL_PROJECTS } from '../data/project'
import Grain from '../components/signal/Grain.vue'

type Chapter = {
  num: string
  label: string
  image: string
  aspect: string
  position: string
  pull: string
  layout?: 'full' | 'overlay' | 'split' | 'split-reverse' | 'poster'
}

const route = useRoute()

const project = computed(() => ALL_PROJECTS.find((p: any) => p.slug === route.params.slug))

const detail = computed(() => project.value?.detail ?? {})
const chapters = computed<Chapter[]>(() => detail.value.chapters ?? [])
const tags = computed(() => project.value?.tags ?? [])

const type = computed(() => detail.value.type ?? project.value?.group ?? '—')
const year = computed(() => detail.value.year ?? '—')
const client = computed(() => detail.value.client ?? project.value?.title ?? '—')
const stack = computed(() => tags.value[0] ?? '—')
const quote = computed(() => detail.value.quote ?? null)
const intro = computed(() => detail.value.intro ?? project.value?.description ?? '')

const tickerItems = computed(() => {
  if (!project.value) return []
  return [
    project.value.title.toUpperCase(),
    '//',
    stack.value.toUpperCase(),
    '//',
    type.value.toUpperCase(),
    '//',
    'KARLO DELA ROSA',
    '//',
    'WEB APPLICATION',
    '//',
    year.value,
    '//',
  ]
})
const tickerLoop = computed(() => [...tickerItems.value, ...tickerItems.value, ...tickerItems.value])

// cursor-following dot reveal
const hovering = ref(false)
const cursor = ref({ x: 0, y: 0 })

function onPointerMove(e: PointerEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  cursor.value = { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

const maskStyle = computed(() => {
  const mask = `radial-gradient(circle at ${cursor.value.x}px ${cursor.value.y}px, #000 72px, transparent 120px)`
  return { maskImage: mask, WebkitMaskImage: mask }
})

function onChapterImgLoad(e: Event) {
  ;(e.target as HTMLElement).style.opacity = '1'
}
</script>

<template>
  <div
    class="project-detail"
    @pointerenter="hovering = true"
    @pointermove="onPointerMove"
    @pointerleave="hovering = false"
  >
    <Grain />
    <div class="dots" aria-hidden="true" />
    <div class="dots dots--hover" :class="{ 'is-visible': hovering }" :style="maskStyle" aria-hidden="true" />

    <div v-if="!project" class="not-found">
      <p>Project not found.</p>
      <RouterLink to="/">← Back home</RouterLink>
    </div>

    <div v-else class="content">
      <!-- Nav -->
      <nav class="top-nav">
        <RouterLink to="/" class="brand">
          KARLO DELA ROSA <span class="brand-sub">/ DEV</span>
        </RouterLink>
        <div class="nav-links">
          <RouterLink :to="{ path: '/', hash: '#work' }">WORK</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#contact' }">CONTACT</RouterLink>
        </div>
      </nav>

      <!-- Hero -->
      <header class="hero">
        <p class="breadcrumb">
          SELECTED WORK &nbsp;/&nbsp; <span>{{ project.title.toUpperCase() }}</span>
        </p>

        <h1 class="title">
          {{ project.title }}
        </h1>
        <p v-if="quote" class="tagline">{{ quote }}</p>

        <div class="meta-row">
          <div class="meta-item">
            <p class="meta-label">STACK</p>
            <p class="meta-value">{{ stack }}</p>
          </div>
          <div class="meta-item">
            <p class="meta-label">TYPE</p>
            <p class="meta-value">{{ type }}</p>
          </div>
          <div class="meta-item">
            <p class="meta-label">YEAR</p>
            <p class="meta-value">{{ year }}</p>
          </div>
          <div class="meta-item">
            <p class="meta-label">CLIENT</p>
            <p class="meta-value">{{ client }}</p>
          </div>
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="visit-link visit-link--hero">
            VISIT LIVE SITE
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M2.5 7.5h10M8.5 3.5l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </header>

      <!-- Ticker -->
      <div class="ticker">
        <div class="ticker-track">
          <span v-for="(t, i) in tickerLoop" :key="i" class="ticker-item" :class="{ 'ticker-item--dot': t === '//' }">
            {{ t }}
          </span>
        </div>
      </div>

      <!-- Intro -->
      <div class="intro">
        <p class="intro-body">{{ intro }}</p>
      </div>

      <!-- Chapters -->
      <div v-if="chapters.length" class="chapter-rule" />
      <div class="chapters">
        <section
          v-for="c in chapters"
          :key="c.num"
          class="chapter"
          :class="`chapter--${c.layout || 'full'}`"
        >
          <!-- full: label/pull above, image full-width below -->
          <template v-if="(c.layout || 'full') === 'full'">
            <div class="chapter-head">
              <span class="chapter-eyebrow">{{ c.num }} — {{ c.label.toUpperCase() }}</span>
              <span class="chapter-pull">{{ c.pull }}</span>
            </div>
            <div class="chapter-media" :style="{ aspectRatio: c.aspect }">
              <img :src="c.image" :alt="c.label" :style="{ objectPosition: c.position }" @load="onChapterImgLoad" />
            </div>
          </template>

          <!-- overlay: text sits on top of the image itself -->
          <template v-else-if="c.layout === 'overlay'">
            <div class="chapter-overlay-media" :style="{ aspectRatio: c.aspect }">
              <img :src="c.image" :alt="c.label" :style="{ objectPosition: c.position }" @load="onChapterImgLoad" />
              <div class="chapter-overlay-veil" aria-hidden="true" />
              <span class="chapter-overlay-num" aria-hidden="true">{{ c.num }}</span>
              <div class="chapter-overlay-content">
                <span class="chapter-eyebrow chapter-eyebrow--light">{{ c.num }} — {{ c.label.toUpperCase() }}</span>
                <p class="chapter-overlay-pull">{{ c.pull }}</p>
              </div>
            </div>
          </template>

          <!-- split / split-reverse: image beside a large pull-quote -->
          <template v-else-if="c.layout === 'split' || c.layout === 'split-reverse'">
            <div class="chapter-split" :class="{ 'chapter-split--reverse': c.layout === 'split-reverse' }">
              <div class="chapter-split-media" :style="{ aspectRatio: c.aspect }">
                <img :src="c.image" :alt="c.label" :style="{ objectPosition: c.position }" @load="onChapterImgLoad" />
              </div>
              <div class="chapter-split-text">
                <span class="chapter-eyebrow">{{ c.num }} — {{ c.label.toUpperCase() }}</span>
                <p class="chapter-split-pull">{{ c.pull }}</p>
              </div>
            </div>
          </template>

          <!-- poster: full-width image, veil across the whole frame, text centered on top -->
          <template v-else-if="c.layout === 'poster'">
            <div class="chapter-poster-media" :style="{ aspectRatio: c.aspect }">
              <img :src="c.image" :alt="c.label" :style="{ objectPosition: c.position }" @load="onChapterImgLoad" />
              <div class="chapter-poster-veil" aria-hidden="true" />
              <div class="chapter-poster-content">
                <span class="chapter-eyebrow chapter-eyebrow--light">{{ c.num }} — {{ c.label.toUpperCase() }}</span>
                <p class="chapter-poster-pull">{{ c.pull }}</p>
              </div>
            </div>
          </template>
        </section>
      </div>

      <!-- Closing -->
      <div class="closing">
        <h2 class="closing-title">
          BUILT TO<br />
          <em>matter.</em>
        </h2>
        <div class="closing-row">
          <p class="closing-body">
            Every screen, every state, every interaction — designed with the people using it in mind.
          </p>
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="visit-link visit-link--closing">
            VISIT LIVE SITE
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9h12M10 5l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <footer class="detail-footer">
        <span>© {{ new Date().getFullYear() }} KARLO DELA ROSA</span>
        <RouterLink to="/">↑ ALL PROJECTS</RouterLink>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.project-detail {
  --void: #08090c;
  --panel-edge: #23262d;
  --fog: #8a8d98;
  --signal: #f2f3f7;
  --interference: #ff2d6a;
  --carrier: #2de6c8;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Unbounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
  --ease-tune: cubic-bezier(0.16, 1, 0.3, 1);
  background: var(--void);
  color: var(--signal);
  min-height: 100vh;
  position: relative;
}

.dots {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(circle at center, rgba(45, 230, 200, 0.22) 1.2px, transparent 1.4px);
  background-size: 18px 18px;
}

.dots--hover {
  background-image: radial-gradient(circle at center, rgba(45, 230, 200, 0.32) 2.2px, transparent 2.4px);
  opacity: 0;
  transition: opacity 0.15s;
}

.dots--hover.is-visible {
  opacity: 1;
}

.content {
  position: relative;
  z-index: 1;
}

.not-found {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: var(--font-sans);
  color: var(--fog);
}

.not-found a {
  color: var(--carrier);
  text-decoration: none;
  font-weight: 600;
}

/* nav */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
  border-bottom: 1px solid var(--panel-edge);
}

@media (max-width: 640px) {
  .top-nav {
    padding: 1.25rem 1.5rem;
  }
}

.brand {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--signal);
  text-decoration: none;
  transition: color 0.3s var(--ease-tune);
}

.brand:hover {
  color: var(--carrier);
}

.brand-sub {
  color: var(--fog);
  font-weight: 400;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--fog);
  text-decoration: none;
  transition: color 0.3s var(--ease-tune);
}

.nav-links a:hover {
  color: var(--carrier);
}

/* hero */
.hero {
  padding: 5rem 2.5rem 4rem;
}

@media (max-width: 640px) {
  .hero {
    padding: 3.5rem 1.5rem 3rem;
  }
}

.breadcrumb {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--fog);
  margin-bottom: 2rem;
}

.breadcrumb span {
  color: var(--signal);
}

.title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 12vw, 9rem);
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: var(--signal);
  margin: 0 0 1.25rem 0;
  text-transform: capitalize;
}

.tagline {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--carrier);
  margin-bottom: 2.5rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 2.5rem;
  border-top: 1px solid var(--panel-edge);
  padding-top: 1.5rem;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  color: var(--fog);
  margin-bottom: 0.25rem;
}

.meta-value {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--signal);
}

.visit-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--carrier);
  text-decoration: none;
  transition: gap 0.2s, color 0.3s var(--ease-tune);
}

.visit-link:hover {
  gap: 0.75rem;
  color: var(--interference);
}

.visit-link--hero {
  margin-left: auto;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
}

.visit-link--closing {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
}

/* ticker */
.ticker {
  overflow: hidden;
  padding: 0.75rem 0;
  border-top: 1px solid var(--panel-edge);
  border-bottom: 1px solid var(--panel-edge);
}

.ticker-track {
  display: flex;
  gap: 2.5rem;
  width: max-content;
  animation: ticker 32s linear infinite;
}

@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.333%);
  }
}

.ticker-item {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--fog);
  white-space: nowrap;
}

.ticker-item--dot {
  color: var(--carrier);
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}

/* intro */
.intro {
  padding: 4rem 2.5rem 1rem;
}

@media (max-width: 640px) {
  .intro {
    padding: 3rem 1.5rem 1rem;
  }
}

.intro-body {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--fog);
  max-width: 40rem;
}

.chapter-rule {
  margin: 2rem 2.5rem 0;
  border-top: 1px solid var(--panel-edge);
}

/* chapters */
.chapters {
  padding: 0 2.5rem;
}

@media (max-width: 640px) {
  .chapters {
    padding: 0 1.5rem;
  }
}

.chapter {
  padding: 4rem 0 1rem;
}

.chapter-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.chapter-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--carrier);
}

.chapter-pull {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--fog);
}

.chapter-media {
  position: relative;
  width: 100%;
  background: var(--void);
  overflow: hidden;
}

.chapter-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease;
}

/* overlay layout */
.chapter-overlay-media {
  position: relative;
  width: 100%;
  background: var(--void);
  overflow: hidden;
}

.chapter-overlay-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.chapter-overlay-media:hover img {
  transform: scale(1.035);
}

.chapter-overlay-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.25) 45%, transparent 75%);
}

.chapter-overlay-num {
  position: absolute;
  top: clamp(16px, 3vw, 32px);
  right: clamp(20px, 3vw, 32px);
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.14);
  pointer-events: none;
}

.chapter-overlay-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(24px, 4vw, 48px);
}

.chapter-eyebrow--light {
  color: var(--carrier);
}

.chapter-overlay-pull {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  line-height: 1.4;
  color: #fff;
  max-width: 32rem;
}

/* split / split-reverse layout */
.chapter-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
  align-items: center;
}

@media (min-width: 768px) {
  .chapter-split {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
  }

  .chapter-split-media {
    order: 1;
  }

  .chapter-split-text {
    order: 2;
  }

  .chapter-split--reverse .chapter-split-media {
    order: 2;
  }

  .chapter-split--reverse .chapter-split-text {
    order: 1;
  }
}

.chapter-split-media {
  position: relative;
  width: 100%;
  background: var(--void);
  overflow: hidden;
}

.chapter-split-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.chapter-split-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chapter-split-pull {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.3rem, 3.5vw, 2rem);
  line-height: 1.35;
  color: var(--signal);
}

/* poster layout */
.chapter-poster-media {
  position: relative;
  width: 100%;
  background: var(--void);
  overflow: hidden;
}

.chapter-poster-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.chapter-poster-media:hover img {
  transform: scale(1.035);
}

.chapter-poster-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.32) 45%, rgba(0, 0, 0, 0.62) 100%);
}

.chapter-poster-content {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  max-width: 44rem;
  padding: 0 clamp(20px, 6vw, 80px);
  text-align: center;
}

.chapter-poster-pull {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  line-height: 1.3;
  color: #fff;
}

/* closing */
.closing {
  padding: 6rem 2.5rem 5rem;
  border-top: 1px solid var(--panel-edge);
  margin-top: 4rem;
}

@media (max-width: 640px) {
  .closing {
    padding: 4rem 1.5rem 3rem;
  }
}

.closing-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.5rem, 8vw, 7rem);
  line-height: 0.92;
  letter-spacing: -0.01em;
  color: var(--signal);
  margin-bottom: 2.5rem;
}

.closing-title em {
  font-family: var(--font-display);
  font-weight: 800;
  font-style: normal;
  color: var(--carrier);
}

.closing-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.closing-body {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--fog);
  line-height: 1.7;
  max-width: 28rem;
}

/* footer */
.detail-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-top: 1px solid var(--panel-edge);
}

@media (max-width: 640px) {
  .detail-footer {
    padding: 1.5rem;
  }
}

.detail-footer span {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  color: var(--fog);
}

.detail-footer a {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--carrier);
  text-decoration: none;
  transition: color 0.3s var(--ease-tune);
}

.detail-footer a:hover {
  color: var(--interference);
}
</style>
