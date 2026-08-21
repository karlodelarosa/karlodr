<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { profile, skills, log } from '../data/signal'

const CV_PDF_URL = '/karlo-dela-rosa-cv.pdf'

onMounted(() => document.documentElement.classList.add('signal-root'))
onUnmounted(() => document.documentElement.classList.remove('signal-root'))
</script>

<template>
  <div class="cv-page">
    <nav class="cv-nav">
      <RouterLink to="/" class="brand">{{ profile.name }} <span class="brand-sub">/ CV</span></RouterLink>
      <div class="nav-actions">
        <RouterLink to="/" class="nav-link">← Home</RouterLink>
        <a class="download-btn" :href="CV_PDF_URL" download="Karlo-Dela-Rosa-CV.pdf">Download PDF</a>
      </div>
    </nav>

    <main class="cv-sheet">
      <header class="cv-header">
        <p class="tag">CV — for hiring</p>
        <h1 class="cv-name">{{ profile.name }}</h1>
        <p class="cv-role">{{ profile.role }}</p>
        <p class="cv-location">{{ profile.location }}</p>

        <ul class="cv-contact">
          <li><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
          <li v-for="s in profile.socials" :key="s.label">
            <a :href="s.href" target="_blank" rel="noopener noreferrer">{{ s.label }}</a>
          </li>
        </ul>
      </header>

      <section class="cv-section">
        <h2 class="section-heading mono">Summary</h2>
        <div class="summary">
          <p v-for="p in profile.bio" :key="p">{{ p }}</p>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="section-heading mono">Experience</h2>
        <ol class="timeline">
          <li v-for="entry in log" :key="entry.period + entry.org" class="entry">
            <div class="entry-period mono">{{ entry.period }}</div>
            <div class="entry-body">
              <h3 class="entry-role">
                {{ entry.role }} <span class="entry-org">— {{ entry.org }}</span>
              </h3>
              <ul class="entry-notes">
                <li v-for="n in entry.notes" :key="n">{{ n }}</li>
              </ul>
              <ul class="entry-stack">
                <li v-for="s in entry.stack" :key="s" class="mono">{{ s }}</li>
              </ul>
            </div>
          </li>
        </ol>
      </section>

      <section class="cv-section">
        <h2 class="section-heading mono">Skills</h2>
        <div class="skills-grid">
          <div v-for="group in skills" :key="group.label" class="skill-group">
            <p class="group-label mono">{{ group.label }}</p>
            <ul class="chips">
              <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="cv-footer">
        <p>Reach out any time — <a :href="`mailto:${profile.email}`">{{ profile.email }}</a></p>
      </footer>
    </main>
  </div>
</template>

<style>
.cv-page {
  --void: #08090c;
  --panel: #131519;
  --panel-edge: #23262d;
  --fog: #8a8d98;
  --signal: #f2f3f7;
  --interference: #ff2d6a;
  --carrier: #2de6c8;

  --font-display: 'Unbounded', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;

  --edge: 1.5rem;
  --ease-tune: cubic-bezier(0.16, 1, 0.3, 1);

  position: relative;
  min-height: 100vh;
  background: var(--void);
  color: var(--signal);
  font-family: var(--font-body);
}

@media (min-width: 720px) {
  .cv-page {
    --edge: 3rem;
  }
}

.cv-page a {
  color: inherit;
}

.cv-page .mono {
  font-family: var(--font-mono);
}

.cv-page .tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

/* nav */
.cv-nav {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem var(--edge);
  background: rgba(8, 9, 12, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--panel-edge);
}

.brand {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--signal);
}
.brand-sub {
  color: var(--fog);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--fog);
  text-decoration: none;
  transition: color 0.25s var(--ease-tune);
}
.nav-link:hover {
  color: var(--signal);
}

.download-btn {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: var(--void);
  background: var(--carrier);
  border: none;
  padding: 0.6rem 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s var(--ease-tune), transform 0.2s ease-out;
}
.download-btn:hover {
  background: var(--signal);
}
.download-btn:active {
  transform: translateY(1px);
}

/* sheet */
.cv-sheet {
  max-width: 52rem;
  margin-inline: auto;
  padding: clamp(2.5rem, 6vw, 5rem) var(--edge) 6rem;
}

.cv-header {
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--panel-edge);
  margin-bottom: 3rem;
}

.cv-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  line-height: 1.05;
  margin: 0.75rem 0 0.35rem;
  letter-spacing: -0.01em;
}

.cv-role {
  font-size: 1.15rem;
  color: var(--carrier);
  margin: 0;
}

.cv-location {
  margin: 0.35rem 0 0;
  color: var(--fog);
  font-size: 0.92rem;
}

.cv-contact {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}
.cv-contact a {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--signal);
  border-bottom: 1px solid var(--panel-edge);
  padding-bottom: 0.15rem;
  transition: color 0.25s var(--ease-tune), border-color 0.25s var(--ease-tune);
}
.cv-contact a:hover {
  color: var(--carrier);
  border-color: var(--carrier);
}

/* sections */
.cv-section {
  margin-bottom: 3rem;
}

.section-heading {
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fog);
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--panel-edge);
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--fog);
  font-size: 0.98rem;
  max-width: 60ch;
}
.summary p {
  margin: 0;
}

/* experience timeline */
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.entry {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 0.25rem 1.5rem;
  padding-block: 1.5rem;
  border-top: 1px solid var(--panel-edge);
}
.entry:first-child {
  border-top: none;
  padding-top: 0;
}

.entry-period {
  font-size: 0.78rem;
  color: var(--fog);
  padding-top: 0.2rem;
}

.entry-role {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.02rem;
  color: var(--signal);
  margin: 0;
}
.entry-org {
  color: var(--carrier);
  font-weight: 500;
}

.entry-notes {
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: var(--fog);
  max-width: 55ch;
}
.entry-notes li {
  padding-left: 1.1rem;
  position: relative;
  font-size: 0.92rem;
}
.entry-notes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 1px;
  background: var(--interference);
}

.entry-stack {
  list-style: none;
  margin: 0.85rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.entry-stack li {
  font-size: 0.68rem;
  letter-spacing: 0.03em;
  color: var(--fog);
  border: 1px solid var(--panel-edge);
  padding: 0.2rem 0.5rem;
}

/* skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem 2.5rem;
}
@media (max-width: 560px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

.group-label {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--carrier);
  margin: 0 0 0.75rem;
}

.chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
}
.chip {
  font-size: 0.85rem;
  color: var(--signal);
  padding-left: 0.9rem;
  position: relative;
}
.chip::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 1px;
  background: var(--fog);
}

.cv-footer {
  padding-top: 2rem;
  border-top: 1px solid var(--panel-edge);
  color: var(--fog);
  font-size: 0.9rem;
}
.cv-footer a {
  color: var(--carrier);
  text-decoration: none;
}
</style>
