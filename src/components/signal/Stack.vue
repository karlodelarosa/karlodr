<script setup lang="ts">
import { computed } from 'vue'
import { skills } from '../../data/signal'
import LiquidText from './LiquidText.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const { target, revealed } = useScrollReveal()

const COLS = 3
const remainder = skills.length % COLS
// stretch the trailing card to fill out an incomplete last row, instead of
// leaving an empty cell
const lastRowSpan = COLS - remainder + 1

const groupStyle = computed(() => (i: number) =>
  i === skills.length - 1 && remainder !== 0 ? { gridColumn: `span ${lastRowSpan}` } : undefined
)
</script>

<template>
  <section id="stack">
    <div class="wrap">
      <p class="tag">101.5 — stack</p>
      <div class="scanline-rule"></div>
      <h2 class="stack-heading">
        <LiquidText>
          <span class="chroma" :class="{ 'settle-quick': revealed }" data-text="What I reach for.">What I reach for.</span>
        </LiquidText>
      </h2>

      <div ref="target" class="stack-grid" :class="{ 'is-revealed': revealed }">
        <div v-for="(group, i) in skills" :key="group.label" class="stack-group" data-tune :style="groupStyle(i)">
          <p class="group-label mono">{{ group.label }}</p>
          <ul class="chips">
            <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack-heading {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  line-height: 0.95;
  max-width: 12ch;
  margin-bottom: 3rem;
}

.stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid var(--panel-edge);
  border-left: 1px solid var(--panel-edge);
}

@media (min-width: 561px) {
  .stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 901px) {
  .stack-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stack-group {
  background: var(--void);
  padding: 1.75rem;
  border-right: 1px solid var(--panel-edge);
  border-bottom: 1px solid var(--panel-edge);
  opacity: 0;
  transform: translateY(20px);
  transition: background 0.35s var(--ease-tune), opacity 0.8s var(--ease-tune), transform 0.8s var(--ease-tune);
}
.stack-group:hover {
  background: var(--panel);
}
.stack-grid.is-revealed .stack-group {
  opacity: 1;
  transform: translateY(0);
}
.stack-grid.is-revealed .stack-group:nth-child(1) {
  transition-delay: 0s;
}
.stack-grid.is-revealed .stack-group:nth-child(2) {
  transition-delay: 0.08s;
}
.stack-grid.is-revealed .stack-group:nth-child(3) {
  transition-delay: 0.16s;
}
.stack-grid.is-revealed .stack-group:nth-child(4) {
  transition-delay: 0.24s;
}
.stack-grid.is-revealed .stack-group:nth-child(5) {
  transition-delay: 0.32s;
}
.stack-grid.is-revealed .stack-group:nth-child(6) {
  transition-delay: 0.4s;
}

.group-label {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--carrier);
  margin: 0 0 1.1rem;
}

.chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.chip {
  font-size: 0.98rem;
  color: var(--signal);
  padding-left: 1rem;
  position: relative;
}
.chip::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 1px;
  background: var(--fog);
}
</style>
