import { onMounted, onUnmounted, ref } from 'vue'

export function useManilaClock() {
  const time = ref('--:--:--')
  let timer: ReturnType<typeof setInterval> | null = null

  function tick() {
    time.value = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Manila',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { time }
}
