<script setup lang="ts">
import { FEATURED_PROJECTS } from '../data/project'

const selectedWork = FEATURED_PROJECTS.slice(0, 3)
</script>

<template>
  <div class="minimal-page">
    <header>
      <div class="brand">Karlo Dela Rosa</div>
      <div class="meta">frontend developer</div>
    </header>

    <main>
      <h1>
        I build product UIs that feel fast and intentional — ministry platforms, church sites, and
        SaaS dashboards, from wireframes to production.
      </h1>

      <div class="split-details">
        <div class="col">
          <div class="col-title">Focus Fields</div>
          <p>
            Frontend architecture, component systems, and teams that ship. Lately: Lyric Lens,
            Ministry Lens, ELGC Church.
          </p>
        </div>

        <div class="col">
          <div class="col-title">Selected Work</div>
          <a
            v-for="(project, index) in selectedWork"
            :key="project.title"
            :href="project.url"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ String(index + 1).padStart(2, '0') }} / {{ project.title }} →
          </a>
        </div>
      </div>
    </main>

    <footer>
      <div class="links">
        <a href="https://github.com/karlodelarosa" target="_blank" rel="noopener noreferrer"
          >GitHub</a
        >
        <a
          href="https://www.linkedin.com/in/karlo-dela-rosa/"
          target="_blank"
          rel="noopener noreferrer"
          >LinkedIn</a
        >
      </div>
      <a href="mailto:karlordr@gmail.com" class="action-cta">karlordr@gmail.com</a>
    </footer>
  </div>
</template>

<style scoped>
.minimal-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  padding: 64px;
  background-color: #fafafa;
  color: #111111;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.brand {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.meta {
  font-family: monospace;
  font-size: 11px;
  color: #888888;
}

main {
  max-width: 720px;
  margin: auto 0;
}

h1 {
  font-size: 44px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 48px;
}

.split-details {
  display: flex;
  gap: 80px;
}

.col {
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.col-title {
  font-family: monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888888;
  margin-bottom: 8px;
}

p {
  font-size: 13px;
  line-height: 1.5;
  color: #444444;
}

.project-link {
  font-size: 13px;
  line-height: 1.5;
  color: #111111;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
}

.project-link:hover {
  text-decoration: underline;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  padding-top: 24px;
}

.links {
  display: flex;
  gap: 24px;
}

footer a {
  font-family: monospace;
  font-size: 11px;
  color: #888888;
  text-decoration: none;
  transition: color 0.15s ease;
}

footer a:hover {
  color: #111111;
}

footer a.action-cta {
  color: #111111;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 640px) {
  .minimal-page {
    padding: 32px;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 32px;
  }

  .split-details {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
