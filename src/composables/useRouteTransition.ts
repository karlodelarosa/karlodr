import { ref } from 'vue'

export type TransitionPhase = 'idle' | 'covering' | 'revealing'

const phase = ref<TransitionPhase>('idle')

export function useRouteTransition() {
  return { phase }
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
