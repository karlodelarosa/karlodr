<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref, watch } from 'vue'
import { useSignalAudio } from '../../composables/useSignalAudio'

const { enabled: audioEnabled, playTune, toggle: toggleAudio } = useSignalAudio()

type Channel = { id: string; label: string; freq: string }

const channels: Channel[] = [
  { id: 'hero', label: 'HERO', freq: '88.3' },
  { id: 'about', label: 'ABOUT', freq: '91.9' },
  { id: 'work', label: 'WORK', freq: '94.7' },
  { id: 'stack', label: 'STACK', freq: '101.5' },
  { id: 'log', label: 'LOG', freq: '104.2' },
  { id: 'contact', label: 'MSG', freq: '107.1' },
]

const activeId = ref('hero')
const progress = ref(0) // 0..1 scroll progress, drives the meter
let observer: IntersectionObserver | null = null
let tuneReady = false // suppress the "tuning" sound for the initial/mount assignment

watch(activeId, () => {
  if (tuneReady) playTune()
})

function onScroll() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

onMounted(() => {
  const sections = channels.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) activeId.value = visible.target.id
    },
    { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  sections.forEach((el) => observer!.observe(el))

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  nextTick(() => {
    tuneReady = true
  })
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
})

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <aside class="strip" aria-label="Section tuner">
    <a class="mark" href="#hero" aria-label="Back to top">K//D</a>

    <nav class="channels">
      <button
        v-for="c in channels"
        :key="c.id"
        type="button"
        class="channel"
        :class="{ active: activeId === c.id }"
        @click="go(c.id)"
      >
        <span class="freq mono" aria-hidden="true">{{ c.freq }}</span>
        <span class="label">{{ c.label }}</span>
      </button>
    </nav>

    <div class="strip-bottom">
      <div class="meter" aria-hidden="true">
        <div class="meter-fill" :style="{ height: `${progress * 100}%` }"></div>
      </div>

      <button
        type="button"
        class="audio-toggle mono"
        :class="{ active: audioEnabled }"
        :aria-pressed="audioEnabled"
        aria-label="Toggle interface sound"
        @click="toggleAudio"
      >
        <span class="audio-dot" aria-hidden="true"></span>
        snd
      </button>
    </div>
  </aside>
</template>

<style scoped>
.strip {
  position: fixed;
  inset: 0 auto 0 0;
  width: var(--strip-w);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-block: 1.25rem;
  border-right: 1px solid var(--panel-edge);
  background: linear-gradient(180deg, var(--void), #0b0c10 60%, var(--void));
  z-index: 50;
}

.mark {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--fog);
  text-decoration: none;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transition: color 0.3s var(--ease-tune);
}
.mark:hover {
  color: var(--carrier);
}

.channels {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1rem, 4vh, 2.25rem);
}

.channel {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: var(--fog);
  filter: blur(1.5px);
  opacity: 0.45;
  transition: filter 0.5s var(--ease-tune), opacity 0.5s var(--ease-tune), color 0.5s var(--ease-tune);
}

.channel .freq {
  font-size: 0.6rem;
  opacity: 0.7;
}

.channel .label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  font-weight: 500;
}

.channel:hover {
  filter: blur(0);
  opacity: 0.8;
}

.channel.active {
  filter: blur(0);
  opacity: 1;
  color: var(--signal);
}

.channel.active .freq {
  color: var(--carrier);
  opacity: 1;
}

.channel.active .label {
  text-shadow: 0 0 12px color-mix(in srgb, var(--carrier) 55%, transparent);
}

.strip-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.meter {
  width: 2px;
  height: 4rem;
  background: var(--panel-edge);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.meter-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(180deg, var(--carrier), var(--interference));
  transition: height 0.15s linear;
}

.audio-toggle {
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
  transition: color 0.3s var(--ease-tune);
}
.audio-toggle:hover {
  color: var(--signal);
}

.audio-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--panel-edge);
  transition: background 0.3s var(--ease-tune), box-shadow 0.3s var(--ease-tune);
}

.audio-toggle.active {
  color: var(--carrier);
}
.audio-toggle.active .audio-dot {
  background: var(--carrier);
  box-shadow: 0 0 6px var(--carrier);
}

@media (max-width: 719px) {
  .mark {
    font-size: 0.6rem;
  }
  .channels {
    gap: clamp(0.75rem, 3vh, 1.25rem);
  }
  .channel .label {
    font-size: 0.6rem;
  }
}
</style>
