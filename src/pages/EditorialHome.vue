<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Grain from '../components/signal/Grain.vue'
import SignalStrip from '../components/signal/SignalStrip.vue'
import Hero from '../components/signal/Hero.vue'
import About from '../components/signal/About.vue'
import Work from '../components/signal/Work.vue'
import Stack from '../components/signal/Stack.vue'
import Log from '../components/signal/Log.vue'
import Contact from '../components/signal/Contact.vue'
import SignalFooter from '../components/signal/SignalFooter.vue'
import { useIntroState } from '../composables/useIntroState'

const { introComplete } = useIntroState()

// scales the rem base up while this page is mounted, matching the design's
// intended type scale, without touching the root font-size on other pages
onMounted(() => document.documentElement.classList.add('signal-root'))
onUnmounted(() => document.documentElement.classList.remove('signal-root'))
</script>

<template>
  <div class="signal-home">
    <div class="chrome" :class="{ 'is-revealed': introComplete }">
      <Grain />
      <SignalStrip />
    </div>

    <main>
      <Hero />
      <About />
      <Work />
      <Stack />
      <Log />
      <Contact />
    </main>

    <SignalFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.signal-home {
  --void: #08090c;
  --panel: #131519;
  --panel-edge: #23262d;
  --fog: #8a8d98;
  --signal: #f2f3f7;
  --interference: #ff2d6a;
  --carrier: #2de6c8;

  --font-display: 'Unbounded', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;

  --strip-w: 3.25rem;
  --edge: 1.5rem;
  --ease-tune: cubic-bezier(0.16, 1, 0.3, 1);

  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--void);
  color: var(--signal);
  font-family: var(--font-body);
  padding-left: var(--strip-w);
}

@media (min-width: 720px) {
  .signal-home {
    --strip-w: 4rem;
    --edge: 3rem;
  }
}

.signal-home img,
.signal-home svg {
  display: block;
  max-width: 100%;
}

/* nav rail + grain stay out of the way until the loader hands off, so the
   liquid field is the only thing carrying through the build-up. Kept quick
   and decisive (unlike the slow hero reveal) — the strip's own labels rest
   at a dim 0.45 opacity by design, so a long fade reads as "never arrives"
   against the bold hero text; a fast one reads as "here from the start" */
.signal-home .chrome {
  opacity: 0;
  transition: opacity 1.2s var(--ease-tune);
}

.signal-home .chrome.is-revealed {
  opacity: 1;
}

.signal-home a {
  color: inherit;
}

.signal-home ::selection {
  background: var(--interference);
  color: var(--void);
}

.signal-home :focus-visible {
  outline: 2px solid var(--carrier);
  outline-offset: 3px;
  border-radius: 2px;
}

.signal-home h1,
.signal-home h2,
.signal-home h3 {
  font-family: var(--font-display);
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.01em;
}

.signal-home .liquid-text,
.signal-home .chroma {
  max-width: 100%;
  overflow-wrap: break-word;
}

.signal-home p {
  margin: 0;
}

.signal-home main,
.signal-home .site-footer {
  position: relative;
  z-index: 3;
}

.signal-home .wrap {
  padding-inline: var(--edge);
  max-width: 74rem;
  margin-inline: auto;
}

.signal-home .mono {
  font-family: var(--font-mono);
}

.signal-home .tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
}

/* chromatic aberration text utility */
.signal-home .chroma {
  position: relative;
  display: inline-block;
}
.signal-home .chroma::before,
.signal-home .chroma::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0.7;
  mix-blend-mode: screen;
}
.signal-home .chroma::before {
  color: var(--interference);
  transform: translate(var(--chroma-x, 2px), 0);
}
.signal-home .chroma::after {
  color: var(--carrier);
  transform: translate(calc(var(--chroma-x, 2px) * -1), 0);
}

/* settle: snaps from noisy offset into a small resting jitter, like tuning a dial in.
   Hero's name uses the slow variant to match its 5s buildup; every other
   heading uses settle-quick, paced to the faster scroll-reveal transitions. */
.signal-home .chroma.settle::before {
  animation: signal-settleR 4.2s var(--ease-tune) both, signal-jitterR 4.2s ease-in-out 4.2s infinite;
}
.signal-home .chroma.settle::after {
  animation: signal-settleC 4.2s var(--ease-tune) both, signal-jitterC 4.2s ease-in-out 4.2s infinite;
}
.signal-home .chroma.settle-quick::before {
  animation: signal-settleR 1s var(--ease-tune) both, signal-jitterR 4.2s ease-in-out 1s infinite;
}
.signal-home .chroma.settle-quick::after {
  animation: signal-settleC 1s var(--ease-tune) both, signal-jitterC 4.2s ease-in-out 1s infinite;
}
@keyframes signal-settleR {
  0% {
    transform: translate(16px, -6px);
    opacity: 1;
  }
  60% {
    transform: translate(3px, 0);
  }
  100% {
    transform: translate(2px, 0);
    opacity: 0.7;
  }
}
@keyframes signal-settleC {
  0% {
    transform: translate(-16px, 6px);
    opacity: 1;
  }
  60% {
    transform: translate(-3px, 0);
  }
  100% {
    transform: translate(-2px, 0);
    opacity: 0.7;
  }
}
@keyframes signal-jitterR {
  0%,
  100% {
    transform: translate(2px, 0);
  }
  50% {
    transform: translate(2.6px, -0.4px);
  }
}
@keyframes signal-jitterC {
  0%,
  100% {
    transform: translate(-2px, 0);
  }
  50% {
    transform: translate(-2.6px, 0.4px);
  }
}

/* section rhythm */
.signal-home section {
  padding-block: clamp(4rem, 10vw, 8rem);
  border-bottom: 1px solid var(--panel-edge);
  position: relative;
  z-index: 3;
}
.signal-home section:last-of-type {
  border-bottom: none;
}

.signal-home .scanline-rule {
  height: 1px;
  background: linear-gradient(90deg, var(--panel-edge) 0%, var(--carrier) 45%, var(--interference) 55%, var(--panel-edge) 100%);
  opacity: 0.6;
  margin-block: 1.25rem 2.5rem;
}

@media (prefers-reduced-motion: reduce) {
  .signal-home * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>
