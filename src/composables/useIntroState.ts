import { ref } from 'vue'

// starts true/1 when the intro loader is going to be skipped (already seen
// this session), so pages don't sit waiting on a reveal that will never fire
const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('kdr-intro-seen') === '1'

const introComplete = ref(alreadySeen)
const introProgress = ref(alreadySeen ? 1 : 0) // 0..1, drives the liquid field's build-up

export function useIntroState() {
  function markIntroComplete() {
    introComplete.value = true
  }

  function setIntroProgress(pct: number) {
    introProgress.value = Math.max(0, Math.min(1, pct))
  }

  return { introComplete, introProgress, markIntroComplete, setIntroProgress }
}
