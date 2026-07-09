<script setup lang="ts">
import EditorialSocialLinks from './EditorialSocialLinks.vue'

defineProps<{
  numeral: string
  eyebrow: string
  timestamp?: string
}>()
</script>

<template>
  <div class="editorial-page">
    <div class="bg-numeral">{{ numeral }}</div>

    <header>
      <div class="brand-col">
        <RouterLink to="/" class="brand-title">Karlo Dela Rosa / Dev</RouterLink>
        <EditorialSocialLinks />
      </div>
      <div class="header-issue">
        {{ eyebrow }}<br v-if="timestamp" />
        <template v-if="timestamp">{{ timestamp }}</template>
      </div>
    </header>

    <main>
      <div class="hero-statement">
        <h1><slot name="title" /></h1>
        <p v-if="$slots.subtitle" class="subtitle"><slot name="subtitle" /></p>
      </div>

      <div class="editorial-body">
        <slot />
      </div>
    </main>

    <footer>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
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
  gap: 3rem;
  padding: 64px;
  background-color: #fcfbfa;
  color: #080809;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
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
  color: #080809;
  text-decoration: none;
}

.brand-title:hover {
  color: #64748b;
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
  width: 100%;
  z-index: 10;
  position: relative;
  max-width: 900px;
}

.hero-statement {
  margin-bottom: 48px;
}

h1 {
  font-size: clamp(36px, 5.5vw, 64px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

h1 :deep(.serif-alt) {
  font-family: 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
  font-style: italic;
  font-weight: 300;
  text-transform: lowercase;
  letter-spacing: -0.02em;
}

.subtitle {
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.7;
  color: #334155;
  max-width: 480px;
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
  margin-top: auto;
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

@media (max-width: 768px) {
  .editorial-page {
    padding: 32px;
  }
}
</style>
