<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  path: string
  title: string
  subtitle?: string
  timestamp?: string
}>()

onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <div class="root-page">
    <div class="container">
      <RouterLink to="/" class="root-back">← /root</RouterLink>

      <header class="root-page-header">
        <div class="directory-title">{{ path }}</div>
        <div v-if="timestamp" class="title-row">
          <h1 class="root-page-heading">{{ title }}</h1>
          <span class="timestamp">{{ timestamp }}</span>
        </div>
        <h1 v-else class="root-page-heading">{{ title }}</h1>
        <p v-if="subtitle" class="root-page-subtitle">{{ subtitle }}</p>
      </header>

      <main>
        <slot />
      </main>

      <footer>
        <a href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </footer>
    </div>
  </div>
</template>

<style>
@import '../../styles/root-theme.css';
</style>
