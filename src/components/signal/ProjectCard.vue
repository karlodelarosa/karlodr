<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project } from '../../data/signal'
import { useTilt } from '../../composables/useTilt'
import { useSignalAudio } from '../../composables/useSignalAudio'

const props = defineProps<{ project: Project }>()

const canHover = ref(true)
const expanded = ref(false)
const panelId = `card-more-${props.project.id}`

onMounted(() => {
  canHover.value = window.matchMedia('(hover: hover)').matches
})

const { onMove: onTiltMove, onLeave: onTiltLeave } = useTilt(5)

function onCardMove(e: MouseEvent) {
  if (canHover.value) onTiltMove(e)
}
function onCardLeave(e: MouseEvent) {
  if (canHover.value) onTiltLeave(e)
}

const { playClick } = useSignalAudio()

function onToggleClick() {
  toggle()
  playClick()
}

const statusLabel: Record<Project['status'], string> = {
  live: 'live',
  archived: 'archived',
  'in progress': 'in progress',
}

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <div class="card" :class="{ 'idle-blur': canHover }" data-tune @mousemove="onCardMove" @mouseleave="onCardLeave">
    <a
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="card-hit"
      :aria-label="`Open ${project.name} in a new tab`"
      @click="playClick"
    />

    <slot />

    <div class="card-top">
      <span class="freq mono">{{ project.channel }}</span>
      <span class="status mono" :class="project.status.replace(' ', '-')">
        <span class="status-dot" aria-hidden="true"></span>
        {{ statusLabel[project.status] }}
      </span>
    </div>

    <h3 class="card-name">{{ project.name }}</h3>
    <p class="card-summary">{{ project.summary }}</p>

    <button
      type="button"
      class="card-toggle mono"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="onToggleClick"
    >
      {{ expanded ? 'less' : 'more' }}
      <svg class="chevron" :class="{ 'is-open': expanded }" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div :id="panelId" class="card-more" :class="{ open: expanded }">
      <div class="card-more-inner">
        <p class="card-desc">{{ project.description }}</p>

        <ul v-if="project.stack.length" class="card-stack">
          <li v-for="s in project.stack" :key="s" class="mono">{{ s }}</li>
        </ul>

        <div class="card-links">
          <RouterLink :to="{ name: 'work', params: { slug: project.slug } }" class="card-cta card-cta-link mono" @click="playClick">
            case study →
          </RouterLink>
          <span class="card-cta mono">visit site →</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.75rem;
  color: inherit;
  border: 1px solid var(--panel-edge);
  background: var(--panel);
  position: relative;
  overflow: hidden;
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transform-style: preserve-3d;
  transition: border-color 0.3s var(--ease-tune), transform 0.3s var(--ease-tune);
}

.card-hit {
  position: absolute;
  inset: 0;
  z-index: 1;
  text-decoration: none;
}

.card.idle-blur {
  filter: blur(2.5px) grayscale(0.5) brightness(0.82);
  opacity: 0.82;
}

.card:hover,
.card:focus-within {
  filter: none;
  opacity: 1;
  border-color: var(--carrier);
}

/* signal-acquired scan sweep — lives on a pseudo-element so hover
   never nudges the actual text the visitor is reading */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--carrier) 30%, transparent) 45%, transparent 88%);
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}
.card:hover::after {
  animation: scan 0.6s ease-out;
}
@keyframes scan {
  0% {
    transform: translateY(-100%);
    opacity: 0.8;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.card-top {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.freq {
  font-size: 0.72rem;
  color: var(--fog);
  letter-spacing: 0.08em;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fog);
}
.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--fog);
}
.status.live .status-dot {
  background: var(--carrier);
  box-shadow: 0 0 6px var(--carrier);
}
.status.in-progress .status-dot {
  background: var(--interference);
  box-shadow: 0 0 6px var(--interference);
}

.card-name {
  position: relative;
  z-index: 2;
  font-size: 1.4rem;
  color: var(--signal);
  pointer-events: none;
}

.card-summary {
  position: relative;
  z-index: 2;
  color: var(--carrier);
  font-size: 0.92rem;
  pointer-events: none;
}

/* accordion toggle — only does anything below the mobile breakpoint */
.card-toggle {
  display: none;
  position: relative;
  z-index: 2;
  align-self: flex-start;
  align-items: center;
  gap: 0.35rem;
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: -0.3rem 0 -0.5rem;
  color: var(--fog);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.chevron {
  flex-shrink: 0;
  transition: transform 0.3s var(--ease-tune);
}
.chevron.is-open {
  transform: rotate(180deg);
}

.card-more {
  position: relative;
  z-index: 2;
  max-height: none;
  overflow: hidden;
  transition: max-height 0.4s var(--ease-tune);
  pointer-events: none;
}

.card-more-inner {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.card-desc {
  color: var(--fog);
  font-size: 0.92rem;
  line-height: 1.55;
}

.card-stack {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.card-stack li {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--fog);
  border: 1px solid var(--panel-edge);
  padding: 0.25rem 0.55rem;
}

.card-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.card-cta {
  font-size: 0.75rem;
  color: var(--signal);
  letter-spacing: 0.04em;
}

.card-cta-link {
  position: relative;
  z-index: 3;
  pointer-events: auto;
  text-decoration: none;
  transition: color 0.3s var(--ease-tune);
}
.card-cta-link:hover {
  color: var(--carrier);
}

@media (max-width: 640px) {
  .card-toggle {
    display: inline-flex;
  }

  .card-more {
    max-height: 0;
  }
  .card-more.open {
    max-height: 40rem;
  }
}
</style>
