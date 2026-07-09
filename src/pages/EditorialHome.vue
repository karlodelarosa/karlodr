<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { FEATURED_PROJECTS } from '../data/project'
import EditorialSocialLinks from '../components/EditorialSocialLinks.vue'
import { useManilaClock } from '../composables/useManilaClock'
import { useMagnetic } from '../composables/useMagnetic'

const { time: manilaTime } = useManilaClock()
const { onMagneticMove, onMagneticLeave } = useMagnetic()

const cyclingWords = ['ministry platforms', 'church sites', 'SaaS dashboards', 'internal tools']
const wordIndex = ref(0)
const displayedWord = ref(cyclingWords[0])
const wordFading = ref(false)

let wordTimer: ReturnType<typeof setInterval> | null = null
let fadeTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  wordTimer = setInterval(() => {
    wordFading.value = true
    fadeTimer = setTimeout(() => {
      wordIndex.value = (wordIndex.value + 1) % cyclingWords.length
      displayedWord.value = cyclingWords[wordIndex.value]
      wordFading.value = false
    }, 300)
  }, 3000)
})

onUnmounted(() => {
  if (wordTimer) clearInterval(wordTimer)
  if (fadeTimer) clearTimeout(fadeTimer)
})

const marqueeWords = ['AVAILABLE FOR SELECTED PROJECTS', 'BASED IN MANILA, PH', 'FULL-STACK & UI SYSTEMS', 'OPEN TO COLLABORATE']
const marqueeText = `${Array.from({ length: 6 }, () => marqueeWords.join('  //  ')).join('  //  ')}  //  `

const indexItems = FEATURED_PROJECTS.map((project) => ({
  title: project.title,
  url: project.url,
  tag: project.tags[0],
  thumbnail: project.thumbnail,
}))

const hoverIndex = ref<number | null>(null)
const previewRef = ref<HTMLElement | null>(null)

function onRowEnter(index: number, event: MouseEvent) {
  hoverIndex.value = index
  requestAnimationFrame(() => {
    const el = previewRef.value
    if (el) {
      el.style.left = `${event.clientX}px`
      el.style.top = `${event.clientY}px`
    }
  })
}

function onRowLeave() {
  hoverIndex.value = null
}

function onRowMove(event: MouseEvent) {
  const el = previewRef.value
  if (el) {
    el.style.left = `${event.clientX}px`
    el.style.top = `${event.clientY}px`
  }
}

</script>

<template>
  <div class="editorial-page">
    <div class="bg-numeral">26</div>
    <div class="grain-overlay" aria-hidden="true"></div>

    <header>
      <div class="brand-col">
        <div class="brand-title">Karlo Dela Rosa / Dev</div>
        <EditorialSocialLinks />
      </div>
      <div class="header-issue">
        <span class="live-dot" aria-hidden="true"></span>MNL // {{ manilaTime }}
      </div>
    </header>

    <main>
      <div class="hero-statement">
        <h1>
          <span class="kinetic-line">Engineering</span><br />
          <span class="serif-alt" :class="{ 'is-fading': wordFading }">{{ displayedWord }}</span><br />
          <span class="kinetic-line line-2">systems that ship.</span>
        </h1>
      </div>

      <div class="editorial-sidebar">
        <div class="sidebar-section">
          <div class="section-tag">Core Directive <span>[01]</span></div>
          <p>
            Developer, consultant, and builder. I enjoy turning ideas into thoughtful digital products—from enterprise commerce solutions to mission-driven software that helps <i class="font-semibold">organizations, communities, and churches</i> do their best work.
          </p>
        </div>

        <div class="sidebar-section">
          <div class="section-tag">Selected Work <span>[02]</span></div>
          <div class="editorial-index">
            <a
              v-for="(item, index) in indexItems"
              :key="item.title"
              :href="item.url"
              class="index-row"
              target="_blank"
              rel="noopener noreferrer"
              @mouseenter="onRowEnter(index, $event)"
              @mouseleave="onRowLeave"
              @mousemove="onRowMove"
            >
              {{ String(index + 1).padStart(2, '0') }} / {{ item.title }} <span>{{ item.tag }}</span>
            </a>
          </div>
        </div>
      </div>
    </main>

    <transition name="thumb-fade">
      <div
        v-if="hoverIndex !== null"
        ref="previewRef"
        class="thumb-preview"
        :style="{ backgroundImage: `url(${indexItems[hoverIndex].thumbnail})` }"
      />
    </transition>

    <footer>
      <div class="marquee-strip marquee-float" aria-hidden="true">
        <div class="marquee-track">
          <span class="marquee-content">{{ marqueeText }}</span>
          <span class="marquee-content">{{ marqueeText }}</span>
        </div>
      </div>
      <nav class="nav-links">
        <RouterLink to="/experience" class="nav-item" @mousemove="onMagneticMove($event, 0.4, 10)" @mouseleave="onMagneticLeave">Experience</RouterLink>
        <RouterLink to="/now" class="nav-item" @mousemove="onMagneticMove($event, 0.4, 10)" @mouseleave="onMagneticLeave">Now</RouterLink>
        <RouterLink to="/me" class="nav-item" @mousemove="onMagneticMove($event, 0.4, 10)" @mouseleave="onMagneticLeave">Me</RouterLink>
      </nav>
      <a
        href="mailto:karlordr@gmail.com"
        class="cta-button"
        @mousemove="onMagneticMove($event, 0.3, 14)"
        @mouseleave="onMagneticLeave"
      ><span>Get In Touch →</span></a>
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
  padding: 64px 64px 32px;
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

.grain-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  animation: grain-shift 1s steps(8) infinite;
}

@keyframes grain-shift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-2%, -4%);
  }
  20% {
    transform: translate(-6%, 2%);
  }
  30% {
    transform: translate(4%, -6%);
  }
  40% {
    transform: translate(-2%, 6%);
  }
  50% {
    transform: translate(-6%, 4%);
  }
  60% {
    transform: translate(6%, 0%);
  }
  70% {
    transform: translate(0%, 4%);
  }
  80% {
    transform: translate(-4%, -2%);
  }
  90% {
    transform: translate(4%, 2%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grain-overlay {
    animation: none;
  }
}

.marquee-strip {
  width: calc(100% + 128px);
  margin: 8px -64px 0;
  overflow: hidden;
  background-color: transparent;
  z-index: 10;
  position: relative;
  border: 1px solid #e2e8f0;
}

.marquee-float {
  position: absolute;
  left: -64px;
  right: -64px;
  bottom: 100%;
  width: auto;
  margin: 0 0 8px;
  z-index: 20;
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-left: none;
  border-right: none;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 270s linear infinite;
}

.marquee-strip:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 5px 0;
  font-family: ui-monospace, monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #080809;
  white-space: pre;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .marquee-strip {
    width: calc(100% + 64px);
    margin: 8px -32px 0;
  }

  .marquee-float {
    left: -32px;
    right: -32px;
    width: auto;
    margin: 0 0 8px;
  }
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

.live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: #080809;
  animation: live-pulse 2s ease-in-out infinite;
}

@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.7);
  }
}

@media (prefers-reduced-motion: reduce) {
  .live-dot {
    animation: none;
  }
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
    align-items: center;
    gap: 96px;
  }
}

.hero-statement {
  position: relative;
  max-width: 100%;
  overflow: hidden;
}

h1 {
  font-size: clamp(42px, 6.8vw, 92px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

h1 .serif-alt {
  display: inline-block;
  max-width: 100%;
  font-family: 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
  font-style: italic;
  font-weight: 300;
  text-transform: none;
  letter-spacing: -0.02em;
  white-space: nowrap;
  animation: serif-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.25s;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

@media (max-width: 1023px) {
  h1 .serif-alt {
    font-size: clamp(22px, 5.6vw, 92px);
  }
}

h1 .serif-alt.is-fading {
  opacity: 0;
  transform: translateY(10px);
}

.kinetic-line {
  display: inline-block;
  animation: serif-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  font-weight: bolder;
}

.kinetic-line.line-2 {
  animation-delay: 0.5s;
  font-weight: bolder;
}

@keyframes serif-reveal {
  0% {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.editorial-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 48px;
  max-width: 420px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  display: inline-block;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
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
  position: relative;
  overflow: hidden;
  font-size: 12px;
  font-weight: 900;
  color: #fcfbfa;
  background-color: #080809;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 14px 32px;
  width: max-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.cta-button span {
  position: relative;
  z-index: 1;
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #475569;
  transform: translate(-100%, 100%) rotate(8deg);
  transform-origin: bottom left;
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}

.cta-button:hover::before {
  transform: translate(0, 0) rotate(0deg);
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

.thumb-preview {
  position: fixed;
  z-index: 100;
  width: 240px;
  height: 150px;
  background-color: #f1f0ec;
  background-size: cover;
  background-position: center;
  border-radius: 2px;
  box-shadow: 0 20px 40px rgba(8, 8, 9, 0.18);
  pointer-events: none;
  transform: translate(24px, -50%);
  will-change: left, top;
}

@media (max-width: 1023px) {
  .thumb-preview {
    display: none;
  }
}

.thumb-fade-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.thumb-fade-leave-active {
  transition: opacity 0.2s ease;
}

.thumb-fade-enter-from {
  opacity: 0;
  transform: translate(16px, -50%) scale(0.94);
}

.thumb-fade-leave-to {
  opacity: 0;
}
</style>
