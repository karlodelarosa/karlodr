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

    <main class="me-main">
      <div class="giant-name-stage" ref="stageRef">
        <canvas ref="canvasRef" class="liquid-canvas" aria-hidden="true"></canvas>
        <h1 class="giant-name" :class="{ 'is-hidden': canvasReady }">
          <span class="name-line">KRLABS</span>
        </h1>
      </div>
      <p class="tagline">Keep Resolving. Keep Refining. Keep Reimagining.</p>
    </main>

    <footer class="contact-block">
      <div class="contact-row">
        <span class="contact-label">Phone</span>
        <a class="contact-value" href="tel:639511945392">+63 951 194 5392</a>
      </div>
      <nav class="social-nav" aria-label="Social links">
        <a
          href="https://www.facebook.com/karlodelarosa"
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path
              d="M13.5 22v-8.4h2.8l.42-3.3h-3.22V8.2c0-.95.26-1.6 1.63-1.6h1.74V3.6a23 23 0 0 0-2.53-.13c-2.5 0-4.22 1.53-4.22 4.33v2.5H7v3.3h2.32V22h3.18Z"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/karlo-dela-rosa/"
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path
              d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
            />
          </svg>
        </a>
        <a
          href="https://github.com/karlodelarosa"
          target="_blank"
          rel="noopener noreferrer"
          class="social-icon"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path
              d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
            />
          </svg>
        </a>
      </nav>
      <div class="contact-row">
        <span class="contact-label">Email</span>
        <a class="contact-value" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.me-main {
  display: flex;
  flex-direction: column;
  position: relative
}

.me-main .tagline {
  font-family: ui-monospace, monospace;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #565656;
  font-weight: 600;
  position: absolute;
  bottom: 50px;
  padding-inline: 32px;
    text-align: center;
}

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

.social-nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid #080809;
  color: #080809;
  transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

.social-icon:hover {
  background-color: #080809;
  color: #fcfbfa;
  transform: translateY(-2px);
}
</style>
