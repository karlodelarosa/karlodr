<script setup lang="ts">
import CustomCursor from './components/CustomCursor.vue'
import IntroLoader from './components/IntroLoader.vue'
import { useRouteTransition } from './composables/useRouteTransition'

const { phase } = useRouteTransition()
</script>

<template>
  <div class="page-frame" :class="phase">
    <router-view />
  </div>
  <CustomCursor />
  <IntroLoader />
</template>

<style scoped>
.page-frame {
  transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease;
}

.page-frame.covering,
.page-frame.revealing {
  will-change: opacity, filter, transform;
  pointer-events: none;
}

.page-frame.covering {
  opacity: 0;
  filter: blur(6px);
  transform: scale(0.99);
}

.page-frame.revealing {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}

.page-frame.idle {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
</style>
