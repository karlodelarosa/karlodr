<script setup lang="ts">
import RootPageShell from '../../components/root/RootPageShell.vue'
import { NOW_DATA } from '../../data/now'
</script>

<template>
  <RootPageShell
    path="/now"
    title="Now"
    :timestamp="NOW_DATA.lastUpdated"
    subtitle="A real-time snapshot of what I'm actively building, studying, and optimizing right now."
  >
    <div class="now-stack">
      <div v-for="item in NOW_DATA.items" :key="item.category" class="now-item">
        <div class="category-side">{{ item.category }}</div>
        <div class="content-side">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>

      <div class="now-item">
        <div class="category-side">/ current_stack</div>
        <div class="content-side">
          <h3>Focus Inventory</h3>
          <ul class="now-list">
            <li v-for="focus in NOW_DATA.focusList" :key="focus">{{ focus }}</li>
          </ul>
        </div>
      </div>
    </div>
  </RootPageShell>
</template>
