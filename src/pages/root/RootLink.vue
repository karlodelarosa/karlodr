<script setup lang="ts">
import RootPageShell from '../../components/root/RootPageShell.vue'
</script>

<template>
  <RootPageShell path="/link" title="Connect" subtitle="Reach me.">
    <div>
      <div class="config-row">
        <span class="dia-label">Host</span>
        <span class="dia-val">karlodr.com</span>
      </div>
      <div class="config-row">
        <span class="dia-label">Mail</span>
        <a class="dia-val accent" href="mailto:karlordr@gmail.com">karlordr@gmail.com</a>
      </div>
    </div>
  </RootPageShell>
</template>
