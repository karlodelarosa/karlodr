<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FEATURED_PROJECTS } from '../data/project'
import EditorialSocialLinks from '../components/EditorialSocialLinks.vue'

const indexItems = FEATURED_PROJECTS.map((project) => ({
  title: project.title,
  url: project.url,
  tag: project.tags[0],
}))
</script>

<template>
  <div class="editorial-page">
    <div class="bg-numeral">26</div>

    <header>
      <div class="brand-col">
        <div class="brand-title">Karlo Dela Rosa / Dev</div>
        <EditorialSocialLinks />
      </div>
      <div class="header-issue">
        SYS_INDEX // VOL. I_MXXVI<br />
        FRONTEND ENGINEERING &amp; UI SYSTEMS
      </div>
    </header>

    <main>
      <div class="hero-statement">
        <h1>
          Engineering<br />
          <span class="serif-alt">fast, intentional</span> product<br />
          interfaces.
        </h1>
      </div>

      <div class="editorial-sidebar">
        <div class="section-tag">Core Directive <span>[01]</span></div>
        <p>
          Frontend developer and lead — wireframes to production, component systems, teams that
          ship. Lately: Lyric Lens, Ministry Lens, ELGC Church.
        </p>

        <div class="editorial-index">
          <a
            v-for="(item, index) in indexItems"
            :key="item.title"
            :href="item.url"
            class="index-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ String(index + 1).padStart(2, '0') }} / {{ item.title }} <span>{{ item.tag }}</span>
          </a>
        </div>
      </div>
    </main>

    <footer>
      <nav class="nav-links">
        <RouterLink to="/experience" class="nav-item">Experience</RouterLink>
        <RouterLink to="/now" class="nav-item">Now</RouterLink>
      </nav>
      <a href="mailto:karlordr@gmail.com" class="cta-button">Get In Touch →</a>
    </footer>
  </div>
</template>

<style scoped>
.editorial-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 64px;
  background-color: #fcfbfa;
  color: #080809;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

@media (max-width: 1023px) {
  .editorial-page {
    min-height: 100vh;
    height: auto;
    overflow: visible;
  }
}

.bg-numeral {
  position: absolute;
  top: -60px;
  left: -20px;
  font-size: 160px;
  font-weight: 900;
  color: #f1f0ec;
  z-index: 0;
  line-height: 1;
  user-select: none;
}

header {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  border-bottom: 3px solid #080809;
  padding-bottom: 24px;
  width: 100%;
  z-index: 10;
  position: relative;
}

@media (min-width: 768px) {
  header {
    grid-template-columns: 6fr 6fr;
    align-items: baseline;
  }
}

.brand-col {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand-title {
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.header-issue {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  text-transform: uppercase;
  color: #64748b;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .header-issue {
    text-align: right;
  }
}

main {
  display: grid;
  grid-template-columns: 1fr;
  margin: auto 0;
  width: 100%;
  max-height: 55vh;
  position: relative;
  z-index: 10;
}

@media (min-width: 1024px) {
  main {
    grid-template-columns: 7fr 5fr;
    align-items: end;
    gap: 96px;
  }
}

.hero-statement {
  position: relative;
}

h1 {
  font-size: clamp(42px, 6.8vw, 92px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

h1 .serif-alt {
  font-family: 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
  font-style: italic;
  font-weight: 300;
  text-transform: lowercase;
  letter-spacing: -0.02em;
}

.editorial-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;
  max-width: 420px;
}

@media (min-width: 1024px) {
  .editorial-sidebar {
    margin-top: 0;
  }
}

.section-tag {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #080809;
  border-bottom: 1px solid #080809;
  padding-bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.section-tag span {
  font-family: ui-monospace, monospace;
  color: #64748b;
}

p {
  font-size: 14px;
  line-height: 1.7;
  color: #334155;
}

.editorial-index {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.index-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  text-decoration: none;
  color: #080809;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 0;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.index-row:hover {
  border-bottom-color: #080809;
  padding-left: 8px;
  color: #64748b;
}

.index-row span {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  font-weight: 400;
  color: #94a3b8;
}

footer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
  width: 100%;
  z-index: 10;
  position: relative;
}

@media (min-width: 768px) {
  footer {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.nav-item {
  font-size: 12px;
  font-weight: 800;
  color: #080809;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #080809;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.cta-button {
  font-size: 12px;
  font-weight: 900;
  color: #fcfbfa;
  background-color: #080809;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 14px 32px;
  width: max-content;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.cta-button:hover {
  background-color: #475569;
  transform: translateY(-2px);
}

@media (max-width: 1023px) {
  main {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .editorial-page {
    padding: 32px;
  }
}
</style>
