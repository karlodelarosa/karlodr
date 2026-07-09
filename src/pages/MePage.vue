<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useMagnetic } from '../composables/useMagnetic'
import { useLiquidMetalText } from '../composables/useLiquidMetalText'

const { onMagneticMove, onMagneticLeave } = useMagnetic()

const stageRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasReady = ref(false)

useLiquidMetalText(canvasRef, stageRef, ['KRLABS'], (ready) => {
  canvasReady.value = ready
})
</script>

<template>
  <div class="me-page">
    <div class="grain-overlay" aria-hidden="true"></div>

    <header>
      <RouterLink to="/" class="back-link">← Home</RouterLink>
      <span class="me-tag"><span class="live-dot" aria-hidden="true"></span>SYS_INDEX // ME</span>
    </header>

    <div class="hello-row">
      <div class="hello-text">
        SAY HELLO<br />
        <a href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </div>
      <a
        href="mailto:karlordr@gmail.com"
        class="hello-btn"
        aria-label="Email Karlo"
        @mousemove="onMagneticMove($event, 0.3, 12)"
        @mouseleave="onMagneticLeave"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M7 17 17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>

    <main>
      <div class="giant-name-stage" ref="stageRef">
        <canvas ref="canvasRef" class="liquid-canvas" aria-hidden="true"></canvas>
        <h1 class="giant-name" :class="{ 'is-hidden': canvasReady }">
          <span class="name-line">KRLABS</span>
        </h1>
      </div>
    </main>

    <footer class="contact-block">
      <div class="contact-row">
        <span class="contact-label">Phone</span>
        <a class="contact-value" href="tel:639511945392">+63 951 194 5392</a>
      </div>
      <div class="contact-row">
        <span class="contact-label">Email</span>
        <a class="contact-value" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.me-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 64px;
  background-color: #fcfbfa;
  color: #080809;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .me-page {
    padding: 32px;
  }
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
  20% {
    transform: translate(-4%, 2%);
  }
  40% {
    transform: translate(-2%, -6%);
  }
  60% {
    transform: translate(6%, 0%);
  }
  80% {
    transform: translate(-4%, -2%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .grain-overlay {
    animation: none;
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  position: relative;
}

.back-link {
  font-size: 12px;
  font-weight: 800;
  color: #080809;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #64748b;
}

.me-tag {
  display: inline-flex;
  align-items: center;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
}

.live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: #64748b;
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

.hello-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  z-index: 10;
  position: relative;
  margin-top: 48px;
}

.hello-text {
  font-size: clamp(18px, 2.4vw, 26px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.hello-text a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.hello-text a:hover {
  color: #080809;
}

.hello-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1.5px solid #080809;
  color: #080809;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.hello-btn:hover {
  background-color: #080809;
  color: #fcfbfa;
}

@media (max-width: 640px) {
  .hello-btn {
    width: 52px;
    height: 52px;
  }
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: relative;
  width: calc(100% + 128px);
  margin: 0 -64px;
  overflow: hidden;
}

@media (max-width: 768px) {
  main {
    width: calc(100% + 64px);
    margin: 0 -32px;
  }
}

.giant-name-stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.liquid-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.giant-name {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 800;
  line-height: 0.84;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  text-align: center;
  transition: opacity 0.3s ease;
}

.giant-name.is-hidden {
  opacity: 0;
}

.name-line {
  display: inline-block;
  font-size: clamp(56px, 15vw, 260px);
  animation: name-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes name-reveal {
  0% {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .name-line {
    animation: none;
  }
}

.contact-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid #e2e8f0;
  padding-top: 24px;
  z-index: 10;
  position: relative;
}

@media (min-width: 640px) {
  .contact-block {
    flex-direction: row;
    justify-content: space-between;
    gap: 64px;
  }
}

.contact-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.contact-label {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #64748b;
}

.contact-value {
  position: relative;
  font-size: clamp(16px, 2.6vw, 22px);
  font-weight: 800;
  color: #080809;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.contact-value::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  background-color: #080809;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.contact-value:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
