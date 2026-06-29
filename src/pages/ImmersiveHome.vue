<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import OpenLink from '../components/svg/OpenLink.vue'
import LinkedInWhite from '../components/svg/LinkedInWhite.vue'
import ProjectSection from '../components/ProjectSection.vue'
import WritingSection from '../components/WritingSection.vue'
import { useImmersiveScene } from '../composables/useImmersiveScene'
import { ABOUT_DATA } from '../data/about'
import { EXPERTISE_DATA } from '../data/expertise'
import { EXPERIENCE_DATA } from '../data/experience'
import { STACK_DATA } from '../data/stack'
import { CONTRIBUTION_DATA } from '../data/contribution'

const logo = '/logo.png'
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { setScrollProgress, disturbAt } = useImmersiveScene(canvasRef)
const mouseX = ref(50)
const mouseY = ref(50)
const scrollProgress = ref(0)
const activeChapter = ref(0)
const ripples = ref<{ id: number; x: number; y: number }[]>([])
let rippleId = 0

const chapters = [
  { id: 'top', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

const spotlightStyle = computed(() => ({
  background: `radial-gradient(600px circle at ${mouseX.value}% ${mouseY.value}%, rgba(110, 200, 255, 0.08), transparent 55%)`,
}))

const heroParallax = computed(() => ({
  transform: `translate3d(${(mouseX.value - 50) * 0.04}px, ${scrollProgress.value * -40}px, 0)`,
}))

const subParallax = computed(() => ({
  transform: `translate3d(${(mouseX.value - 50) * -0.02}px, ${scrollProgress.value * -20}px, 0)`,
}))

let rafId = 0

function onPointerMove(e: PointerEvent) {
  mouseX.value = (e.clientX / window.innerWidth) * 100
  mouseY.value = (e.clientY / window.innerHeight) * 100
}

function updateScrollState() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  const progress = max > 0 ? window.scrollY / max : 0
  scrollProgress.value = progress
  setScrollProgress(progress)

  const offset = window.innerHeight * 0.35
  let current = 0
  for (let i = chapters.length - 1; i >= 0; i--) {
    const el = document.getElementById(chapters[i].id)
    if (el && el.getBoundingClientRect().top <= offset) {
      current = i
      break
    }
  }
  activeChapter.value = current
}

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateScrollState)
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest('a, button, input, textarea, select, [role="button"], .theme-switcher, .immersive-chapters')
  )
}

function onPointerDown(e: PointerEvent) {
  if (isInteractiveTarget(e.target)) return
  disturbAt(e.clientX, e.clientY)

  const id = rippleId++
  ripples.value.push({ id, x: e.clientX, y: e.clientY })
  window.setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id)
  }, 900)
}

onMounted(() => {
  document.documentElement.classList.add('dark', 'immersive-snap')
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('scroll', onScroll, { passive: true })
  updateScrollState()
})

onUnmounted(() => {
  document.documentElement.classList.remove('immersive-snap')
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
})

const ACCENTS = ['#6ec8ff', '#46cf98', '#04b6c1', '#8b7cf6', '#ff9f6a']
</script>

<template>
  <main class="immersive-page">
    <canvas ref="canvasRef" class="immersive-canvas" aria-hidden="true" />

    <div
      v-for="ripple in ripples"
      :key="ripple.id"
      class="immersive-click-ripple"
      :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
      aria-hidden="true"
    />

    <div class="immersive-spotlight" :style="spotlightStyle" aria-hidden="true" />
    <div class="immersive-vignette" aria-hidden="true" />

    <nav class="immersive-chapters" aria-label="Page sections">
      <div class="immersive-progress-track" aria-hidden="true">
        <div class="immersive-progress-fill" :style="{ height: `${scrollProgress * 100}%` }" />
      </div>
      <button
        v-for="(chapter, i) in chapters"
        :key="chapter.id"
        type="button"
        class="immersive-chapter-btn"
        :class="{ active: activeChapter === i }"
        :aria-label="`Go to ${chapter.label}`"
        :aria-current="activeChapter === i ? 'true' : undefined"
        @click="scrollTo(chapter.id)"
      >
        <span class="immersive-chapter-dot" />
        <span class="immersive-chapter-label"></span>
      </button>
    </nav>

    <header class="immersive-nav">
      <button type="button" class="immersive-brand" @click="scrollToTop">
        <img :src="logo" alt="Karlo Dela Rosa" class="immersive-brand-logo" />
        <span>karlodr.dev</span>
      </button>
      <a
        class="immersive-nav-link"
        href="https://www.linkedin.com/in/karlo-dela-rosa/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInWhite />
      </a>
    </header>

    <section id="top" class="immersive-hero immersive-snap-chapter">
      <div class="immersive-hero-inner">
        <p
          v-motion
          class="immersive-eyebrow"
          :style="subParallax"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          Frontend Developer · Product UI
        </p>

        <h1
          v-motion
          class="immersive-title"
          :style="heroParallax"
          :initial="{ opacity: 0, y: 60 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1100, delay: 100 } }"
        >
          <span class="immersive-title-line">Crafting</span>
          <span class="immersive-title-line immersive-title-accent">interfaces</span>
          <span class="immersive-title-line">that breathe</span>
        </h1>

        <p
          v-motion
          class="immersive-lead"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 900, delay: 280 } }"
        >
          Ministry platforms, worship tech, and product UI — built with
          <span class="immersive-gradient-text">clean code</span>
          and scroll-worthy detail.
        </p>

        <div
          v-motion
          class="immersive-hero-actions"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 420 } }"
        >
          <button type="button" class="immersive-btn immersive-btn-primary" @click="scrollTo('projects')">
            View work
          </button>
          <button type="button" class="immersive-btn immersive-btn-ghost" @click="scrollTo('contact')">
            Get in touch
          </button>
        </div>

        <!-- <div class="immersive-scroll-hint" aria-hidden="true">
          <span>Scroll to explore · click to disturb</span>
          <div class="immersive-scroll-line" />
        </div> -->
      </div>
    </section>

    <section id="about" class="immersive-section immersive-snap-chapter">
      <div
        v-motion
        class="immersive-panel"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
        :visible-once="true"
      >
        <p class="immersive-section-eyebrow">01 — About</p>
        <h2 class="immersive-section-title">Building products people feel</h2>
        <div class="immersive-about-grid">
          <p>{{ ABOUT_DATA.main_description }}</p>
          <p>{{ ABOUT_DATA.sub_description1 }}</p>
          <p class="immersive-accent-line">{{ ABOUT_DATA.sub_description2 }}</p>
        </div>
      </div>
    </section>

    <section id="expertise" class="immersive-section immersive-snap-chapter">
      <div
        v-motion
        class="immersive-section-head"
        :initial="{ opacity: 0, y: 50 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        :visible-once="true"
      >
        <p class="immersive-section-eyebrow">02 — Expertise</p>
        <h2 class="immersive-section-title">Where I ship the most value</h2>
      </div>

      <div class="immersive-skill-rail">
        <article
          v-for="(expertise, i) in EXPERTISE_DATA"
          :key="expertise.title"
          v-motion
          class="immersive-skill-card"
          :style="{ '--accent': ACCENTS[i % ACCENTS.length] }"
          :initial="{ opacity: 0, x: 40 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 700, delay: i * 70 } }"
          :visible-once="true"
        >
          <span class="immersive-skill-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ expertise.title }}</h3>
          <p>{{ expertise.description }}</p>
        </article>
      </div>
    </section>

    <ProjectSection variant="immersive" />

    <section id="experience" class="immersive-section immersive-snap-chapter">
      <div class="immersive-split">
        <div
          v-motion
          class="immersive-panel immersive-panel--timeline"
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 900 } }"
          :visible-once="true"
        >
          <p class="immersive-section-eyebrow">04 — Experience</p>
          <h2 class="immersive-section-title">The path so far</h2>
          <div class="immersive-timeline">
            <div
              v-for="(experience, i) in EXPERIENCE_DATA"
              :key="`${experience.title}-${experience.date}`"
              class="immersive-timeline-item"
            >
              <span class="immersive-timeline-date">{{ experience.date }}</span>
              <div class="immersive-timeline-body">
                <h3>{{ experience.title }}</h3>
                <p v-if="experience.company" class="immersive-timeline-company">{{ experience.company }}</p>
                <p>{{ experience.description }}</p>
              </div>
              <span v-if="i !== EXPERIENCE_DATA.length - 1" class="immersive-timeline-connector" />
            </div>
          </div>
        </div>

        <div
          v-motion
          class="immersive-panel"
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 900, delay: 120 } }"
          :visible-once="true"
        >
          <p class="immersive-section-eyebrow">Stack &amp; contributions</p>
          <div class="immersive-stack-grid">
            <div v-for="stack in STACK_DATA" :key="stack" class="immersive-stack-chip">
              <img :src="stack" alt="Technology" />
            </div>
          </div>

          <div class="immersive-contribs">
            <article
              v-for="contribution in CONTRIBUTION_DATA"
              :key="contribution.url"
              class="immersive-contrib-card"
            >
              <h3>{{ contribution.title }}</h3>
              <p v-if="contribution.description">{{ contribution.description }}</p>
              <a :href="contribution.url" target="_blank" rel="noopener noreferrer" class="immersive-link">
                <OpenLink class="immersive-link-icon" />
                Open link
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <WritingSection variant="immersive" />

    <footer id="contact" class="immersive-section immersive-section--contact immersive-snap-chapter">
      <article
        v-motion
        class="immersive-contact-panel"
        :initial="{ opacity: 0, y: 60 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
        :visible-once="true"
      >
        <img :src="logo" alt="Karlo Dela Rosa" class="immersive-contact-logo" />
        <p class="immersive-section-eyebrow">06 — Contact</p>
        <h2 class="immersive-section-title">Let's build something immersive</h2>
        <p class="immersive-contact-lead">
          Available for frontend leadership, product engineering, and design-heavy builds.
        </p>

        <div class="immersive-hero-actions">
          <a class="immersive-btn immersive-btn-primary" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
          <a class="immersive-btn immersive-btn-ghost" href="tel:639511945392">+63 951 194 5392</a>
        </div>

        <div class="immersive-socials">
          <a href="https://www.linkedin.com/in/karlo-dela-rosa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com/karlodrr/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://github.com/karlodelarosa" target="_blank" rel="noopener noreferrer">Github</a>
        </div>

        <button type="button" class="immersive-back-top" @click="scrollToTop">↑ Back to top</button>
      </article>
    </footer>
  </main>
</template>

<style scoped>
.immersive-page {
  --bg: transparent;
  --glass: rgba(8, 10, 22, 0.55);
  --glass-border: rgba(110, 200, 255, 0.12);
  --text: #f0f4ff;
  --muted: rgba(240, 244, 255, 0.58);
  --accent-a: #6ec8ff;
  --accent-b: #46cf98;
  --accent-c: #8b7cf6;
  --radius: 20px;

  position: relative;
  z-index: 1;
  min-height: 100vh;
  color: var(--text);
  font-family: montserrat, system-ui, sans-serif;
  overflow-x: clip;
  cursor: crosshair;
}

:global(html.immersive-snap) {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}

.immersive-snap-chapter {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  scroll-margin-top: 0;
}

.immersive-hero.immersive-snap-chapter {
  min-height: 100vh;
}

.immersive-section.immersive-snap-chapter {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.immersive-section--contact.immersive-snap-chapter {
  min-height: 100vh;
}

.immersive-click-ripple {
  position: fixed;
  z-index: 3;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  border: 1px solid rgba(110, 200, 255, 0.7);
  box-shadow:
    0 0 20px rgba(110, 200, 255, 0.45),
    inset 0 0 12px rgba(70, 207, 152, 0.3);
  pointer-events: none;
  animation: immersive-ripple 0.9s ease-out forwards;
}

@keyframes immersive-ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(18);
    opacity: 0;
  }
}

.immersive-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.immersive-spotlight {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transition: background 0.15s ease-out;
}

.immersive-vignette {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(3, 3, 10, 0.65) 100%);
}

.immersive-chapters {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}

.immersive-progress-track {
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

.immersive-progress-fill {
  width: 100%;
  background: linear-gradient(to bottom, var(--accent-a), var(--accent-b));
  border-radius: 2px;
  transition: height 0.12s ease-out;
}

.immersive-chapter-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: none;
  background: none;
  color: var(--muted);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
}

.immersive-chapter-btn:hover,
.immersive-chapter-btn.active {
  color: var(--text);
}

.immersive-chapter-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(110, 200, 255, 0.35);
  background: rgba(3, 3, 10, 0.6);
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.immersive-chapter-btn.active .immersive-chapter-dot {
  background: var(--accent-a);
  box-shadow: 0 0 12px rgba(110, 200, 255, 0.55);
  transform: scale(1.15);
}

.immersive-chapter-label {
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.immersive-chapter-btn:hover .immersive-chapter-label,
.immersive-chapter-btn.active .immersive-chapter-label {
  opacity: 1;
  transform: translateX(0);
}

.immersive-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  backdrop-filter: blur(12px);
  background: linear-gradient(to bottom, rgba(3, 3, 10, 0.75), transparent);
}

.immersive-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.immersive-brand-logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.immersive-nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: var(--glass);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.immersive-nav-link:hover {
  border-color: rgba(110, 200, 255, 0.4);
  transform: translateY(-2px);
}

.immersive-hero {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 28px 80px 72px;
}

.immersive-hero-inner {
  max-width: 900px;
}

.immersive-eyebrow {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-b);
  margin-bottom: 20px;
}

.immersive-title {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0 0 28px;
}

.immersive-title-line {
  display: block;
}

.immersive-title-accent {
  background: linear-gradient(120deg, var(--accent-a), var(--accent-b), var(--accent-c));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.immersive-lead {
  max-width: 520px;
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--muted);
  margin-bottom: 36px;
}

.immersive-gradient-text {
  background: linear-gradient(90deg, var(--accent-a), var(--accent-b));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
}

.immersive-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.immersive-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.immersive-btn-primary {
  background: linear-gradient(135deg, rgba(110, 200, 255, 0.25), rgba(70, 207, 152, 0.2));
  border-color: rgba(110, 200, 255, 0.35);
  color: var(--text);
  box-shadow: 0 0 24px rgba(110, 200, 255, 0.15);
}

.immersive-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(110, 200, 255, 0.28);
}

.immersive-btn-ghost {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.12);
  color: var(--text);
}

.immersive-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.immersive-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 72px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.immersive-scroll-line {
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-a), transparent);
  animation: immersive-pulse 2s ease-in-out infinite;
}

@keyframes immersive-pulse {
  0%,
  100% {
    opacity: 0.4;
    transform: scaleX(0.7);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

.immersive-section {
  position: relative;
  z-index: 2;
  padding: 100px 28px 100px 72px;
}

.immersive-section--contact {
  padding-bottom: 140px;
}

.immersive-panel {
  max-width: 900px;
  padding: 36px 40px;
  border-radius: var(--radius);
  border: 1px solid var(--glass-border);
  background: var(--glass);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

.immersive-section-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-a);
  margin-bottom: 12px;
}

.immersive-section-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  line-height: 1.15;
}

.immersive-about-grid {
  display: grid;
  gap: 16px;
  color: var(--muted);
  line-height: 1.7;
}

.immersive-accent-line {
  color: var(--accent-b);
  font-weight: 500;
}

.immersive-section-head {
  margin-bottom: 32px;
}

.immersive-skill-rail {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(110, 200, 255, 0.3) transparent;
}

.immersive-skill-card {
  flex: 0 0 min(320px, 82vw);
  scroll-snap-align: start;
  padding: 28px;
  border-radius: var(--radius);
  border: 1px solid var(--glass-border);
  background: var(--glass);
  backdrop-filter: blur(16px);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.immersive-skill-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
}

.immersive-skill-index {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 12px;
}

.immersive-skill-card h3 {
  font-size: 1.15rem;
  margin: 0 0 10px;
}

.immersive-skill-card p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--muted);
}

.immersive-split {
  display: grid;
  gap: 24px;
}

@media (min-width: 960px) {
  .immersive-split {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
}

.immersive-timeline {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.immersive-timeline-item {
  position: relative;
  padding-left: 20px;
}

.immersive-timeline-date {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-b);
  margin-bottom: 8px;
}

.immersive-timeline-body h3 {
  margin: 0 0 4px;
  font-size: 1.05rem;
}

.immersive-timeline-company {
  font-size: 0.85rem;
  color: var(--accent-a);
  margin: 0 0 8px;
}

.immersive-timeline-body p:last-child {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--muted);
}

.immersive-timeline-connector {
  position: absolute;
  left: 4px;
  top: 100%;
  width: 1px;
  height: 28px;
  background: linear-gradient(to bottom, rgba(110, 200, 255, 0.4), transparent);
}

.immersive-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
  gap: 10px;
  margin-bottom: 28px;
}

.immersive-stack-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: rgba(255, 255, 255, 0.03);
  transition: transform 0.2s ease;
}

.immersive-stack-chip:hover {
  transform: scale(1.06);
}

.immersive-stack-chip img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.immersive-contribs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.immersive-contrib-card {
  padding: 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.immersive-contrib-card h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
}

.immersive-contrib-card p {
  margin: 0 0 10px;
  font-size: 0.85rem;
  color: var(--muted);
}

.immersive-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-a);
  text-decoration: none;
}

.immersive-link-icon {
  width: 14px;
  height: 14px;
}

.immersive-contact-panel {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 36px;
  border-radius: var(--radius);
  border: 1px solid var(--glass-border);
  background: var(--glass);
  backdrop-filter: blur(24px);
}

.immersive-contact-logo {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  margin-bottom: 20px;
}

.immersive-contact-lead {
  color: var(--muted);
  margin-bottom: 28px;
  line-height: 1.6;
}

.immersive-contact-panel .immersive-hero-actions {
  justify-content: center;
  margin-bottom: 28px;
}

.immersive-socials {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 24px;
}

.immersive-socials a {
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.immersive-socials a:hover {
  color: var(--accent-a);
}

.immersive-back-top {
  border: none;
  background: none;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.immersive-back-top:hover {
  color: var(--text);
}

@media (max-width: 768px) {
  .immersive-chapters {
    display: none;
  }

  .immersive-hero,
  .immersive-section {
    padding-left: 24px;
    padding-right: 24px;
  }

  .immersive-scroll-hint {
    left: 24px;
  }

  .immersive-panel {
    padding: 28px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .immersive-scroll-line {
    animation: none;
  }

  .immersive-click-ripple {
    display: none;
  }

  .immersive-page {
    cursor: auto;
  }

  :global(html.immersive-snap) {
    scroll-snap-type: none;
  }

  .immersive-btn:hover,
  .immersive-nav-link:hover,
  .immersive-skill-card:hover,
  .immersive-stack-chip:hover {
    transform: none;
  }

  .immersive-spotlight {
    display: none;
  }
}
</style>
