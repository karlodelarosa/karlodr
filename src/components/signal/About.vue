<script setup lang="ts">
import { profile, stats } from '../../data/signal'
import LiquidText from './LiquidText.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const { target, revealed } = useScrollReveal()
</script>

<template>
  <section id="about">
    <div class="wrap">
      <p class="tag">91.9 — about</p>
      <div class="scanline-rule"></div>

      <div ref="target" class="about-grid" :class="{ 'is-revealed': revealed }">
        <div class="about-col">
          <h2 class="about-heading">
            <LiquidText>
              <span class="chroma" :class="{ 'settle-quick': revealed }" data-text="Signal, not static.">Signal, not static.</span>
            </LiquidText>
          </h2>

          <div class="bio">
            <p v-for="p in profile.bio" :key="p">{{ p }}</p>
          </div>
        </div>

        <dl class="stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <dt class="stat-value mono">
              {{ s.value }}
              <span class="unit">{{ s.unit }}</span>
            </dt>
            <dd class="stat-label">{{ s.label }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: start;
}

.about-col,
.stats {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 1s var(--ease-tune), transform 1s var(--ease-tune);
}
.about-grid.is-revealed .about-col {
  opacity: 1;
  transform: translateY(0);
}
.about-grid.is-revealed .stats {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.15s;
}

.about-heading {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  line-height: 0.95;
  max-width: 12ch;
}

.bio {
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  max-width: 52ch;
  color: var(--fog);
  font-size: 1.02rem;
}
.bio p {
  color: inherit;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin: 0;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 500;
  color: var(--signal);
}
.stat-value .unit {
  font-size: 1.1rem;
  color: var(--carrier);
  margin-left: 0.15rem;
}

.stat-label {
  margin: 0.35rem 0 0;
  color: var(--fog);
  font-size: 0.85rem;
}

@media (max-width: 800px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .stats {
    padding-top: 2rem;
    border-top: 1px solid var(--panel-edge);
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
