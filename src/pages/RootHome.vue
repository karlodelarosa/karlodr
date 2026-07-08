<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { ROOT_NAV_NODES } from '../data/root-nav'
import { useTilt } from '../composables/useTilt'

const { onMove, onLeave } = useTilt()

const sysNode = ref('INITIALIZING...')
const sysClock = ref('00:00:00.000')
const nodeLocked = ref(false)

function formatManilaClock(now: Date) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Manila',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  const timeString = now.toLocaleTimeString('en-US', options)
  const ms = String(now.getMilliseconds()).padStart(3, '0')
  return `${timeString}.${ms}`
}

const { pause: pauseClock } = useIntervalFn(
  () => {
    sysClock.value = formatManilaClock(new Date())
  },
  16,
  { immediate: true }
)

let bootInterval: ReturnType<typeof setInterval> | null = null

function bootDiagnosticMatrix() {
  const targetText = 'MNL_NODE // GRID'
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//'
  let iterations = 0

  bootInterval = setInterval(() => {
    sysNode.value = targetText
      .split('')
      .map((_char, index) => {
        if (index < iterations) return targetText[index]
        return characters[Math.floor(Math.random() * characters.length)]
      })
      .join('')

    if (iterations >= targetText.length) {
      if (bootInterval) clearInterval(bootInterval)
      bootInterval = null
      nodeLocked.value = true
    }
    iterations += 1 / 3
  }, 40)
}

onMounted(() => {
  document.documentElement.classList.add('dark')
  bootDiagnosticMatrix()
})

onUnmounted(() => {
  pauseClock()
  if (bootInterval) clearInterval(bootInterval)
})
</script>

<template>
  <div class="root-page">
    <div class="container">
      <header>
        <div class="identity-row">
          <h1>Karlo Dela Rosa</h1>
          <span class="sub-label">● DEVELOPER</span>
        </div>
      </header>

      <!-- <section class="diagnostic-panel" aria-label="System diagnostics">
        <div class="dia-node">
          <span class="dia-label">System Node</span>
          <span class="dia-val" :class="{ locked: nodeLocked }">{{ sysNode }}</span>
        </div>
        <div class="dia-node">
          <span class="dia-label">Local Coordinates</span>
          <span class="dia-val">14.5995° N, 120.9842° E</span>
        </div>
        <div class="dia-node">
          <span class="dia-label">Local Matrix Time</span>
          <span class="dia-val">{{ sysClock }}</span>
        </div>
        <div class="dia-node">
          <span class="dia-label">Active Stack Mode</span>
          <span class="dia-val accent">Vue // TS // CF Workers</span>
        </div>
      </section> -->

      <main>
        <div class="directory-title">System Folders</div>
        <nav class="system-nav" aria-label="Site sections">
          <RouterLink
            v-for="node in ROOT_NAV_NODES"
            :key="node.path"
            :to="node.path"
            class="nav-node"
            @mousemove="onMove"
            @mouseleave="onLeave"
          >
            <span class="node-path">{{ node.path }}</span>
            <div class="node-meta">
              <span class="node-title">{{ node.title }}</span>
              <span class="node-desc">{{ node.description }}</span>
            </div>
          </RouterLink>
        </nav>
      </main>

      <footer>
        <a href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/root-theme.css';

header {
  margin-bottom: 3.5rem;
}

.identity-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

.sub-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--accent);
  animation: pulse 2s infinite alternate;
}

.diagnostic-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem 1.5rem;
}

.dia-node {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dia-val.locked {
  color: var(--terminal-green);
}

.system-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-node {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 1.5rem;
  transform: perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.2s ease;
}

.nav-node:hover {
  background: var(--surface-hover);
  border-color: #333;
}

.node-path {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #a3a3a3;
  transition: color 0.15s ease;
}

.nav-node:hover .node-path {
  color: var(--accent);
}

.node-meta {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.node-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
}

.node-desc {
  font-size: 0.85rem;
  color: #a3a3a3;
}

@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 550px) {
  .diagnostic-panel {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .nav-node {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding: 1rem;
  }

  .node-desc {
    margin-top: 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sub-label {
    animation: none;
    opacity: 1;
  }

  .nav-node {
    transform: none;
  }
}
</style>
