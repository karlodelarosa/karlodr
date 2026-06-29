<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import OpenLink from '../components/svg/OpenLink.vue'
import LinkedInWhite from '../components/svg/LinkedInWhite.vue'
import FacebookWhite from '../components/svg/FacebookWhite.vue'
import Github from '../components/svg/Github.vue'
import ProjectSection from '../components/ProjectSection.vue'
import WritingSection from '../components/WritingSection.vue'

import { ABOUT_DATA } from '../data/about'
import { EXPERTISE_DATA } from '../data/expertise'
import { EXPERIENCE_DATA } from '../data/experience'
import { STACK_DATA } from '../data/stack'
import { CONTRIBUTION_DATA } from '../data/contribution'

const logo = '/logo.png'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const animate = ref(false)
onMounted(() => {
  document.documentElement.classList.add('dark')
  nextTick(() => {
    animate.value = true
  })
})
</script>

<template>
  <main class="classic-page">
    <div class="classic-grain" aria-hidden="true" />

    <header class="classic-nav">
      <button class="classic-logo" @click="scrollToTop">
        <img :src="logo" alt="Karlo Dela Rosa | Logo" class="classic-logo-img" />
        <span class="classic-logo-text">karlodr.dev</span>
      </button>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/in/karlo-dela-rosa/"
        class="classic-social"
        aria-label="LinkedIn"
      >
        <LinkedInWhite />
      </a>
    </header>

    <!-- Hero -->
    <section id="top" class="classic-hero">
      <div class="classic-hero-inner">
        <p
          v-motion
          class="classic-eyebrow"
          :initial="{ opacity: 0, y: -24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        >
          Frontend Developer
        </p>

        <h1 class="classic-hero-title" :class="{ active: animate }">
          <span class="classic-hero-letter">J</span>
          <span class="classic-hero-letter accent">K</span>
          <span class="classic-hero-letter">D</span>
          <span class="classic-hero-letter accent-2">R</span>
        </h1>

        <p
          v-motion
          class="classic-hero-tagline"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }"
        >
          Interfaces that feel fast, intentional,
          <span class="classic-highlight">and a little delightful</span>
        </p>
      </div>

      <button class="classic-scroll-hint" aria-label="Scroll to about" @click="scrollTo('about')">
        <span>Scroll</span>
        <span class="classic-scroll-arrow">↓</span>
      </button>
    </section>

    <!-- About -->
    <section id="about" class="classic-section">
      <div
        v-motion
        class="classic-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <header class="classic-section-head">
          <span class="classic-section-index">01</span>
          <h2 class="classic-section-title">
            About<span class="classic-dot">.</span>
          </h2>
        </header>

        <div class="classic-prose">
          <p class="classic-lead">{{ ABOUT_DATA.main_description }}</p>
          <p>{{ ABOUT_DATA.sub_description1 }}</p>
          <p class="classic-accent-line">{{ ABOUT_DATA.sub_description2 }}</p>
        </div>
      </div>
    </section>

    <!-- Expertise -->
    <section id="expertise" class="classic-section classic-section-alt">
      <div
        v-motion
        class="classic-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <header class="classic-section-head">
          <span class="classic-section-index">02</span>
          <h2 class="classic-section-title">
            Expertise<span class="classic-dot">.</span>
          </h2>
        </header>

        <ul class="classic-skill-list">
          <li
            v-for="(expertise, i) in EXPERTISE_DATA"
            :key="expertise.title"
            class="classic-skill-item"
          >
            <span class="classic-skill-num">{{ String(Number(i) + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="classic-skill-title">{{ expertise.title }}</h3>
              <p class="classic-skill-desc">{{ expertise.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="classic-section">
      <div
        v-motion
        class="classic-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <header class="classic-section-head">
          <span class="classic-section-index">03</span>
          <h2 class="classic-section-title">
            Experience<span class="classic-dot">.</span>
          </h2>
        </header>

        <div class="classic-timeline">
          <article
            v-for="(experience, i) in EXPERIENCE_DATA"
            :key="`${experience.title}-${experience.date}`"
            class="classic-timeline-item"
          >
            <div class="classic-timeline-meta">
              <time class="classic-date">{{ experience.date }}</time>
              <div
                class="classic-timeline-line"
                :class="{ last: i === EXPERIENCE_DATA.length - 1 }"
              />
            </div>
            <div class="classic-timeline-body">
              <h3 class="classic-item-title">{{ experience.title }}</h3>
              <p v-if="experience.company" class="classic-company">{{ experience.company }}</p>
              <p class="classic-item-desc">{{ experience.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Stack -->
    <section id="stack" class="classic-section classic-section-alt">
      <div
        v-motion
        class="classic-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <header class="classic-section-head">
          <span class="classic-section-index">04</span>
          <h2 class="classic-section-title">
            Stack<span class="classic-dot">.</span>
          </h2>
        </header>

        <div class="classic-stack-grid">
          <img
            v-for="stack in STACK_DATA"
            :key="stack"
            :src="stack"
            alt="Stack"
            class="classic-stack-logo"
          />
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="classic-section">
      <ProjectSection variant="classic" />
    </section>

    <!-- Contributions -->
    <section class="classic-section classic-section-alt">
      <div
        v-motion
        class="classic-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <header class="classic-section-head">
          <span class="classic-section-index">06</span>
          <h2 class="classic-section-title">
            Contributions<span class="classic-dot">.</span>
          </h2>
        </header>

        <div class="classic-contrib-grid">
          <article
            v-for="contribution in CONTRIBUTION_DATA"
            :key="contribution.url"
            class="classic-contrib-card"
          >
            <h3 class="classic-item-title">{{ contribution.title }}</h3>
            <p v-if="contribution.description" class="classic-item-desc">
              {{ contribution.description }}
            </p>
            <a
              :href="contribution.url"
              target="_blank"
              rel="noopener noreferrer"
              class="classic-link"
            >
              <OpenLink class="classic-link-icon" />
              Open link
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Writing -->
    <section id="writing" class="classic-section">
      <WritingSection variant="classic" />
    </section>

    <!-- Contact -->
    <footer id="contact" class="classic-footer">
      <div class="classic-container classic-footer-inner">
        <img :src="logo" class="classic-footer-logo" alt="Karlo Dela Rosa | Logo" />

        <h2 class="classic-footer-name">Karlo Dela Rosa</h2>
        <p class="classic-footer-role">Frontend Developer</p>

        <div class="classic-footer-contact">
          <a href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
          <a href="tel:639511945392">+63 951 194 5392</a>
        </div>

        <div class="classic-footer-social">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/karlo-dela-rosa/"
            aria-label="LinkedIn"
          >
            <LinkedInWhite />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/karlodrr/"
            aria-label="Facebook"
          >
            <FacebookWhite />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/karlodelarosa"
            aria-label="GitHub"
            class="classic-github-link"
          >
            <Github />
          </a>
        </div>

        <button class="classic-back-top" @click="scrollToTop">Back to top ↑</button>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.classic-page {
  --classic-bg: #050505;
  --classic-bg-alt: #0c0f12;
  --classic-text: #f4f4f8;
  --classic-muted: rgba(244, 244, 248, 0.62);
  --classic-accent: #04b6c1;
  --classic-accent-2: #297ccf;
  --classic-accent-3: #46cf98;
  --classic-border: rgba(244, 244, 248, 0.14);
  --classic-gradient: linear-gradient(120deg, var(--classic-accent-2) 0%, var(--classic-accent-3) 100%);

  position: relative;
  width: 100%;
  overflow-x: hidden;
  background: var(--classic-bg);
  color: var(--classic-text);
  font-family: montserrat, sans-serif;
}

.classic-grain {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
  background-image: radial-gradient(var(--classic-accent) 0.6px, transparent 0.6px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

/* Nav */
.classic-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px clamp(16px, 4vw, 32px);
  background: color-mix(in srgb, var(--classic-bg) 82%, transparent);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--classic-border);
}

.classic-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}

.classic-logo-img {
  width: 42px;
}

.classic-logo-text {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.classic-social {
  display: flex;
  align-items: center;
}

.classic-github-link {
  filter: invert(1);
}

/* Hero */
.classic-hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px clamp(20px, 5vw, 48px) 100px;
  text-align: center;
}

.classic-hero-inner {
  max-width: 1100px;
  width: 100%;
}

.classic-eyebrow {
  display: inline-block;
  margin-bottom: clamp(20px, 4vw, 36px);
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  font-weight: 800;
  letter-spacing: clamp(6px, 2vw, 14px);
  text-transform: uppercase;
  color: var(--classic-accent);
}

.classic-hero-title {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(0px, 1vw, 8px);
  margin-bottom: clamp(24px, 5vw, 48px);
  line-height: 0.85;
}

.classic-hero-letter {
  display: inline-block;
  font-size: clamp(72px, 22vw, 240px);
  font-weight: 900;
  letter-spacing: -0.04em;
  background: var(--classic-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: translateY(48px);
  opacity: 0;
  filter: blur(8px);
  transition:
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.8s ease,
    filter 0.8s ease;
}

.classic-hero-letter.accent {
  background: linear-gradient(120deg, var(--classic-accent) 0%, var(--classic-accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.classic-hero-letter.accent-2 {
  background: linear-gradient(120deg, var(--classic-accent-3) 0%, var(--classic-accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.classic-hero-title.active .classic-hero-letter:nth-child(1) {
  transition-delay: 0.05s;
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}
.classic-hero-title.active .classic-hero-letter:nth-child(2) {
  transition-delay: 0.15s;
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}
.classic-hero-title.active .classic-hero-letter:nth-child(3) {
  transition-delay: 0.25s;
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}
.classic-hero-title.active .classic-hero-letter:nth-child(4) {
  transition-delay: 0.35s;
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}

.classic-hero-tagline {
  max-width: 640px;
  margin: 0 auto;
  font-size: clamp(1.05rem, 2.8vw, 1.5rem);
  font-weight: 500;
  line-height: 1.55;
  color: var(--classic-muted);
}

.classic-highlight {
  display: inline;
  font-weight: 800;
  color: var(--classic-text);
  background: linear-gradient(to top, color-mix(in srgb, var(--classic-accent) 28%, transparent) 40%, transparent 40%);
}

.classic-scroll-hint {
  position: absolute;
  bottom: clamp(24px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--classic-muted);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: classic-bounce 2.4s ease-in-out infinite;
}

.classic-scroll-arrow {
  font-size: 1.25rem;
  color: var(--classic-accent);
}

@keyframes classic-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* Sections */
.classic-section {
  position: relative;
  z-index: 1;
  padding: clamp(80px, 14vw, 140px) clamp(20px, 5vw, 48px);
}

.classic-section-alt {
  background: var(--classic-bg-alt);
}

.classic-container {
  max-width: 1100px;
  margin: 0 auto;
}

.classic-section-head {
  margin-bottom: clamp(40px, 8vw, 72px);
}

.classic-section-index {
  display: block;
  margin-bottom: 12px;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  font-weight: 800;
  letter-spacing: 0.2em;
  color: var(--classic-accent);
}

.classic-section-title {
  font-size: clamp(56px, 14vw, 148px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 0.92;
  text-transform: uppercase;
}

.classic-dot {
  color: var(--classic-accent);
}

.classic-prose {
  max-width: 720px;
}

.classic-prose p {
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  font-weight: 400;
  line-height: 1.75;
  color: var(--classic-muted);
  margin-bottom: 24px;
}

.classic-lead {
  font-size: clamp(1.15rem, 3vw, 1.45rem) !important;
  font-weight: 600 !important;
  color: var(--classic-text) !important;
}

.classic-accent-line {
  display: inline-block;
  padding: 16px 0 0;
  font-weight: 700 !important;
  color: var(--classic-text) !important;
  border-top: 2px solid var(--classic-accent);
}

/* Skills */
.classic-skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.classic-skill-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(20px, 4vw, 40px);
  padding: clamp(28px, 5vw, 48px) 0;
  border-bottom: 1px solid var(--classic-border);
  align-items: start;
}

.classic-skill-item:first-child {
  border-top: 1px solid var(--classic-border);
}

.classic-skill-num {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1;
  color: color-mix(in srgb, var(--classic-accent) 35%, transparent);
  letter-spacing: -0.04em;
}

.classic-skill-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.classic-skill-desc {
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.65;
  color: var(--classic-muted);
  max-width: 560px;
}

/* Timeline */
.classic-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.classic-timeline-item {
  display: grid;
  grid-template-columns: minmax(100px, 140px) 1fr;
  gap: clamp(20px, 4vw, 40px);
  padding: clamp(28px, 5vw, 40px) 0;
}

.classic-timeline-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.classic-date {
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--classic-accent);
  white-space: nowrap;
}

.classic-timeline-line {
  width: 2px;
  flex: 1;
  min-height: 40px;
  background: var(--classic-border);
}

.classic-timeline-line.last {
  display: none;
}

.classic-item-title {
  font-size: clamp(1.25rem, 3.5vw, 2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.classic-company {
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 700;
  color: var(--classic-accent);
  margin-bottom: 12px;
}

.classic-item-desc {
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.65;
  color: var(--classic-muted);
  max-width: 600px;
}

/* Stack */
.classic-stack-grid {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(32px, 6vw, 56px);
  justify-content: center;
  align-items: center;
  padding: 24px 0;
}

.classic-stack-logo {
  max-height: clamp(48px, 8vw, 72px);
  width: auto;
  opacity: 0.45;
  filter: grayscale(1);
  transition:
    opacity 0.3s ease,
    filter 0.3s ease,
    transform 0.3s ease;
}

.classic-stack-logo:hover {
  opacity: 1;
  filter: grayscale(0);
  transform: scale(1.08);
}

/* Contributions */
.classic-contrib-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.classic-contrib-card {
  padding: clamp(24px, 4vw, 32px);
  border: 1px solid var(--classic-border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--classic-bg) 60%, transparent);
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.classic-contrib-card:hover {
  border-color: var(--classic-accent);
  transform: translateY(-2px);
}

.classic-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--classic-accent);
  text-decoration: none;
}

.classic-link:hover {
  text-decoration: underline;
}

.classic-link-icon {
  width: 12px;
}

/* Footer */
.classic-footer {
  position: relative;
  z-index: 1;
  padding: clamp(80px, 12vw, 120px) clamp(20px, 5vw, 48px);
  border-top: 1px solid var(--classic-border);
  text-align: center;
}

.classic-footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.classic-footer-logo {
  width: 64px;
  margin-bottom: 8px;
}

.classic-footer-name {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
}

.classic-footer-role {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--classic-accent);
}

.classic-footer-contact {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 16px 0;
}

.classic-footer-contact a {
  color: var(--classic-muted);
  text-decoration: none;
  font-size: 0.95rem;
}

.classic-footer-contact a:hover {
  color: var(--classic-accent);
}

.classic-footer-social {
  display: flex;
  gap: 28px;
  margin: 16px 0 32px;
}

.classic-back-top {
  background: none;
  border: 1px solid var(--classic-border);
  border-radius: 999px;
  padding: 12px 28px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--classic-text);
  transition: border-color 0.2s ease, color 0.2s ease;
}

.classic-back-top:hover {
  border-color: var(--classic-accent);
  color: var(--classic-accent);
}

@media (min-width: 768px) {
  .classic-contrib-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .classic-timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .classic-timeline-meta {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .classic-timeline-line {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .classic-scroll-hint {
    animation: none;
  }

  .classic-hero-letter {
    transform: none;
    opacity: 1;
    filter: none;
    transition: none;
  }
}
</style>
