<script setup lang="ts">
import RootPageShell from '../../components/root/RootPageShell.vue'
import { FEATURED_PROJECTS } from '../../data/project'
import { useTilt } from '../../composables/useTilt'

const { onMove, onLeave } = useTilt()
</script>

<template>
  <RootPageShell path="/labs" title="Labs" subtitle="Side projects and experiments.">
    <div class="section-grid">
      <a
        v-for="project in FEATURED_PROJECTS"
        :key="project.title"
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="section-card section-card-link"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <span class="section-card-title">{{ project.title }}</span>
        <p class="section-card-desc">{{ project.description }}</p>
        <span class="section-card-tags">{{ project.tags.join(' · ') }}</span>
      </a>
    </div>
  </RootPageShell>
</template>
