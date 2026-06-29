import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import * as THREE from 'three'

export type ImmersiveSceneHandle = {
  scrollProgress: Ref<number>
  setScrollProgress: (value: number) => void
  disturbAt: (clientX: number, clientY: number) => void
}

const PARTICLE_COUNT = 480
const CONNECT_DISTANCE = 1.4
const MOUSE_LERP = 0.045
const LINE_REBUILD_INTERVAL = 24

type Disturbance = {
  x: number
  y: number
  z: number
  strength: number
  age: number
}

export function useImmersiveScene(canvasRef: Ref<HTMLCanvasElement | null>): ImmersiveSceneHandle {
  const scrollProgress = ref(0)
  let scrollTarget = 0
  let disposeScene: (() => void) | null = null
  let disturbAtImpl: ((clientX: number, clientY: number) => void) | null = null

  function setScrollProgress(value: number) {
    scrollTarget = Math.min(1, Math.max(0, value))
    scrollProgress.value = scrollTarget
  }

  function disturbAt(clientX: number, clientY: number) {
    disturbAtImpl?.(clientX, clientY)
  }

  function mountScene(canvas: HTMLCanvasElement) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x03030a, 0.14)

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 5.2

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x03030a, 1)
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const basePositions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = 2.8 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi) * 0.6
      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z
      basePositions[i3] = x
      basePositions[i3 + 1] = y
      basePositions[i3 + 2] = z
      velocities[i3] = (Math.random() - 0.5) * 0.004
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.004
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6ec8ff,
      size: 0.03,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const linePositions: number[] = []
    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x46cf98,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    const coreGeometry = new THREE.IcosahedronGeometry(0.55, 1)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x297ccf,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(core)

    const ringGeometry = new THREE.TorusGeometry(1.8, 0.012, 8, 120)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x04b6c1,
      transparent: true,
      opacity: 0.25,
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2.4
    scene.add(ring)

    const clock = new THREE.Clock()
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const disturbances: Disturbance[] = []
    let corePulse = 0
    let animationId = 0
    let frameCount = 0
    let disposed = false

    const raycaster = new THREE.Vector3()

    function worldPointFromScreen(clientX: number, clientY: number) {
      raycaster.set(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      )
      raycaster.unproject(camera)
      const dir = raycaster.clone().sub(camera.position).normalize()
      const t = -camera.position.z / dir.z
      return {
        x: camera.position.x + dir.x * t,
        y: camera.position.y + dir.y * t,
        z: camera.position.z + dir.z * t,
      }
    }

    disturbAtImpl = (clientX: number, clientY: number) => {
      const point = worldPointFromScreen(clientX, clientY)
      disturbances.push({ ...point, strength: 1.4, age: 0 })
      corePulse = 1
    }

    function rebuildLines() {
      linePositions.length = 0
      const pos = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const j3 = j * 3
          const dx = pos[i3] - pos[j3]
          const dy = pos[i3 + 1] - pos[j3 + 1]
          const dz = pos[i3 + 2] - pos[j3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECT_DISTANCE) {
            linePositions.push(pos[i3], pos[i3 + 1], pos[i3 + 2])
            linePositions.push(pos[j3], pos[j3 + 1], pos[j3 + 2])
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      lineGeometry.attributes.position.needsUpdate = true
    }

    rebuildLines()

    function onPointerMove(e: PointerEvent) {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    function onResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    function animate() {
      if (disposed) return
      animationId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      mouse.x += (mouse.targetX - mouse.x) * MOUSE_LERP
      mouse.y += (mouse.targetY - mouse.y) * MOUSE_LERP

      const scroll = scrollTarget
      const spread = 1 + scroll * 0.55
      const pos = particleGeometry.attributes.position.array as Float32Array

      for (let d = disturbances.length - 1; d >= 0; d--) {
        const dist = disturbances[d]
        dist.age += 1
        dist.strength *= 0.94
        if (dist.strength < 0.04 || dist.age > 90) {
          disturbances.splice(d, 1)
          continue
        }

        const radius = 1.6 + dist.strength * 1.2
        const force = 0.035 * dist.strength

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          const dx = pos[i3] - dist.x
          const dy = pos[i3 + 1] - dist.y
          const dz = pos[i3 + 2] - dist.z
          const distSq = dx * dx + dy * dy + dz * dz
          if (distSq < radius * radius && distSq > 0.0001) {
            const inv = force / Math.sqrt(distSq)
            velocities[i3] += dx * inv
            velocities[i3 + 1] += dy * inv
            velocities[i3 + 2] += dz * inv
          }
        }
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        pos[i3] += velocities[i3]
        pos[i3 + 1] += velocities[i3 + 1]
        pos[i3 + 2] += velocities[i3 + 2]

        velocities[i3] *= 0.97
        velocities[i3 + 1] *= 0.97
        velocities[i3 + 2] *= 0.97

        const bx = basePositions[i3] * spread
        const by = basePositions[i3 + 1] * spread
        const bz = basePositions[i3 + 2] * spread + scroll * 1.2

        pos[i3] += (bx - pos[i3]) * 0.018
        pos[i3 + 1] += (by - pos[i3 + 1]) * 0.018
        pos[i3 + 2] += (bz - pos[i3 + 2]) * 0.018

        const drift = Math.sin(elapsed * 0.4 + i * 0.05) * 0.002
        pos[i3] += drift
        pos[i3 + 1] += Math.cos(elapsed * 0.35 + i * 0.04) * 0.002
      }

      particleGeometry.attributes.position.needsUpdate = true

      frameCount += 1
      if (frameCount % LINE_REBUILD_INTERVAL === 0) {
        rebuildLines()
      }

      particles.rotation.y = elapsed * 0.04 + mouse.x * 0.35
      particles.rotation.x = mouse.y * 0.22
      core.rotation.x = elapsed * 0.3
      core.rotation.y = elapsed * 0.45 + mouse.x * 0.5
      ring.rotation.z = elapsed * 0.12 - mouse.x * 0.2

      if (corePulse > 0) {
        corePulse *= 0.88
        const scale = 1 + corePulse * 0.35
        core.scale.setScalar(scale)
        ring.scale.setScalar(1 + corePulse * 0.2)
      } else {
        core.scale.setScalar(1)
        ring.scale.setScalar(1)
      }

      camera.position.x = mouse.x * 0.35
      camera.position.y = mouse.y * 0.25
      camera.position.z = 5.2 - scroll * 1.8
      camera.lookAt(0, 0, 0)

      lineMaterial.opacity = 0.08 + scroll * 0.08
      particleMaterial.opacity = 0.7 + scroll * 0.2

      renderer.render(scene, camera)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize)
    animate()

    return () => {
      disposed = true
      disturbAtImpl = null
      cancelAnimationFrame(animationId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      renderer.dispose()
    }
  }

  onMounted(() => {
    if (canvasRef.value) {
      disposeScene = mountScene(canvasRef.value) ?? null
    }
  })

  watch(canvasRef, (canvas) => {
    if (canvas && !disposeScene) {
      disposeScene = mountScene(canvas) ?? null
    }
  })

  onUnmounted(() => {
    disposeScene?.()
    disposeScene = null
    disturbAtImpl = null
  })

  return { scrollProgress, setScrollProgress, disturbAt }
}
