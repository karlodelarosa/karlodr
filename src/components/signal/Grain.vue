<template>
  <svg class="grain" aria-hidden="true">
    <filter id="grainFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise">
        <animate attributeName="seed" from="1" to="100" dur="8s" repeatCount="indefinite" />
      </feTurbulence>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grainFilter)"></rect>
  </svg>
</template>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
}
</style>
