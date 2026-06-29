<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import OpenLink from './svg/OpenLink.vue'
import { PROJECT_DATA } from '../data/project'

const props = defineProps<{
  variant: 'bento' | 'classic' | 'brutalist' | 'immersive'
}>()

type ProjectItem = {
  title: string
  description: string
  thumbnail: string
  url: string
  tags?: string[]
  featured?: boolean
  group: string
}

const allProjects = computed<ProjectItem[]>(() =>
  PROJECT_DATA.flatMap((group: { name: string; items: Omit<ProjectItem, 'group'>[] }) =>
    group.items.map((item) => ({
      ...item,
      group: group.name,
    }))
  )
)

const featuredProjects = computed(() => allProjects.value.filter((p) => p.featured))

function onCardMove(e: MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  const tilt = props.variant === 'immersive' ? 14 : 6
  el.style.setProperty('--tilt-x', `${y * -tilt}deg`)
  el.style.setProperty('--tilt-y', `${x * tilt}deg`)
  if (props.variant === 'immersive') {
    const lift = 28 + (Math.abs(x) + Math.abs(y)) * 36
    el.style.setProperty('--lift-z', `${lift}px`)
  }
}

function onCardLeave(el: HTMLElement) {
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
  if (props.variant === 'immersive') {
    el.style.setProperty('--lift-z', '0px')
  }
}

let floatRaf = 0

function updateImmersiveCardDepth() {
  const cards = document.querySelectorAll<HTMLElement>('.showcase--immersive .showcase-card')
  cards.forEach((el, i) => {
    const rect = el.getBoundingClientRect()
    const center = rect.top + rect.height / 2
    const viewCenter = window.innerHeight / 2
    const dist = (center - viewCenter) / window.innerHeight
    const float = dist * -36
    const depth = Math.max(0, (1 - Math.abs(dist) * 1.4) * 50 + (i % 3) * 18)
    el.style.setProperty('--scroll-float', `${float}px`)
    el.style.setProperty('--depth-z', `${depth}px`)
  })
}

function onImmersiveScroll() {
  cancelAnimationFrame(floatRaf)
  floatRaf = requestAnimationFrame(updateImmersiveCardDepth)
}

onMounted(() => {
  if (props.variant !== 'immersive') return
  updateImmersiveCardDepth()
  window.addEventListener('scroll', onImmersiveScroll, { passive: true })
  window.addEventListener('resize', onImmersiveScroll, { passive: true })
})

onUnmounted(() => {
  if (props.variant !== 'immersive') return
  window.removeEventListener('scroll', onImmersiveScroll)
  window.removeEventListener('resize', onImmersiveScroll)
  cancelAnimationFrame(floatRaf)
})

const accentPalette = ['#297ccf', '#46cf98', '#04b6c1', '#6c5ce7', '#ff9f43']

function projectAccent(index: number) {
  return accentPalette[index % accentPalette.length]
}
</script>

<template>
  <section
    :id="variant === 'classic' ? undefined : 'projects'"
    :class="['showcase', `showcase--${variant}`, { 'immersive-snap-chapter': variant === 'immersive' }]"
  >
    <div class="showcase-inner">
      <!-- header -->
      <header
        v-motion
        class="showcase-head"
        :initial="{ opacity: 0, y: 48 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 900 } }"
      >
        <p class="showcase-eyebrow">Selected work</p>
        <h2 class="showcase-title">
          <span class="showcase-title-line">Projects</span>
          <span class="showcase-title-ghost" aria-hidden="true">Projects</span>
        </h2>
        <p class="showcase-lead">
          Ministry platforms, product UI, and experiments — built to ship.
        </p>
      </header>

      <!-- featured mosaic -->
      <div class="showcase-mosaic">
        <a
          v-for="(item, i) in featuredProjects"
          :key="item.url"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          v-motion
          class="showcase-card showcase-card--featured"
          :class="`showcase-card--slot-${i}`"
          :style="{ '--accent': projectAccent(i), '--slot-index': i }"
          :initial="{ opacity: 0, y: 60 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: i * 120 } }"
          @mousemove="onCardMove($event, $event.currentTarget as HTMLElement)"
          @mouseleave="onCardLeave($event.currentTarget as HTMLElement)"
        >
          <div class="showcase-card-media">
            <img :src="item.thumbnail" :alt="`${item.title} preview`" loading="lazy" />
            <div class="showcase-card-shine" aria-hidden="true" />
          </div>
          <div class="showcase-card-veil" aria-hidden="true" />
          <div class="showcase-card-content">
            <span class="showcase-card-index">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="showcase-card-group">{{ item.group }}</span>
            <h3 class="showcase-card-title">{{ item.title }}</h3>
            <p class="showcase-card-desc">{{ item.description }}</p>
            <div v-if="item.tags?.length" class="showcase-tags">
              <span v-for="tag in item.tags" :key="tag" class="showcase-tag">{{ tag }}</span>
            </div>
            <span class="showcase-visit">
              <OpenLink class="showcase-visit-icon" />
              Open project
            </span>
          </div>
          <span class="showcase-card-ring" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── shared ─── */
.showcase {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.showcase-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(72px, 12vw, 120px) clamp(20px, 4vw, 32px) 0;
}

.showcase-eyebrow {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.showcase-title {
  position: relative;
  margin-bottom: 20px;
}

.showcase-title-line {
  position: relative;
  z-index: 1;
  display: block;
  font-size: clamp(2.8rem, 9vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  text-transform: uppercase;
}

.showcase-title-ghost {
  position: absolute;
  top: 0.08em;
  left: 0.04em;
  font-size: clamp(2.8rem, 9vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  text-transform: uppercase;
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
}

.showcase-lead {
  max-width: 480px;
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.6;
  margin-bottom: clamp(40px, 6vw, 64px);
}

/* mosaic grid */
.showcase-mosaic {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: clamp(48px, 8vw, 80px);
}

.showcase-card {
  position: relative;
  display: block;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
  will-change: transform;
}

.showcase-card--featured {
  min-height: 280px;
}

.showcase-card-media {
  position: absolute;
  inset: 0;
}

.showcase-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
}

.showcase-card:hover .showcase-card-media img {
  transform: scale(1.06);
}

.showcase-card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    125deg,
    transparent 30%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.showcase-card:hover .showcase-card-shine {
  transform: translateX(100%);
}

.showcase-card-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 0.45) 45%,
    rgba(0, 0, 0, 0.1) 100%
  );
  transition: opacity 0.4s ease;
}

.showcase-card-veil--strip {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, transparent 70%);
}

.showcase-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
  padding: clamp(20px, 4vw, 32px);
  gap: 8px;
}

.showcase-card-index {
  position: absolute;
  top: clamp(12px, 2vw, 20px);
  right: clamp(16px, 3vw, 24px);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1;
  opacity: 0.12;
  letter-spacing: -0.04em;
}

.showcase-card-group {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}

.showcase-card-title {
  font-size: clamp(1.35rem, 3.5vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.showcase-card-desc {
  font-size: 0.9rem;
  line-height: 1.55;
  opacity: 0.75;
  max-width: 52ch;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.showcase-card:hover .showcase-card-desc {
  opacity: 0.95;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.showcase-tag {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.showcase-visit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.showcase-card:hover .showcase-visit {
  opacity: 1;
  transform: translateY(0);
}

.showcase-visit--compact {
  opacity: 1;
  transform: none;
  margin-top: 8px;
}

.showcase-visit-icon {
  width: 13px;
}

.showcase-card-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  pointer-events: none;
}

.showcase-card:hover .showcase-card-ring {
  border-color: color-mix(in srgb, var(--accent) 55%, transparent);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent),
    0 24px 64px color-mix(in srgb, var(--accent) 18%, transparent);
}

/* mosaic layout desktop */
@media (min-width: 768px) {
  .showcase-mosaic {
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(200px, auto);
    gap: 18px;
  }

  .showcase-card--slot-0 {
    grid-column: span 7;
    grid-row: span 2;
    min-height: 420px;
  }

  .showcase-card--slot-1 {
    grid-column: span 5;
    min-height: 200px;
  }

  .showcase-card--slot-2 {
    grid-column: span 5;
    min-height: 200px;
  }
}

@media (min-width: 1024px) {
  .showcase-card--slot-0 {
    min-height: 480px;
  }
}

/* ─── bento theme ─── */
.showcase--bento .showcase-eyebrow {
  color: #46cf98;
}

.showcase--bento .showcase-title-line {
  color: #f4f4f8;
}

.showcase--bento .showcase-lead {
  color: rgba(244, 244, 248, 0.62);
}

.showcase--bento .showcase-card {
  background: #0a0a10;
}

.showcase--bento .showcase-card-content {
  color: #f4f4f8;
}

/* ─── classic theme ─── */
.showcase--classic .showcase-inner {
  max-width: 1100px;
}

.showcase--classic .showcase-eyebrow {
  color: #04b6c1;
}

.showcase--classic .showcase-title-line {
  color: #f4f4f8;
}

.showcase--classic .showcase-lead {
  color: rgba(244, 244, 248, 0.62);
}

.showcase--classic .showcase-card {
  background: #050505;
  border-radius: 16px;
}

.showcase--classic .showcase-card-content {
  color: #f4f4f8;
}

/* ─── brutalist theme ─── */
.showcase--brutalist {
  padding: 0 0 80px;
}

.showcase--brutalist .showcase-eyebrow {
  color: #000;
  background: #ffe566;
  display: inline-block;
  padding: 6px 12px;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 0 #000;
}

.showcase--brutalist .showcase-title-line {
  color: #000;
}

.showcase--brutalist .showcase-title-ghost {
  color: #000;
  opacity: 0.06;
}

.showcase--brutalist .showcase-lead {
  color: #333;
  font-weight: 600;
}

.showcase--brutalist .showcase-card {
  border-radius: 0;
  border: 3px solid #000;
  box-shadow: 8px 8px 0 0 #000;
}

.showcase--brutalist .showcase-card:hover {
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))
    translate(3px, 3px);
  box-shadow: 3px 3px 0 0 #000;
}

.showcase--brutalist .showcase-card-ring {
  display: none;
}

.showcase--brutalist .showcase-card-veil {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 65%);
}

.showcase--brutalist .showcase-tag {
  border: 2px solid #000;
  background: #ffe566;
  color: #000;
  backdrop-filter: none;
}

.showcase--brutalist .showcase-card-content {
  color: #fff;
}

.showcase--brutalist .showcase-visit {
  color: #ffe566;
}

/* ─── immersive theme ─── */
.showcase--immersive {
  position: relative;
  z-index: 2;
  padding-left: 72px;
  padding-right: 28px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: start;
}

.showcase--immersive .showcase-mosaic {
  perspective: 1500px;
  perspective-origin: 50% 42%;
}

.showcase--immersive .showcase-card {
  transform-style: preserve-3d;
  transform: perspective(1200px)
    translateZ(calc(var(--depth-z, 0px) + var(--lift-z, 0px)))
    translateY(var(--scroll-float, 0px))
    rotateX(var(--tilt-x, 0deg))
    rotateY(var(--tilt-y, 0deg));
  background: rgba(8, 10, 22, 0.55);
  border: 1px solid rgba(110, 200, 255, 0.14);
  backdrop-filter: blur(12px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(110, 200, 255, 0.05) inset;
}

.showcase--immersive .showcase-card--slot-0 {
  --base-depth: 52px;
}

.showcase--immersive .showcase-card--slot-1 {
  --base-depth: 24px;
}

.showcase--immersive .showcase-card--slot-2 {
  --base-depth: 38px;
}

.showcase--immersive .showcase-card-media {
  animation: immersive-media-float 5.5s ease-in-out infinite;
  animation-delay: calc(var(--slot-index, 0) * -1.3s);
}

@keyframes immersive-media-float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.015);
  }
}

.showcase--immersive .showcase-card:hover {
  border-color: rgba(110, 200, 255, 0.35);
  box-shadow:
    0 28px 80px rgba(110, 200, 255, 0.18),
    0 0 40px rgba(70, 207, 152, 0.08);
}

.showcase--immersive .showcase-eyebrow {
  color: #6ec8ff;
}

.showcase--immersive .showcase-title-line {
  color: #f0f4ff;
}

.showcase--immersive .showcase-title-ghost {
  color: #6ec8ff;
  opacity: 0.06;
}

.showcase--immersive .showcase-lead {
  color: rgba(240, 244, 255, 0.58);
}

.showcase--immersive .showcase-card-ring {
  border-color: rgba(70, 207, 152, 0.35);
}

.showcase--immersive .showcase-tag {
  background: rgba(110, 200, 255, 0.12);
  border-color: rgba(110, 200, 255, 0.25);
  color: #f0f4ff;
}

.showcase--immersive .showcase-card-content {
  color: #f0f4ff;
}

.showcase--immersive .showcase-visit {
  color: #46cf98;
}

@media (max-width: 768px) {
  .showcase--immersive {
    padding-left: 24px;
    padding-right: 24px;
    min-height: auto;
  }

  .showcase--immersive .showcase-card {
    transform: perspective(900px)
      translateY(var(--scroll-float, 0px))
      rotateX(var(--tilt-x, 0deg))
      rotateY(var(--tilt-y, 0deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .showcase-card {
    transform: none !important;
    transition: none !important;
  }

  .showcase--immersive .showcase-card-media {
    animation: none !important;
  }

  .showcase-card-media img,
  .showcase-card-shine,
  .showcase-visit {
    transition: none !important;
  }

  .showcase-card:hover .showcase-card-media img {
    transform: none;
  }

  .showcase-visit {
    opacity: 1;
    transform: none;
  }
}
</style>
