<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ pattern: 'mesh' | 'waveform' | 'scan' | 'grid' }>()

const scanBars = computed(() =>
  Array.from({ length: 18 }, (_, i) => {
    const h = 20 + ((i * 37) % 90)
    return { x: i * 22 + 6, y: 150 - h, h, delay: `${(i % 6) * 0.12}s` }
  })
)

const gridNodePositions: [number, number][] = [
  [66, 42],
  [200, 42],
  [333, 42],
  [0, 85],
  [133, 85],
  [266, 85],
  [400, 85],
  [66, 128],
  [200, 128],
  [333, 128],
]

const gridNodes = computed(() =>
  gridNodePositions.map(([cx, cy], i) => ({
    x: cx - 5,
    y: cy - 5,
    fill: i % 3 === 0 ? 'var(--interference)' : 'var(--carrier)',
    delay: `${(i % 7) * 0.18}s`,
  }))
)
</script>

<template>
  <div class="project-visual" aria-hidden="true">
    <svg v-if="props.pattern === 'mesh'" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
      <g class="mesh-lines" stroke="var(--panel-edge)" stroke-width="1" fill="none">
        <path d="M60,120 L150,50 L240,95 L330,40" />
        <path d="M150,50 L240,95" />
        <path d="M60,120 L240,95" />
        <path d="M330,40 L240,95 L200,140 L330,140" />
      </g>
      <g class="mesh-pulse" stroke="var(--carrier)" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M60,120 L150,50 L240,95 L330,40" pathLength="1" />
      </g>
      <g class="mesh-pulse mesh-pulse-b" stroke="var(--interference)" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M330,40 L240,95 L200,140 L330,140" pathLength="1" />
      </g>
      <g class="mesh-nodes" fill="var(--signal)">
        <circle cx="60" cy="120" r="4" />
        <circle cx="150" cy="50" r="4" />
        <circle cx="240" cy="95" r="5" />
        <circle cx="330" cy="40" r="4" />
        <circle cx="200" cy="140" r="4" />
        <circle cx="330" cy="140" r="4" />
      </g>
    </svg>

    <svg v-else-if="props.pattern === 'waveform'" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
      <polyline
        class="wave-line"
        points="0,90 40,90 60,85 80,95 100,88 130,90 160,92 190,88 210,20 225,150 240,90 270,86 300,94 330,90 360,88 400,90"
        fill="none"
        stroke="var(--fog)"
        stroke-width="1.5"
        opacity="0.55"
      />
      <circle class="wave-spike-dot" cx="210" cy="20" r="4" fill="var(--interference)" />
      <rect class="wave-sweep" x="-40" y="0" width="40" height="170" fill="url(#waveGrad)" />
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--carrier)" stop-opacity="0" />
          <stop offset="50%" stop-color="var(--carrier)" stop-opacity="0.5" />
          <stop offset="100%" stop-color="var(--carrier)" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <svg v-else-if="props.pattern === 'scan'" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
      <g class="scan-bars" fill="var(--carrier)">
        <rect
          v-for="(b, i) in scanBars"
          :key="i"
          :x="b.x"
          :y="b.y"
          width="10"
          :height="b.h"
          :style="{ '--d': b.delay }"
        />
      </g>
      <rect class="scan-line" x="0" y="0" width="400" height="2" fill="var(--signal)" opacity="0.8" />
    </svg>

    <svg v-else-if="props.pattern === 'grid'" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice">
      <g class="grid-lines" stroke="var(--panel-edge)" stroke-width="1">
        <line x1="0" y1="42" x2="400" y2="42" />
        <line x1="0" y1="85" x2="400" y2="85" />
        <line x1="0" y1="128" x2="400" y2="128" />
        <line x1="66" y1="0" x2="66" y2="170" />
        <line x1="133" y1="0" x2="133" y2="170" />
        <line x1="200" y1="0" x2="200" y2="170" />
        <line x1="266" y1="0" x2="266" y2="170" />
        <line x1="333" y1="0" x2="333" y2="170" />
      </g>
      <g class="grid-nodes">
        <rect
          v-for="(n, i) in gridNodes"
          :key="i"
          :x="n.x"
          :y="n.y"
          width="10"
          height="10"
          :fill="n.fill"
          :style="{ '--d': n.delay }"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.project-visual {
  width: 100%;
  aspect-ratio: 400 / 170;
  border: 1px solid var(--panel-edge);
  background: var(--void);
  overflow: hidden;
}
.project-visual svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* mesh */
.mesh-pulse {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: mesh-travel 3.2s ease-in-out infinite;
}
.mesh-pulse-b {
  animation-delay: 1.1s;
}
@keyframes mesh-travel {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  55% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}
.mesh-nodes circle {
  animation: mesh-pulse-scale 2.4s ease-in-out infinite;
}
@keyframes mesh-pulse-scale {
  0%,
  100% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
}

/* waveform */
.wave-spike-dot {
  animation: spike-glow 2.2s ease-in-out infinite;
}
@keyframes spike-glow {
  0%,
  100% {
    opacity: 0.6;
    r: 3;
  }
  50% {
    opacity: 1;
    r: 5;
  }
}
.wave-sweep {
  animation: sweep-x 3.6s linear infinite;
}
@keyframes sweep-x {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(440px);
  }
}

/* scan */
.scan-bars rect {
  animation: bar-flicker 2.8s ease-in-out infinite;
  animation-delay: var(--d);
  transform-origin: bottom;
}
@keyframes bar-flicker {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
.scan-line {
  animation: scan-sweep 2.6s linear infinite;
}
@keyframes scan-sweep {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  5% {
    opacity: 0.9;
  }
  95% {
    opacity: 0.9;
  }
  100% {
    transform: translateY(168px);
    opacity: 0;
  }
}

/* grid */
.grid-nodes rect {
  animation: node-pulse 2.4s ease-in-out infinite;
  animation-delay: var(--d);
}
@keyframes node-pulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}
</style>
