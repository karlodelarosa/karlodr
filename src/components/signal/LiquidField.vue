<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{ intensity?: number }>(), { intensity: 1 })

const canvas = ref<HTMLCanvasElement | null>(null)
const supported = ref(true)

// keep in sync with --carrier / --interference / --signal in EditorialHome.vue
const COLOR_A = [0.176, 0.902, 0.784]
const COLOR_B = [1.0, 0.176, 0.416]
const COLOR_SIGNAL = [0.949, 0.953, 0.969]

const AMBIENT = 4
const TOTAL = AMBIENT + 1 // + cursor blob

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uBlobs[${TOTAL}];
uniform float uRadii[${TOTAL}];
uniform float uLocked;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uSignal;
uniform float uTime;
uniform float uIntensity;

void main() {
  vec2 p = gl_FragCoord.xy;
  float field = 0.0;
  for (int i = 0; i < ${TOTAL}; i++) {
    vec2 d = p - uBlobs[i];
    float r2 = dot(d, d) + 1.0;
    field += (uRadii[i] * uRadii[i]) / r2;
  }

  float threshold = 1.0;
  float edgeWidth = 0.35;
  float mask = smoothstep(threshold - edgeWidth, threshold + edgeWidth * 0.4, field);
  float rim = 1.0 - clamp(abs(field - threshold) / (edgeWidth * 1.4), 0.0, 1.0);
  rim = pow(rim, 2.0);

  // continuous diagonal drift — no fixed center point, no angle wrap seam
  float wave = sin((p.x + p.y) * 0.0016 + uTime * 0.12);
  vec3 base = mix(uColorA, uColorB, 0.5 + 0.5 * wave);
  vec3 color = base * mask * 0.55;
  color += uSignal * rim * (0.5 + uLocked * 0.6);
  color *= (0.6 + uLocked * 0.5);
  color *= uIntensity;

  gl_FragColor = vec4(color, 1.0);
}`

let gl: WebGLRenderingContext | null = null
let raf = 0
let program: WebGLProgram | null = null
let uBlobsLoc: WebGLUniformLocation | null = null
let uRadiiLoc: WebGLUniformLocation | null = null
let uLockedLoc: WebGLUniformLocation | null = null
let uResolutionLoc: WebGLUniformLocation | null = null
let uTimeLoc: WebGLUniformLocation | null = null
let uIntensityLoc: WebGLUniformLocation | null = null

let width = 0
let height = 0
let dpr = 1
let reduced = false
let pointerFine = false

let mouseX = -9999
let mouseY = -9999
let cursorX = -9999
let cursorY = -9999
let locked = 0 // raw hover target (0/1), flips instantly on mouseover
let lockedSmooth = 0 // eased toward `locked` each frame — avoids an instant pop

type Ambient = {
  baseX: number
  baseY: number
  ampX: number
  ampY: number
  freq: number
  phase: number
  radius: number
  parAmpX: number
  parAmpY: number
  parFreqX: number
  parFreqY: number
}
let ambients: Ambient[] = []
let scrollY = 0
let smoothScrollY = 0
let lastTime = 0

function compile(type: number, source: string) {
  const shader = gl!.createShader(type)!
  gl!.shaderSource(shader, source)
  gl!.compileShader(shader)
  return shader
}

function setup() {
  const c = canvas.value
  if (!c) return
  gl = (c.getContext('webgl') || c.getContext('experimental-webgl')) as WebGLRenderingContext | null
  if (!gl) {
    supported.value = false
    return
  }

  gl.clearColor(0.031, 0.035, 0.047, 1) // matches --void

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.useProgram(program)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  uBlobsLoc = gl.getUniformLocation(program, 'uBlobs')
  uRadiiLoc = gl.getUniformLocation(program, 'uRadii')
  uLockedLoc = gl.getUniformLocation(program, 'uLocked')
  uResolutionLoc = gl.getUniformLocation(program, 'uResolution')
  uTimeLoc = gl.getUniformLocation(program, 'uTime')
  uIntensityLoc = gl.getUniformLocation(program, 'uIntensity')
  gl.uniform3fv(gl.getUniformLocation(program, 'uColorA'), COLOR_A)
  gl.uniform3fv(gl.getUniformLocation(program, 'uColorB'), COLOR_B)
  gl.uniform3fv(gl.getUniformLocation(program, 'uSignal'), COLOR_SIGNAL)

  ambients = Array.from({ length: AMBIENT }, (_, i) => ({
    baseX: 0.2 + 0.6 * ((i * 0.618) % 1),
    baseY: 0.15 + 0.7 * ((i * 0.382 + 0.2) % 1),
    ampX: 60 + i * 18,
    ampY: 50 + i * 14,
    freq: 0.05 + i * 0.015,
    phase: i * 2.1,
    radius: 150 + i * 26,
    // scroll parallax: bounded sine offsets keyed off scroll distance, so
    // blobs keep drifting as you scroll without ever wandering off for good
    parAmpX: 50 + i * 16,
    parAmpY: 90 + i * 24,
    parFreqX: 0.0007 + i * 0.00026,
    parFreqY: 0.0012 + i * 0.00034,
  }))

  resize()
}

function resize() {
  const c = canvas.value
  if (!c || !gl) return
  dpr = Math.min(window.devicePixelRatio || 1, 1.75)
  width = Math.floor(window.innerWidth * dpr)
  height = Math.floor(window.innerHeight * dpr)
  c.width = width
  c.height = height
  gl.viewport(0, 0, width, height)
  gl.uniform2f(uResolutionLoc, width, height)
}

function onMove(e: MouseEvent) {
  mouseX = e.clientX * dpr
  mouseY = height - e.clientY * dpr
}

function onOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  locked = target.closest('a, button, [data-tune]') ? 1 : 0
}

function tick(t: number) {
  lastTime = t
  if (gl && program) {
    cursorX += (mouseX - cursorX) * 0.16
    cursorY += (mouseY - cursorY) * 0.16
    lockedSmooth += (locked - lockedSmooth) * 0.12

    scrollY = window.scrollY || 0
    smoothScrollY += (scrollY - smoothScrollY) * 0.08

    const intensity = props.intensity
    const blobs = new Float32Array(TOTAL * 2)
    const radii = new Float32Array(TOTAL)
    const time = t * 0.001

    ambients.forEach((a, i) => {
      const parX = Math.sin(smoothScrollY * a.parFreqX + a.phase) * a.parAmpX * dpr
      const parY = Math.sin(smoothScrollY * a.parFreqY + a.phase * 1.4) * a.parAmpY * dpr
      const x = a.baseX * width + Math.sin(time * a.freq + a.phase) * a.ampX * dpr + parX
      const y = a.baseY * height + Math.cos(time * a.freq * 0.8 + a.phase) * a.ampY * dpr + parY
      blobs[i * 2] = x
      blobs[i * 2 + 1] = y
      // radius scales with intensity — blobs literally grow in from nothing
      // during the build-up, instead of just fading brighter in place
      radii[i] = a.radius * dpr * intensity
    })

    const cIdx = AMBIENT
    blobs[cIdx * 2] = cursorX
    blobs[cIdx * 2 + 1] = cursorY
    radii[cIdx] = pointerFine ? (70 + lockedSmooth * 45) * dpr * intensity : 0

    gl.uniform1f(uTimeLoc, time)
    gl.uniform2fv(uBlobsLoc, blobs)
    gl.uniform1fv(uRadiiLoc, radii)
    gl.uniform1f(uLockedLoc, lockedSmooth)
    gl.uniform1f(uIntensityLoc, intensity)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  if (!reduced) raf = requestAnimationFrame(tick)
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  pointerFine = window.matchMedia('(pointer: fine)').matches
  setup()
  if (!supported.value) return
  window.addEventListener('resize', resize)
  if (pointerFine) {
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
  }
  raf = requestAnimationFrame(tick)
  if (reduced) {
    tick(0) // paint a single static frame
    // still repaint on intensity changes so reduced-motion visitors see the
    // field arrive at full presence instead of staying frozen at 0
    watch(() => props.intensity, () => tick(lastTime))
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
})
</script>

<template>
  <canvas v-if="supported" ref="canvas" class="liquid-field" aria-hidden="true"></canvas>
</template>

<style scoped>
.liquid-field {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 2;
  pointer-events: none;
}
</style>
