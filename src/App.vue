<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CustomCursor from './components/CustomCursor.vue'
import IntroLoader from './components/IntroLoader.vue'
import LiquidField from './components/signal/LiquidField.vue'
import { useRouteTransition } from './composables/useRouteTransition'
import { useIntroState } from './composables/useIntroState'

const { phase } = useRouteTransition()
const { introComplete, introProgress } = useIntroState()
const route = useRoute()

// lives here (not inside the home page) so the same WebGL instance carries
// straight through the loader → hero handoff with zero remount/jump
const showLiquidField = computed(() => route.name === 'home')
const liquidIntensity = computed(() => (introComplete.value ? 1 : introProgress.value))
</script>

<template>
  <LiquidField v-if="showLiquidField" :intensity="liquidIntensity" />
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
  filter: none;
  transform: none;
}
</style>
