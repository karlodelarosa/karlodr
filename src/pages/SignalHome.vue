<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { ABOUT_DATA } from '../data/about'
import { EXPERIENCE_DATA } from '../data/experience'
import { FEATURED_PROJECTS } from '../data/project'

const sysClock = ref('00:00:00.000')

const NAV_NODES = [
  { path: '/experience', hash: 'experience', title: 'Engineering History' },
  { path: '/sandbox', hash: 'sandbox', title: 'Technical Sandbox' },
  { path: '/ftreiterations', hash: 'ftreiterations', title: 'Active Iterations' },
  { path: '/environment', hash: 'environment', title: 'Environment Variables' },
] as const

const featuredProjects = FEATURED_PROJECTS

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function formatManilaClock(now: Date) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const timeString = now.toLocaleTimeString('en-US', options)
  const ms = String(now.getMilliseconds()).padStart(3, '0')
  return `${timeString}.${ms}`
}

const { pause: pauseClock } = useIntervalFn(
  () => {
    sysClock.value = formatManilaClock(new Date())
  },
  16,
  { immediate: true }
)

onMounted(() => {
  document.documentElement.classList.add('dark')
})

onUnmounted(() => {
  pauseClock()
})
</script>

<template>
  <div class="signal-page">
    <div class="top-layout">
      <div class="brand-block">
        <h1>Karlo DR</h1>
        <div class="status-badge">
          <div class="status-dot" aria-hidden="true" />
          SYSTEM_ACTIVE
        </div>
      </div>

      <div class="telemetry-card" aria-label="System telemetry">
        <div class="tele-line">Node: <span>MNL // ACTIVE</span></div>
        <div class="tele-line">Coords: <span>14.5995° N, 120.9842° E</span></div>
        <div class="tele-line">
          Time: <span>{{ sysClock }}</span>
          <span class="light-muted"> (Asia/Manila)</span>
        </div>
        <div class="tele-line">Core: <span>Vue // TS // CF Workers</span></div>
      </div>
    </div>

    <main class="directory-links" aria-label="Site sections">
      <a
        v-for="node in NAV_NODES"
        :key="node.hash"
        :href="`#${node.hash}`"
        class="nav-item"
        @click.prevent="scrollTo(node.hash)"
      >
        <span class="nav-title">{{ node.title }}</span>
        <span class="nav-route">{{ node.path }}</span>
      </a>
    </main>

    <section id="experience" class="signal-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" class="section-label">/experience</h2>
      <div class="section-stack">
        <article v-for="item in EXPERIENCE_DATA" :key="item.title" class="section-entry">
          <div class="entry-head">
            <span class="entry-title">{{ item.title }}</span>
            <span class="entry-meta">{{ item.date }}</span>
          </div>
          <span class="entry-sub">{{ item.company }}</span>
          <p class="entry-desc">{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section id="sandbox" class="signal-section" aria-labelledby="sandbox-heading">
      <h2 id="sandbox-heading" class="section-label">/sandbox</h2>
      <div class="section-stack">
        <a
          v-for="project in featuredProjects"
          :key="project.title"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="section-entry section-entry-link"
        >
          <span class="entry-title">{{ project.title }}</span>
          <p class="entry-desc">{{ project.description }}</p>
          <span class="entry-tags">{{ project.tags.join(' · ') }}</span>
        </a>
      </div>
    </section>

    <section id="ftreiterations" class="signal-section" aria-labelledby="ftreiterations-heading">
      <h2 id="ftreiterations-heading" class="section-label">/ftreiterations</h2>
      <article class="section-entry">
        <p class="entry-desc">{{ ABOUT_DATA.main_description }}</p>
        <p class="entry-desc dim">{{ ABOUT_DATA.sub_description1 }}</p>
        <p class="entry-desc dim">{{ ABOUT_DATA.sub_description2 }}</p>
      </article>
    </section>

    <section id="environment" class="signal-section" aria-labelledby="environment-heading">
      <h2 id="environment-heading" class="section-label">/environment</h2>
      <article class="section-entry">
        <div class="env-row">
          <span class="env-key">Host</span>
          <span class="env-val">karlodr.com</span>
        </div>
        <div class="env-row">
          <span class="env-key">Mail Relay</span>
          <a class="env-val accent" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
        </div>
        <div class="env-row">
          <span class="env-key">Theme Switch</span>
          <span class="env-val">Use the floating control ↘</span>
        </div>
      </article>
    </section>

    <div class="star-decal" aria-hidden="true">
      <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
      </svg>
    </div>

    <footer>
      <div>RECON: NOMINAL</div>
      <div class="footer-links">
        <a href="https://github.com/karlodelarosa" target="_blank" rel="noopener noreferrer">
          GITHUB
        </a>
        <a
          href="https://www.linkedin.com/in/karlo-dela-rosa/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINKEDIN
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.signal-page {
  --bg: #000000;
  --surface: #050507;
  --text: #ffffff;
  --text-muted: #55555c;
  --accent-blue: #38bdf8;
  --accent-glow: rgba(56, 189, 248, 0.15);
  --border: #141416;
  --font-main: 'Geist', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  font-family: var(--font-main);
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 5% 2rem;
  position: relative;
  overflow-x: hidden;
}

.top-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  margin-bottom: 6rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.brand-block h1 {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent-blue);
  text-shadow: 0 0 12px var(--accent-glow);
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--accent-blue);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-blue);
}

.telemetry-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  min-width: 460px;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.02),
    0 10px 30px rgba(0, 0, 0, 0.5);
}

.tele-line {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.tele-line span {
  color: #e2e8f0;
}

.tele-line .light-muted {
  color: #888893;
}

.directory-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
  align-self: flex-start;
}

.nav-item {
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  width: fit-content;
}

.nav-title {
  font-size: 2.25rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  border-bottom: 1px solid var(--text);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-route {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  color: #4b5563;
  transition: color 0.2s ease;
}

.nav-item:hover .nav-title {
  color: var(--accent-blue);
  border-color: var(--accent-blue);
}

.nav-item:hover .nav-route {
  color: var(--accent-blue);
}

.signal-section {
  margin-top: 5rem;
  max-width: 700px;
  scroll-margin-top: 2rem;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.section-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-entry {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.section-entry-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease;
}

.section-entry-link:hover {
  border-color: #333;
}

.entry-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.entry-title {
  font-size: 1rem;
  font-weight: 500;
}

.entry-meta,
.entry-sub {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-blue);
}

.entry-sub {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

.entry-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #888893;
  margin-bottom: 0.5rem;
}

.entry-desc:last-child {
  margin-bottom: 0;
}

.entry-desc.dim {
  color: var(--text-muted);
}

.entry-tags {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.env-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
}

.env-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.env-row:first-child {
  padding-top: 0;
}

.env-key {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.env-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #e2e8f0;
}

.env-val.accent {
  color: var(--accent-blue);
  text-decoration: none;
}

.env-val.accent:hover {
  color: #fff;
}

.star-decal {
  position: absolute;
  right: 8%;
  bottom: 15%;
  color: #27272a;
  pointer-events: none;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 6rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #fff;
}

@media (max-width: 900px) {
  .top-layout {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .telemetry-card {
    min-width: 100%;
    padding: 1.25rem;
  }

  .nav-title {
    font-size: 1.75rem;
  }

  .nav-route {
    font-size: 1rem;
  }

  .star-decal {
    display: none;
  }

  footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .entry-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .env-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
