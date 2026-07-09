<script setup lang="ts">
import EditorialPageShell from '../../components/EditorialPageShell.vue'
import { EXPERIENCE_DATA } from '../../data/experience'
</script>

<template>
  <EditorialPageShell numeral="02" eyebrow="SYS_INDEX // EXPERIENCE">
    <template #title>
      Roles &amp;<br />
      <span class="serif-alt">what shipped</span>
    </template>
    <template #subtitle>Roles, stacks, and what shipped.</template>

    <div class="timeline">
      <article v-for="item in EXPERIENCE_DATA" :key="item.title" class="timeline-row">
        <div class="meta-col">
          <span class="period">{{ item.date }}</span>
          <div class="tag-row">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="content-col">
          <span class="role-title">{{ item.title }}</span>
          <span class="company">{{ item.company }}</span>
          <p class="role-desc">{{ item.description }}</p>
        </div>
      </article>
    </div>
  </EditorialPageShell>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.timeline-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px 0;
  transition: padding-left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.timeline-row:hover {
  padding-left: 8px;
}

.timeline-row:first-child {
  padding-top: 0;
}

@media (min-width: 768px) {
  .timeline-row {
    grid-template-columns: 160px 1fr;
    gap: 32px;
  }
}

.meta-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.period {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-family: ui-monospace, monospace;
  font-size: 10px;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 2px 8px;
}

.content-col {
  display: flex;
  flex-direction: column;
}

.role-title {
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.company {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 10px;
}

.role-desc {
  font-size: 14px;
  line-height: 1.7;
  color: #334155;
}
</style>
