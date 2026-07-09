export function useMagnetic() {
  function onMagneticMove(event: MouseEvent, strength = 0.35, max = 14) {
    const el = event.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const relX = event.clientX - (rect.left + rect.width / 2)
    const relY = event.clientY - (rect.top + rect.height / 2)
    const x = Math.max(-max, Math.min(max, relX * strength))
    const y = Math.max(-max, Math.min(max, relY * strength))
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  function onMagneticLeave(event: MouseEvent) {
    ;(event.currentTarget as HTMLElement).style.transform = ''
  }

  return { onMagneticMove, onMagneticLeave }
}
