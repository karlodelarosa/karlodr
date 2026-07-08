/**
 * Subtle 3D tilt on pointer move. Bind the returned handlers to an element
 * (`@mousemove` / `@mouseleave`) and give it a transform in CSS that reads the
 * `--tilt-x` / `--tilt-y` custom properties, e.g.
 *   transform: perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
 *
 * `max` is the peak tilt in degrees at the element's edges. Kept small by
 * default so it adds depth without making cards hard to click.
 */
export function useTilt(max = 6) {
  function onMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tilt-x', `${y * -max}deg`)
    el.style.setProperty('--tilt-y', `${x * max}deg`)
  }

  function onLeave(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  return { onMove, onLeave }
}
