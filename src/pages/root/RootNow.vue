<script setup lang="ts">
import EditorialPageShell from '../../components/EditorialPageShell.vue'
import { NOW_DATA } from '../../data/now'
</script>

<template>
  <EditorialPageShell numeral="03" eyebrow="SYS_INDEX // NOW">
    <template #title>
      What I'm<br />
      <span class="serif-alt">doing</span> right now
    </template>
    <template #subtitle
      >A real-time snapshot of what I'm actively building, studying, and optimizing right
      now.</template
    >

    <div class="now-stack">
      <div v-for="item in NOW_DATA.items" :key="item.category" class="now-row">
        <div class="category-col">{{ item.category }}</div>
        <div class="content-col">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>

      <div class="now-row">
        <div class="category-col">/ current_stack</div>
        <div class="content-col">
          <h3>Focus Inventory</h3>
          <ul class="focus-list">
            <li v-for="focus in NOW_DATA.focusList" :key="focus">{{ focus }}</li>
          </ul>
        </div>
      </div>
    </div>
  </EditorialPageShell>
</template>

<style scoped>
.now-stack {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.now-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px 0;
  transition: padding-left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.now-row:hover {
  padding-left: 8px;
}

.now-row:first-child {
  padding-top: 0;
}

.now-row:last-child {
  border-bottom: none;
}

@media (min-width: 768px) {
  .now-row {
    grid-template-columns: 160px 1fr;
    gap: 32px;
  }
}

.category-col {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.content-col h3 {
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
}

.content-col p {
  font-size: 14px;
  line-height: 1.7;
  color: #334155;
}

.focus-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.focus-list li {
  font-size: 14px;
  color: #334155;
  position: relative;
  padding-left: 20px;
}

.focus-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #080809;
}
</style>
