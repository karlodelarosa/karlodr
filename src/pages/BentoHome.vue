<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import OpenLink from '../components/svg/OpenLink.vue'
import LinkedInWhite from '../components/svg/LinkedInWhite.vue'
import ProjectSection from '../components/ProjectSection.vue'
import WritingSection from '../components/WritingSection.vue'
import { ABOUT_DATA } from '../data/about'
import { EXPERTISE_DATA } from '../data/expertise'
import { EXPERIENCE_DATA } from '../data/experience'
import { STACK_DATA } from '../data/stack'
import { CONTRIBUTION_DATA } from '../data/contribution'

const logo = '/logo.png'

const mouseX = ref(0)
const mouseY = ref(0)
const animate = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const onMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
}

onMounted(() => {
  document.documentElement.classList.add('dark')
  window.addEventListener('mousemove', onMouseMove)
  nextTick(() => {
    animate.value = true
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

const ACCENTS = ['#297ccf', '#46cf98', '#04b6c1', '#6c5ce7', '#ff9f43']
</script>

<template>
  <main class="bento-page">
    <div class="bento-ambient" aria-hidden="true">
      <div
        class="orb orb-1"
        :style="{ transform: `translate(${mouseX * 18}px, ${mouseY * 14}px)` }"
      />
      <div
        class="orb orb-2"
        :style="{ transform: `translate(${mouseX * -24}px, ${mouseY * -20}px)` }"
      />
      <div
        class="orb orb-3"
        :style="{ transform: `translate(${mouseX * 12}px, ${mouseY * -16}px)` }"
      />
      <div class="bento-noise" />
    </div>

    <header class="bento-nav">
      <button class="bento-brand" @click="scrollToTop">
        <img :src="logo" alt="Karlo Dela Rosa" class="bento-brand-logo" />
        <span>karlodr.dev</span>
      </button>

      <a
        class="bento-nav-cta"
        href="https://www.linkedin.com/in/karlo-dela-rosa/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInWhite />
      </a>
    </header>

    <section id="top" class="bento-shell">
      <div class="bento-grid bento-grid-hero">
        <article
          v-motion
          class="bento-cell cell-hero"
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 900 } }"
        >
          <p class="bento-eyebrow">Frontend Developer</p>
          <h1 class="bento-hero-title" :class="{ active: animate }">JKDR</h1>
          <p class="bento-hero-copy">
            Building captivating interfaces with
            <span class="bento-gradient-text">clean code</span>
            &amp; creative solutions.
          </p>
          <div class="bento-hero-actions">
            <button class="bento-btn bento-btn-primary" @click="scrollTo('about')">
              Explore ↓
            </button>
            <a class="bento-btn bento-btn-ghost" href="mailto:karlordr@gmail.com">Get in touch</a>
          </div>
        </article>

        <article
          v-motion
          class="bento-cell cell-stat"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }"
        >
          <span class="cell-label">Experience</span>
          <strong class="cell-stat-value">8+</strong>
          <span class="cell-stat-unit">Years building products</span>
        </article>

        <article
          v-motion
          class="bento-cell cell-status"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 280 } }"
        >
          <span class="status-dot" />
          <span class="cell-label">Status</span>
          <p>Open to interesting frontend &amp; product work</p>
        </article>

        <article
          v-motion
          class="bento-cell cell-interests"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 340 } }"
        >
          <span class="cell-label">Off-screen</span>
          <div class="interest-tags">
            <span>Games</span>
            <span>Coffee</span>
            <span>Anime</span>
            <span>Dogs</span>
          </div>
        </article>

        <article
          v-motion
          class="bento-cell cell-stack-preview"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }"
        >
          <span class="cell-label">Stack</span>
          <div class="stack-marquee">
            <div class="stack-track">
              <img v-for="stack in STACK_DATA" :key="stack" :src="stack" alt="" />
              <img v-for="stack in STACK_DATA" :key="`${stack}-dup`" :src="stack" alt="" />
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="about" class="bento-shell">
      <div
        v-motion
        class="bento-grid bento-grid-about"
        :initial="{ opacity: 0, y: 60 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <article class="bento-cell cell-about-copy">
          <h2 class="bento-section-title">About</h2>
          <p>{{ ABOUT_DATA.main_description }}</p>
          <p>{{ ABOUT_DATA.sub_description1 }}</p>
          <p class="bento-accent-line">{{ ABOUT_DATA.sub_description2 }}</p>
        </article>

        <article class="bento-cell cell-quote">
          <span class="cell-label">Approach</span>
          <blockquote>Problem solver. Explorer. Interface craftsman.</blockquote>
        </article>
      </div>
    </section>

    <section id="expertise" class="bento-shell">
      <div
        v-motion
        class="bento-section-head"
        :initial="{ opacity: 0, y: 40 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 700 } }"
      >
        <h2 class="bento-section-title">Expertise</h2>
        <p>Where I bring the most value across the product lifecycle.</p>
      </div>

      <div class="bento-grid bento-grid-skills">
        <article
          v-for="(expertise, i) in EXPERTISE_DATA"
          :key="expertise.title"
          v-motion
          class="bento-cell cell-skill"
          :class="{ 'cell-skill-featured': i === 0 }"
          :style="{ '--accent': ACCENTS[i % ACCENTS.length] }"
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 80 } }"
        >
          <span class="skill-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ expertise.title }}</h3>
          <p>{{ expertise.description }}</p>
        </article>
      </div>
    </section>

    <ProjectSection variant="bento" />

    <section id="experience" class="bento-shell">
      <div class="bento-grid bento-grid-work">
        <article
          v-motion
          class="bento-cell cell-experience"
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        >
          <h2 class="bento-section-title">Experience</h2>
          <div class="timeline">
            <div
              v-for="(experience, i) in EXPERIENCE_DATA"
              :key="`${experience.title}-${experience.date}`"
              class="timeline-item"
            >
              <div class="timeline-meta">
                <span class="timeline-date">{{ experience.date }}</span>
                <span v-if="i !== EXPERIENCE_DATA.length - 1" class="timeline-line" />
              </div>
              <div class="timeline-body">
                <h3>{{ experience.title }}</h3>
                <p v-if="experience.company" class="timeline-company">{{ experience.company }}</p>
                <p>{{ experience.description }}</p>
              </div>
            </div>
          </div>
        </article>

        <article
          v-motion
          class="bento-cell cell-stack-full"
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 120 } }"
        >
          <h2 class="bento-section-title">Stack</h2>
          <div class="stack-grid">
            <div v-for="stack in STACK_DATA" :key="stack" class="stack-chip">
              <img :src="stack" alt="Technology" />
            </div>
          </div>
        </article>

        <article
          v-for="(contribution, i) in CONTRIBUTION_DATA"
          :key="contribution.url"
          v-motion
          class="bento-cell cell-contrib"
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 70 } }"
        >
          <span class="cell-label">Contribution</span>
          <h3>{{ contribution.title }}</h3>
          <p v-if="contribution.description" class="contrib-desc">{{ contribution.description }}</p>
          <a :href="contribution.url" target="_blank" rel="noopener noreferrer" class="contrib-link">
            <OpenLink class="contrib-icon" />
            Open link
          </a>
        </article>
      </div>
    </section>

    <WritingSection variant="bento" />

    <footer id="contact" class="bento-shell bento-shell-footer">
      <article
        v-motion
        class="bento-cell cell-contact"
        :initial="{ opacity: 0, y: 40 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <img :src="logo" alt="Karlo Dela Rosa" class="contact-logo" />
        <h2 class="bento-section-title">Let's build something</h2>
        <p>Available for frontend leadership, product engineering, and design-heavy builds.</p>

        <div class="contact-actions">
          <a class="bento-btn bento-btn-primary" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
          <a class="bento-btn bento-btn-ghost" href="tel:639511945392">+63 951 194 5392</a>
        </div>

        <div class="contact-socials">
          <a href="https://www.linkedin.com/in/karlo-dela-rosa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.facebook.com/karlodrr/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://github.com/karlodelarosa" target="_blank" rel="noopener noreferrer">Github</a>
        </div>

        <button class="back-top" @click="scrollToTop">↑ Back to top</button>
      </article>
    </footer>
  </main>
</template>

<style scoped>
.bento-page {
  --bg: #07070c;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-hover: rgba(255, 255, 255, 0.055);
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.18);
  --text: #f4f4f8;
  --muted: rgba(244, 244, 248, 0.62);
  --accent-a: #297ccf;
  --accent-b: #46cf98;
  --accent-c: #04b6c1;
  --radius: 22px;
  --gap: 14px;

  position: relative;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
}

.bento-ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  transition: transform 0.4s ease-out;
  will-change: transform;
}

.orb-1 {
  top: -8%;
  left: -6%;
  width: 42vw;
  height: 42vw;
  background: radial-gradient(circle, rgba(41, 124, 207, 0.55), transparent 70%);
  animation: drift 18s ease-in-out infinite;
}

.orb-2 {
  bottom: -12%;
  right: -8%;
  width: 38vw;
  height: 38vw;
  background: radial-gradient(circle, rgba(70, 207, 152, 0.45), transparent 70%);
  animation: drift 22s ease-in-out infinite reverse;
}

.orb-3 {
  top: 38%;
  left: 42%;
  width: 28vw;
  height: 28vw;
  background: radial-gradient(circle, rgba(4, 182, 193, 0.35), transparent 70%);
  animation: drift 16s ease-in-out infinite;
}

.bento-noise {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(3%, -4%) scale(1.06);
  }
}

.bento-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
  background: rgba(7, 7, 12, 0.72);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.bento-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.bento-brand-logo {
  width: 40px;
  border-radius: 10px;
}

.bento-nav-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: all 0.2s ease;
}

.bento-nav-cta:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.timeline-company {
  font-size: 0.85rem;
  font-weight: 700;
  color: #46cf98 !important;
  margin-bottom: 8px !important;
}

.contrib-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 12px;
}

.bento-shell {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 96px 20px 0;
}

.bento-shell-footer {
  padding-bottom: 48px;
}

.bento-grid {
  display: grid;
  gap: var(--gap);
}

.bento-cell {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(145deg, var(--surface), rgba(255, 255, 255, 0.015));
  padding: 24px;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.bento-cell::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.bento-cell:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
  transform: translateY(-2px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
}

.bento-cell:hover::before {
  opacity: 1;
}

.bento-grid-hero {
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  min-height: calc(100vh - 96px);
  align-content: center;
}

.cell-hero {
  grid-column: span 12;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 28px;
}

.cell-stat,
.cell-status,
.cell-interests,
.cell-stack-preview {
  grid-column: span 6;
  min-height: 140px;
}

.bento-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.bento-hero-title {
  font-size: clamp(72px, 16vw, 168px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: clamp(6px, 2vw, 18px);
  margin-bottom: 18px;
  background: linear-gradient(to right, var(--accent-a) 0%, var(--accent-b) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: blur(8px);
  transition: filter 1.2s ease, letter-spacing 1.8s ease;
}

.bento-hero-title.active {
  filter: blur(0);
  letter-spacing: clamp(10px, 3vw, 24px);
}

.bento-hero-copy {
  max-width: 520px;
  color: var(--muted);
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  line-height: 1.6;
  margin-bottom: 28px;
}

.bento-gradient-text {
  background: linear-gradient(to right, var(--accent-a), var(--accent-b));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.bento-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.bento-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bento-btn-primary {
  border: 1px solid rgba(70, 207, 152, 0.35);
  background: linear-gradient(135deg, rgba(41, 124, 207, 0.35), rgba(70, 207, 152, 0.25));
  color: var(--text);
}

.bento-btn-primary:hover {
  border-color: rgba(70, 207, 152, 0.65);
  box-shadow: 0 0 24px rgba(70, 207, 152, 0.18);
}

.bento-btn-ghost {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
}

.bento-btn-ghost:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.cell-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
}

.cell-stat-value {
  display: block;
  font-size: 2.6rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(to right, var(--accent-a), var(--accent-c));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cell-stat-unit {
  display: block;
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.9rem;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-b);
  box-shadow: 0 0 12px rgba(70, 207, 152, 0.8);
  margin-right: 8px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

.cell-status p {
  color: var(--muted);
  line-height: 1.5;
}

.interest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.interest-tags span {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: 0.82rem;
  color: var(--muted);
}

.stack-marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.stack-track {
  display: flex;
  gap: 18px;
  width: max-content;
  animation: marquee 28s linear infinite;
}

.stack-track img {
  height: 34px;
  width: auto;
  opacity: 0.55;
  filter: grayscale(1);
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.stack-track img:hover {
  opacity: 1;
  filter: grayscale(0);
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.bento-grid-about {
  grid-template-columns: repeat(12, 1fr);
}

.cell-about-copy {
  grid-column: span 12;
}

.cell-quote {
  grid-column: span 12;
}

.cell-about-copy p,
.cell-skill p,
.timeline-body p {
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 14px;
}

.bento-accent-line {
  color: var(--text) !important;
  font-weight: 600;
}

.cell-quote blockquote {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 700;
  line-height: 1.35;
  background: linear-gradient(to right, var(--accent-a), var(--accent-b));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bento-section-head {
  margin-bottom: 18px;
}

.bento-section-head p {
  color: var(--muted);
  max-width: 560px;
}

.bento-section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.bento-grid-skills {
  grid-template-columns: repeat(12, 1fr);
}

.cell-skill {
  grid-column: span 12;
  border-top: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
}

.cell-skill-featured {
  grid-column: span 12;
  min-height: 220px;
}

.skill-index {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-bottom: 12px;
}

.cell-skill h3 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.bento-grid-work {
  grid-template-columns: repeat(12, 1fr);
}

.cell-experience {
  grid-column: span 12;
}

.cell-stack-full {
  grid-column: span 12;
}

.cell-contrib {
  grid-column: span 6;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 18px;
}

.timeline-meta {
  position: relative;
}

.timeline-date {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 36px;
  bottom: -22px;
  width: 1px;
  background: linear-gradient(to bottom, var(--border-hover), transparent);
  transform: translateX(-50%);
}

.timeline-body h3 {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stack-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;
}

.stack-chip:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.stack-chip img {
  max-height: 34px;
  width: auto;
  opacity: 0.65;
  filter: grayscale(1);
  transition: all 0.2s ease;
}

.stack-chip:hover img {
  opacity: 1;
  filter: grayscale(0);
}

.cell-contrib h3 {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 14px;
}

.contrib-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  text-decoration: none;
  font-size: 0.88rem;
}

.contrib-link:hover {
  color: var(--text);
}

.contrib-icon {
  width: 14px;
}

.cell-contact {
  text-align: center;
  padding: 48px 28px;
}

.contact-logo {
  width: 64px;
  margin: 0 auto 18px;
  border-radius: 14px;
}

.cell-contact p {
  color: var(--muted);
  max-width: 520px;
  margin: 0 auto 24px;
}

.contact-actions,
.contact-socials {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 22px;
}

.contact-socials a {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--muted);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.contact-socials a:hover {
  color: var(--text);
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.back-top {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.back-top:hover {
  color: var(--text);
}

@media (min-width: 768px) {
  .cell-hero {
    grid-column: span 12;
    grid-row: span 1;
    min-height: 380px;
  }

  .cell-stat,
  .cell-status,
  .cell-interests {
    grid-column: span 4;
  }

  .cell-stack-preview {
    grid-column: span 12;
  }

  .cell-about-copy {
    grid-column: span 12;
  }

  .cell-quote {
    grid-column: span 12;
  }

  .cell-skill {
    grid-column: span 6;
  }

  .cell-skill-featured {
    grid-column: span 12;
  }

  .cell-experience {
    grid-column: span 8;
  }

  .cell-stack-full {
    grid-column: span 4;
  }

  .cell-contrib {
    grid-column: span 3;
  }

  .stack-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .cell-skill {
    grid-column: span 4;
  }

  .cell-skill:nth-child(4),
  .cell-skill:nth-child(5) {
    grid-column: span 6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none !important;
    transition: none !important;
  }

  .bento-cell,
  .bento-btn {
    transition: none !important;
  }
}
</style>
