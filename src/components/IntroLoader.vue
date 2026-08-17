<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useIntroState } from '../composables/useIntroState'

const { markIntroComplete, setIntroProgress } = useIntroState()

const visible = ref(true)
const exiting = ref(false)
const progress = ref(0)
const label = ref('ACQUIRING SIGNAL')

const labels = ['ACQUIRING SIGNAL', 'TUNING FREQUENCY', 'LOCKING CARRIER', 'ON AIR']

let rafId = 0

// pct/time keyframes; equal pct back-to-back = a freeze hold
const KEYFRAMES = [
  { pct: 0, t: 0 },
  { pct: 15, t: 900 },
  { pct: 15, t: 1400 },
  { pct: 82, t: 3500 },
  { pct: 82, t: 4000 },
  { pct: 100, t: 5000 },
]

function progressAt(elapsed: number) {
  if (elapsed <= 0) return 0
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i]
    const b = KEYFRAMES[i + 1]
    if (elapsed <= b.t) {
      if (b.t === a.t) return b.pct
      return a.pct + ((b.pct - a.pct) * (elapsed - a.t)) / (b.t - a.t)
    }
  }
  return 100
}

onMounted(() => {
  if (sessionStorage.getItem('kdr-intro-seen')) {
    visible.value = false
    return
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const duration = prefersReducedMotion ? 600 : KEYFRAMES[KEYFRAMES.length - 1].t

  document.body.style.overflow = 'hidden'

  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const pct = prefersReducedMotion ? Math.min(100, (elapsed / duration) * 100) : progressAt(elapsed)
    progress.value = Math.floor(pct)
    label.value = labels[Math.min(labels.length - 1, Math.floor((pct / 100) * labels.length))]
    setIntroProgress(pct / 100)

    if (elapsed < duration) {
      rafId = requestAnimationFrame(tick)
    } else {
      finish()
    }
  }

  function finish() {
    sessionStorage.setItem('kdr-intro-seen', '1')
    exiting.value = true
    markIntroComplete()
    document.body.style.overflow = ''
    setTimeout(() => {
      visible.value = false
    }, 700)
  }

  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="visible" class="intro-loader" :class="{ 'is-exiting': exiting }">
    <div class="intro-grain" aria-hidden="true"></div>

    <div class="intro-inner">
      <p class="intro-mark">K//D</p>
      <div class="intro-meter">
        <div class="intro-meter-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="intro-status">
        {{ label }}<span class="intro-cursor" aria-hidden="true">_</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.intro-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(8, 9, 12, 0.55);
  color: #f2f3f7;
  overflow: hidden;
  font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
  transition: opacity 0.6s var(--intro-ease, cubic-bezier(0.16, 1, 0.3, 1));
}

.intro-loader.is-exiting {
  opacity: 0;
}

.intro-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

.intro-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.intro-mark {
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.3em;
  color: #f2f3f7;
  text-shadow: 0 1px 12px rgba(8, 9, 12, 0.8);
}

.intro-meter {
  width: 11rem;
  height: 2px;
  background: #23262d;
  overflow: hidden;
}

.intro-meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #2de6c8, #ff2d6a);
  transition: width 0.1s linear;
}

.intro-status {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a8d98;
  text-shadow: 0 1px 10px rgba(8, 9, 12, 0.8);
}

.intro-cursor {
  color: #2de6c8;
  animation: intro-blink 0.7s steps(1) infinite;
}

@keyframes intro-blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-cursor {
    animation: none;
  }
}
</style>
