<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const enabled = ref(false)
const hovering = ref(false)
const cursorRef = ref<HTMLElement | null>(null)

const HOVER_SELECTOR = 'a, button, .cta-button, .index-row, .nav-item, .thumb-preview'

let targetX = 0
let targetY = 0
let rafId = 0

function onMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
}

function onOver(e: MouseEvent) {
  hovering.value = !!(e.target as HTMLElement).closest?.(HOVER_SELECTOR)
}

function paint() {
  const el = cursorRef.value
  if (el) {
    el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
  }
  rafId = requestAnimationFrame(paint)
}

onMounted(() => {
  enabled.value = window.matchMedia('(pointer: fine)').matches
  if (!enabled.value) return
  document.documentElement.classList.add('custom-cursor-active')
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })
  rafId = requestAnimationFrame(paint)
})

onUnmounted(() => {
  document.documentElement.classList.remove('custom-cursor-active')
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div v-if="enabled" ref="cursorRef" class="cursor-dot" :class="{ hovering }" />
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 10001;
  will-change: transform;
  transition: width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}

.cursor-dot.hovering {
  width: 40px;
  height: 40px;
}
</style>
