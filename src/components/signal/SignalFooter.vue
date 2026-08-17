<script setup lang="ts">
import { profile } from '../../data/signal'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="wrap footer-inner mono">
      <span>© {{ year }} {{ profile.name }}</span>
      <span>no static, mostly</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding-block: 2rem;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--fog);
}
</style>
