<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import OpenLink from '../components/svg/OpenLink.vue'
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
  nextTick(() => {
    animate.value = true
  })
})

const ACCENT_COLORS = ['#FFE566', '#FF6B6B', '#4ECDC4', '#6C5CE7', '#FF9F43']
</script>

<template>
  <main class="neo-page">
    <!-- dot grid backdrop -->
    <div class="neo-grid-bg" aria-hidden="true" />

    <!-- floating shapes -->
    <div class="neo-shapes" aria-hidden="true">
      <div class="shape shape-square" />
      <div class="shape shape-circle" />
      <div class="shape shape-triangle" />
      <div class="shape shape-bar" />
    </div>

    <!-- nav -->
    <header class="neo-nav">
      <button class="neo-logo" @click="scrollToTop">
        <img :src="logo" alt="Karlo Dela Rosa | Logo" class="neo-logo-img" />
        <span class="neo-logo-text">karlodr.dev</span>
      </button>

      <a
        class="neo-btn neo-btn-sm"
        href="https://www.linkedin.com/in/karlo-dela-rosa/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn ↗
      </a>
    </header>

    <!-- hero -->
    <section id="top" class="neo-hero">
      <div class="neo-hero-inner">
        <p
          v-motion
          class="neo-eyebrow"
          :initial="{ opacity: 0, y: -30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        >
          Frontend Developer
        </p>

        <h1 class="neo-hero-title" :class="{ active: animate }">
          <span class="neo-hero-letter">J</span>
          <span class="neo-hero-letter">K</span>
          <span class="neo-hero-letter">D</span>
          <span class="neo-hero-letter">R</span>
        </h1>

        <p
          v-motion
          class="neo-hero-sub"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
        >
          Building bold interfaces with
          <span class="neo-highlight">clean code</span>
          &amp; creative solutions
        </p>

        <div
          v-motion
          class="neo-hero-actions"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 700 } }"
        >
          <button class="neo-btn neo-btn-lg" @click="scrollTo('about')">See my work ↓</button>
          <a class="neo-btn neo-btn-outline neo-btn-lg" href="mailto:karlordr@gmail.com">
            Get in touch
          </a>
        </div>
      </div>

      <button class="neo-scroll-hint" aria-label="Scroll down" @click="scrollTo('about')">
        <span>SCROLL</span>
        <span class="neo-scroll-arrow">↓</span>
      </button>
    </section>

    <!-- about -->
    <section id="about" class="neo-section">
      <div
        v-motion
        class="neo-container neo-about-grid"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <div class="neo-about-content">
          <div class="neo-badge">★ Problem Solver</div>
          <h2 class="neo-section-title">
            ABOUT<span class="neo-dot">.</span>
          </h2>
          <p class="neo-body">{{ ABOUT_DATA.main_description }}</p>
          <p class="neo-body">{{ ABOUT_DATA.sub_description1 }}</p>
          <p class="neo-body neo-body-accent">{{ ABOUT_DATA.sub_description2 }}</p>
        </div>
      </div>
    </section>

    <!-- expertise -->
    <section id="expertise" class="neo-section neo-section-yellow">
      <div
        v-motion
        class="neo-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h2 class="neo-section-title">
          EXPERTISE<span class="neo-dot">.</span>
        </h2>

        <div class="neo-cards-grid">
          <div
            v-for="(expertise, i) in EXPERTISE_DATA"
            :key="expertise.title"
            class="neo-card neo-card-skill"
            :style="{ '--accent': ACCENT_COLORS[i % ACCENT_COLORS.length] }"
          >
            <span class="neo-card-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="neo-card-title">{{ expertise.title }}</h3>
            <p class="neo-card-desc">{{ expertise.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <ProjectSection variant="brutalist" />

    <!-- experience -->
    <section id="experience" class="neo-section">
      <div
        v-motion
        class="neo-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h2 class="neo-section-title">
          EXPERIENCE<span class="neo-dot">.</span>
        </h2>

        <div class="neo-timeline">
          <div
            v-for="(experience, i) in EXPERIENCE_DATA"
            :key="`${experience.title}-${experience.date}`"
            class="neo-timeline-item"
          >
            <div class="neo-timeline-date">
              <span class="neo-date-box">{{ experience.date }}</span>
            </div>
            <div class="neo-timeline-line" :class="{ last: i === EXPERIENCE_DATA.length - 1 }" />
            <div class="neo-card neo-card-timeline">
              <h3 class="neo-card-title">{{ experience.title }}</h3>
              <p v-if="experience.company" class="neo-company">{{ experience.company }}</p>
              <p class="neo-card-desc">{{ experience.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- stack -->
    <section id="stack" class="neo-section neo-section-blue">
      <div
        v-motion
        class="neo-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h2 class="neo-section-title">
          STACK<span class="neo-dot">.</span>
        </h2>

        <div class="neo-stack-grid">
          <div v-for="stack in STACK_DATA" :key="stack" class="neo-stack-item">
            <img :src="stack" alt="Stack technology" class="neo-stack-logo" />
          </div>
        </div>
      </div>
    </section>

    <!-- contributions -->
    <section id="contributions" class="neo-section">
      <div
        v-motion
        class="neo-container"
        :initial="{ opacity: 0, y: 80 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h2 class="neo-section-title">
          CONTRIBUTIONS<span class="neo-dot">.</span>
        </h2>

        <div class="neo-contrib-grid">
          <a
            v-for="contribution in CONTRIBUTION_DATA"
            :key="contribution.url"
            :href="contribution.url"
            target="_blank"
            rel="noopener noreferrer"
            class="neo-card neo-card-link"
          >
            <h3 class="neo-card-title">{{ contribution.title }}</h3>
            <p v-if="contribution.description" class="neo-card-desc neo-contrib-desc">
              {{ contribution.description }}
            </p>
            <span class="neo-link-label">
              <OpenLink class="neo-link-icon" />
              Open link
            </span>
          </a>
        </div>
      </div>
    </section>

    <WritingSection variant="brutalist" />

    <!-- footer / contact -->
    <footer id="contact" class="neo-footer">
      <div class="neo-container neo-footer-inner">
        <img :src="logo" alt="Karlo Dela Rosa | Logo" class="neo-footer-logo" />

        <h3 class="neo-footer-name">KARLO DELA ROSA</h3>

        <div class="neo-contact-row">
          <a class="neo-btn" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
          <a class="neo-btn neo-btn-outline" href="tel:639511945392">+63 951 194 5392</a>
        </div>

        <div class="neo-social-row">
          <a
            class="neo-social-btn"
            href="https://www.linkedin.com/in/karlo-dela-rosa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            class="neo-social-btn"
            href="https://www.facebook.com/karlodrr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            class="neo-social-btn"
            href="https://github.com/karlodelarosa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>

        <button class="neo-back-top" @click="scrollToTop">↑ Back to top</button>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.neo-page {
  --neo-bg: #fdf6e3;
  --neo-yellow: #ffe566;
  --neo-blue: #a8d8ff;
  --neo-red: #ff6b6b;
  --neo-green: #4ecdc4;
  --neo-black: #000;
  --neo-border: 3px solid var(--neo-black);
  --neo-shadow: 6px 6px 0 0 var(--neo-black);
  --neo-shadow-sm: 4px 4px 0 0 var(--neo-black);
  --neo-shadow-hover: 2px 2px 0 0 var(--neo-black);

  position: relative;
  width: 100%;
  background: var(--neo-bg);
  color: var(--neo-black);
  overflow-x: hidden;
  font-family: montserrat, sans-serif;
}

/* dot grid background */
.neo-grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--neo-yellow);
  background-image: radial-gradient(var(--neo-black) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  opacity: 0.35;
}

/* floating decorative shapes */
.neo-shapes {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border: var(--neo-border);
}

.shape-square {
  top: 12%;
  right: 8%;
  width: 60px;
  height: 60px;
  background: var(--neo-green);
  box-shadow: var(--neo-shadow-sm);
  animation: float 6s ease-in-out infinite;
}

.shape-circle {
  bottom: 20%;
  left: 5%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--neo-red);
  box-shadow: var(--neo-shadow-sm);
  animation: float 8s ease-in-out infinite reverse;
}

.shape-triangle {
  top: 45%;
  right: 4%;
  width: 0;
  height: 0;
  border: none;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid var(--neo-blue);
  filter: drop-shadow(4px 4px 0 var(--neo-black));
  animation: float 7s ease-in-out infinite;
}

.shape-bar {
  top: 70%;
  right: 12%;
  width: 20px;
  height: 80px;
  background: var(--neo-red);
  box-shadow: var(--neo-shadow-sm);
  animation: float 5s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

/* nav */
.neo-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 24px;
  background: var(--neo-bg);
  border-bottom: var(--neo-border);
}

.neo-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.neo-logo-img {
  width: 44px;
  border: 2px solid var(--neo-black);
  box-shadow: 2px 2px 0 0 var(--neo-black);
}

.neo-logo-text {
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.5px;
}

/* buttons */
.neo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 14px 28px;
  background: var(--neo-yellow);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow);
  font-weight: 900;
  font-size: 1rem;
  text-decoration: none;
  color: var(--neo-black);
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.neo-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--neo-shadow-hover);
}

.neo-btn:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.neo-btn-sm {
  padding: 10px 18px;
  font-size: 0.8rem;
  box-shadow: var(--neo-shadow-sm);
}

.neo-btn-lg {
  padding: 18px 36px;
  font-size: 1.1rem;
}

.neo-btn-outline {
  background: var(--neo-bg);
}

/* hero */
.neo-hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
}

.neo-hero-inner {
  max-width: 900px;
}

.neo-eyebrow {
  display: inline-block;
  padding: 8px 20px;
  background: var(--neo-black);
  color: var(--neo-yellow);
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 32px;
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
}

.neo-hero-title {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 32px;
  line-height: 0.85;
}

.neo-hero-letter {
  display: inline-block;
  font-size: clamp(80px, 18vw, 200px);
  font-weight: 900;
  letter-spacing: -4px;
  transform: translateY(40px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neo-hero-title.active .neo-hero-letter:nth-child(1) {
  transition-delay: 0.1s;
  transform: translateY(0);
  opacity: 1;
}
.neo-hero-title.active .neo-hero-letter:nth-child(2) {
  transition-delay: 0.2s;
  transform: translateY(0);
  opacity: 1;
  color: var(--neo-red);
}
.neo-hero-title.active .neo-hero-letter:nth-child(3) {
  transition-delay: 0.3s;
  transform: translateY(0);
  opacity: 1;
}
.neo-hero-title.active .neo-hero-letter:nth-child(4) {
  transition-delay: 0.4s;
  transform: translateY(0);
  opacity: 1;
  color: var(--neo-green);
}

.neo-hero-sub {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  font-weight: 600;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.5;
}

.neo-highlight {
  background: var(--neo-yellow);
  padding: 2px 8px;
  border: 2px solid var(--neo-black);
  font-weight: 900;
}

.neo-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.neo-scroll-hint {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--neo-bg);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
  padding: 12px 24px;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 3px;
  cursor: pointer;
  animation: bounce 2s ease-in-out infinite;
}

.neo-scroll-arrow {
  font-size: 1.4rem;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* sections */
.neo-section {
  position: relative;
  z-index: 1;
  padding: 100px 24px;
}

.neo-section-yellow {
  background: var(--neo-yellow);
  border-top: var(--neo-border);
  border-bottom: var(--neo-border);
}

.neo-section-blue {
  background: var(--neo-blue);
  border-top: var(--neo-border);
  border-bottom: var(--neo-border);
}

.neo-container {
  max-width: 1100px;
  margin: 0 auto;
}

.neo-section-title {
  font-size: clamp(48px, 10vw, 90px);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 0.95;
  margin-bottom: 48px;
  text-transform: uppercase;
}

.neo-dot {
  color: var(--neo-red);
}

.neo-body {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 500;
  line-height: 1.7;
  margin-bottom: 24px;
}

.neo-body-accent {
  display: inline-block;
  background: var(--neo-yellow);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
  padding: 16px 24px;
  font-weight: 800;
  margin-top: 8px;
}

/* about */
.neo-about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

.neo-card {
  background: var(--neo-bg);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow);
  padding: 24px;
}

.neo-badge {
  display: inline-block;
  width: fit-content;
  margin-bottom: 20px;
  background: var(--neo-yellow);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
  padding: 10px 18px;
  font-weight: 900;
  font-size: 0.9rem;
}

/* expertise cards */
.neo-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.neo-card-skill {
  position: relative;
  padding-top: 48px;
  transition: transform 0.15s ease;
}

.neo-card-skill:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 0 var(--neo-black);
}

.neo-card-skill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--accent, var(--neo-yellow));
  border-bottom: var(--neo-border);
}

.neo-card-index {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  font-weight: 900;
  opacity: 0.2;
}

.neo-card-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.neo-card-desc {
  font-size: 1.05rem;
  font-weight: 500;
  line-height: 1.6;
}

.neo-company {
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--neo-red);
  margin-bottom: 8px;
}

.neo-contrib-desc {
  margin-bottom: 12px;
}

/* timeline */
.neo-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.neo-timeline-item {
  display: grid;
  grid-template-columns: 120px 24px 1fr;
  gap: 0 16px;
  align-items: start;
}

.neo-date-box {
  display: inline-block;
  background: var(--neo-red);
  color: white;
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
  padding: 8px 12px;
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.neo-timeline-line {
  width: 3px;
  min-height: 100%;
  background: var(--neo-black);
  margin: 0 auto;
}

.neo-timeline-line.last {
  min-height: 40px;
}

.neo-card-timeline {
  margin-bottom: 32px;
}

/* stack */
.neo-stack-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.neo-stack-item {
  background: var(--neo-bg);
  border: var(--neo-border);
  box-shadow: var(--neo-shadow-sm);
  padding: 20px 28px;
  transition: all 0.15s ease;
}

.neo-stack-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--neo-shadow);
  background: var(--neo-yellow);
}

.neo-stack-logo {
  max-height: 48px;
  width: auto;
  display: block;
}

/* contributions */
.neo-contrib-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.neo-card-link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
  color: var(--neo-black);
  transition: all 0.15s ease;
}

.neo-card-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 0 var(--neo-black);
  background: var(--neo-yellow);
}

.neo-link-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.neo-link-icon {
  width: 14px;
}

/* footer */
.neo-footer {
  position: relative;
  z-index: 1;
  background: var(--neo-black);
  color: var(--neo-bg);
  padding: 80px 24px;
  border-top: var(--neo-border);
}

.neo-footer-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.neo-footer-logo {
  width: 80px;
  border: 3px solid var(--neo-yellow);
  box-shadow: 4px 4px 0 0 var(--neo-yellow);
}

.neo-footer-name {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: 8px;
}

.neo-contact-row,
.neo-social-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.neo-footer .neo-btn {
  font-size: 0.85rem;
  padding: 12px 20px;
}

.neo-footer .neo-btn-outline {
  background: transparent;
  color: var(--neo-bg);
  border-color: var(--neo-bg);
  box-shadow: 4px 4px 0 0 var(--neo-bg);
}

.neo-social-btn {
  padding: 12px 24px;
  background: var(--neo-yellow);
  border: 3px solid var(--neo-yellow);
  color: var(--neo-black);
  font-weight: 900;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
  box-shadow: 4px 4px 0 0 var(--neo-yellow);
  transition: all 0.15s ease;
}

.neo-social-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 var(--neo-yellow);
}

.neo-back-top {
  margin-top: 24px;
  background: transparent;
  border: 3px solid var(--neo-bg);
  color: var(--neo-bg);
  padding: 14px 28px;
  font-weight: 900;
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 4px 4px 0 0 var(--neo-bg);
  transition: all 0.15s ease;
}

.neo-back-top:hover {
  background: var(--neo-yellow);
  color: var(--neo-black);
  border-color: var(--neo-yellow);
  box-shadow: 4px 4px 0 0 var(--neo-yellow);
}

/* responsive */
@media (min-width: 768px) {
  .neo-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .neo-contrib-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .neo-timeline-item {
    grid-template-columns: 140px 24px 1fr;
  }
}

@media (min-width: 1024px) {
  .neo-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .neo-contrib-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
