<script setup lang="ts">
import RootPageShell from '../../components/root/RootPageShell.vue'
import { EXPERIENCE_DATA } from '../../data/experience'
</script>

<template>
  <RootPageShell path="/experience" title="Experience" subtitle="Roles, stacks, and what shipped.">
    <div class="timeline">
      <article v-for="item in EXPERIENCE_DATA" :key="item.title" class="timeline-item">
        <div class="meta-side">
          <span class="period">{{ item.date }}</span>
          <div class="tech-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="content-side">
          <span class="role-title">{{ item.title }}</span>
          <span class="company">{{ item.company }}</span>
          <p class="role-desc">{{ item.description }}</p>
        </div>
      </article>
    </div>
  </RootPageShell>
</template>
