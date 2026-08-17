<script setup lang="ts">
import { projects } from '../../data/signal'
import ProjectCard from './ProjectCard.vue'
import ProjectVisual from './ProjectVisual.vue'
import LiquidText from './LiquidText.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const { target, revealed } = useScrollReveal()
</script>

<template>
  <section id="work">
    <div class="wrap">
      <p class="tag">94.7 — work</p>
      <div class="scanline-rule"></div>
      <h2 class="work-heading">
        <LiquidText>
          <span class="chroma" :class="{ 'settle-quick': revealed }" data-text="Things I've shipped and kept running.">Things I've shipped and kept running.</span>
        </LiquidText>
      </h2>

      <div ref="target" class="work-grid" :class="{ 'is-revealed': revealed }">
        <div v-for="project in projects" :key="project.id" class="work-card-wrap">
          <ProjectCard :project="project">
            <ProjectVisual :pattern="project.visual" />
          </ProjectCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-heading {
  font-size: clamp(2.75rem, 6.5vw, 5rem);
  line-height: 0.98;
  max-width: 16ch;
  margin-bottom: 3rem;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(19rem, 100%), 1fr));
  gap: 1.25rem;
}

.work-card-wrap {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s var(--ease-tune), transform 0.9s var(--ease-tune);
}
.work-grid.is-revealed .work-card-wrap {
  opacity: 1;
  transform: translateY(0);
}
.work-grid.is-revealed .work-card-wrap:nth-child(1) {
  transition-delay: 0s;
}
.work-grid.is-revealed .work-card-wrap:nth-child(2) {
  transition-delay: 0.1s;
}
.work-grid.is-revealed .work-card-wrap:nth-child(3) {
  transition-delay: 0.2s;
}
.work-grid.is-revealed .work-card-wrap:nth-child(4) {
  transition-delay: 0.3s;
}
.work-grid.is-revealed .work-card-wrap:nth-child(n + 5) {
  transition-delay: 0.35s;
}
</style>
