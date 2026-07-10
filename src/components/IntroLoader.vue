<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const visible = ref(true)
const exiting = ref(false)
const progress = ref(0)
const label = ref('INITIALIZING')

const labels = ['INITIALIZING', 'LOADING SYSTEMS', 'COMPILING UI', 'ALMOST THERE']

const cursor = reactive({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
const target = { x: cursor.x, y: cursor.y }
const FOLLOW_EASE = 0.07

let rafId = 0

function handlePointerMove(e: PointerEvent) {
  target.x = e.clientX
  target.y = e.clientY
}

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
  window.addEventListener('pointermove', handlePointerMove)

  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const pct = prefersReducedMotion ? Math.min(100, (elapsed / duration) * 100) : progressAt(elapsed)
    progress.value = Math.floor(pct)
    label.value = labels[Math.min(labels.length - 1, Math.floor((pct / 100) * labels.length))]

    cursor.x += (target.x - cursor.x) * FOLLOW_EASE
    cursor.y += (target.y - cursor.y) * FOLLOW_EASE

    if (elapsed < duration) {
      rafId = requestAnimationFrame(tick)
    } else {
      finish()
    }
  }

  function finish() {
    sessionStorage.setItem('kdr-intro-seen', '1')
    exiting.value = true
    document.body.style.overflow = ''
    window.removeEventListener('pointermove', handlePointerMove)
    setTimeout(() => {
      visible.value = false
    }, 900)
  }

  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('pointermove', handlePointerMove)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="visible" class="intro-loader" :class="{ 'is-exiting': exiting }">
    <div class="intro-grain" aria-hidden="true"></div>

    <div class="intro-top">
      <span class="intro-tag">SYS_INDEX // BOOT</span>
      <span class="intro-tag">{{ label }}</span>
      <span class="intro-tag">KARLO DELA ROSA</span>
    </div>

    <div
      class="intro-percent-anchor"
      :style="{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }"
    >
      <div class="intro-percent">
        {{ String(progress).padStart(2, '0') }}<span class="intro-percent-sign">%</span>
      </div>
    </div>

    <div class="intro-bottom">
      <div class="intro-bar-track">
        <div class="intro-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 64px;
  background-color: #fcfbfa;
  color: #080809;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.7s ease 0.2s;
}

@media (max-width: 768px) {
  .intro-loader {
    padding: 28px 24px;
  }
}

.intro-loader.is-exiting {
  transform: translateY(-100%);
  opacity: 0.96;
}

.intro-grain {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.06;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}

.intro-top {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #64748b;
}

@media (max-width: 768px) {
  .intro-top .intro-tag:nth-child(3) {
    display: none;
  }
}

.intro-percent-anchor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  will-change: transform;
}

.intro-percent {
  display: flex;
  align-items: flex-start;
  transform: translate(-50%, -50%);
  font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 800;
  font-size: clamp(120px, 24vw, 440px);
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, #3457e0, #8a2be2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.intro-percent-sign {
  font-size: 0.32em;
  margin-left: 0.08em;
  margin-top: 0.14em;
}

.intro-bottom {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.intro-bar-track {
  flex: 1;
  height: 2px;
  background-color: #e3e1da;
}

.intro-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3457e0, #8a2be2);
  transition: width 0.1s linear;
}

@media (prefers-reduced-motion: reduce) {
  .intro-percent-anchor {
    position: static;
    transform: none !important;
  }

  .intro-percent {
    transform: none;
    display: block;
    text-align: center;
    margin: auto 0;
  }
}
</style>
