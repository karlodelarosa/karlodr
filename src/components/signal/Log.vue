<script setup lang="ts">
import { log } from '../../data/signal'
import LiquidText from './LiquidText.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const { target, revealed } = useScrollReveal()
</script>

<template>
  <section id="log">
    <div class="wrap">
      <p class="tag">104.2 — log</p>
      <div class="scanline-rule"></div>
      <h2 class="log-heading">
        <LiquidText>
          <span class="chroma" :class="{ 'settle-quick': revealed }" data-text="Where I've been.">Where I've been.</span>
        </LiquidText>
      </h2>

      <ol ref="target" class="timeline" :class="{ 'is-revealed': revealed }">
        <li v-for="(entry, i) in log" :key="entry.period + entry.org" class="entry" :style="{ '--i': i }">
          <div class="entry-period mono">{{ entry.period }}</div>
          <div class="entry-body">
            <h3 class="entry-role">
              {{ entry.role }} <span class="entry-org">— {{ entry.org }}</span>
            </h3>
            <ul class="entry-notes">
              <li v-for="n in entry.notes" :key="n">{{ n }}</li>
            </ul>
            <ul class="entry-stack">
              <li v-for="s in entry.stack" :key="s" class="mono">{{ s }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.log-heading {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  line-height: 0.95;
  max-width: 12ch;
  margin-bottom: 3.25rem;
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.entry {
  display: grid;
  grid-template-columns: 8rem 1px 1fr;
  gap: 0 2rem;
  padding-block: 2.25rem;
  border-top: 1px solid var(--panel-edge);
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-tune), transform 0.8s var(--ease-tune);
}
.timeline.is-revealed .entry {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(var(--i, 0) * 0.1s);
}
.entry:first-child {
  border-top: 1px solid var(--panel-edge);
}
.entry::before {
  content: '';
  grid-column: 2;
  grid-row: 1 / -1;
  background: var(--panel-edge);
}

.entry-period {
  font-size: 0.82rem;
  color: var(--fog);
  padding-top: 0.2rem;
}

.entry-role {
  font-size: 1.15rem;
  color: var(--signal);
}
.entry-org {
  color: var(--carrier);
  font-weight: 500;
}

.entry-notes {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--fog);
  max-width: 52ch;
}
.entry-notes li {
  padding-left: 1.1rem;
  position: relative;
  font-size: 0.95rem;
}
.entry-notes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 1px;
  background: var(--interference);
}

.entry-stack {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.entry-stack li {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--fog);
  border: 1px solid var(--panel-edge);
  padding: 0.25rem 0.55rem;
}

@media (max-width: 640px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .entry::before {
    display: none;
  }
}
</style>
