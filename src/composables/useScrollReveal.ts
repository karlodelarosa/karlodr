import { onMounted, onUnmounted, ref } from 'vue'

// reveals once, the first time the target scrolls into view — used to
// stagger section content in instead of everything just being there
export function useScrollReveal(options: IntersectionObserverInit = {}) {
  const target = ref<HTMLElement | null>(null)
  const revealed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          revealed.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    )
    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target, revealed }
}
