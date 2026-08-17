<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

let idCounter = 0
const filterId = `liquid-${++idCounter}-${Math.random().toString(36).slice(2, 8)}`

const root = ref<HTMLElement | null>(null)
const turbulence = ref<SVGFETurbulenceElement | null>(null)
const displacement = ref<SVGFEDisplacementMapElement | null>(null)
const active = ref(false)

let ticking = false

function update(e: MouseEvent) {
  if (ticking || !root.value) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    if (!root.value || !turbulence.value || !displacement.value) return
    const rect = root.value.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
    const falloff = Math.max(rect.width, rect.height) * 0.7 + 260
    const t = Math.max(0, 1 - dist / falloff)
    const eased = t * t // ease-in: stays subtle until the cursor is genuinely close
    const freq = 0.008 + eased * 0.022
    const scale = eased * 10
    turbulence.value.setAttribute('baseFrequency', `${freq.toFixed(4)} ${(freq * 1.4).toFixed(4)}`)
    displacement.value.setAttribute('scale', scale.toFixed(1))
  })
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  active.value = !reduced && window.matchMedia('(pointer: fine)').matches
  if (active.value) window.addEventListener('mousemove', update, { passive: true })
})

onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
  <span ref="root" class="liquid-text" :style="active ? { filter: `url(#${filterId})` } : undefined">
    <svg width="0" height="0" aria-hidden="true" focusable="false" class="liquid-defs">
      <filter :id="filterId" x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence
          ref="turbulence"
          type="fractalNoise"
          baseFrequency="0.008 0.011"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          ref="displacement"
          in="SourceGraphic"
          in2="noise"
          scale="0"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
    <slot />
  </span>
</template>

<style scoped>
.liquid-text {
  display: inline-block;
}
.liquid-defs {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
