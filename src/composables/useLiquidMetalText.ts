import { onMounted, onUnmounted, type Ref } from 'vue'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

function buildTextCanvas(lines: string[], pixelWidth: number, pixelHeight: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = pixelWidth
  canvas.height = pixelHeight
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, pixelWidth, pixelHeight)
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const lineHeight = pixelHeight / lines.length
  const maxWidth = pixelWidth * 0.94
  const fontStack = '"Syne", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  const boldOffset = pixelHeight * 0.003

  lines.forEach((line, i) => {
    const text = line.toUpperCase()
    let fontSize = lineHeight * 0.86
    ctx.font = `800 ${fontSize}px ${fontStack}`
    const width = ctx.measureText(text).width
    if (width > maxWidth) {
      fontSize *= maxWidth / width
      ctx.font = `800 ${fontSize}px ${fontStack}`
    }
    const y = lineHeight * (i + 0.5)
    const x = pixelWidth / 2
    const offsets = [
      [0, 0],
      [boldOffset, 0],
      [-boldOffset, 0],
      [0, boldOffset],
      [0, -boldOffset],
    ]
    for (const [ox, oy] of offsets) {
      ctx.fillText(text, x + ox, y + oy)
    }
  })

  return canvas
}

export function useLiquidMetalText(
  canvasRef: Ref<HTMLCanvasElement | null>,
  containerRef: Ref<HTMLElement | null>,
  lines: string[],
  onReady: (ready: boolean) => void
) {
  let dispose: (() => void) | null = null

  function mount(canvas: HTMLCanvasElement, container: HTMLElement) {
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch {
      return null
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const rect = container.getBoundingClientRect()
    const aspect = rect.width / rect.height

    const frustumHeight = 2.2
    const camera = new THREE.OrthographicCamera(
      (-frustumHeight * aspect) / 2,
      (frustumHeight * aspect) / 2,
      frustumHeight / 2,
      -frustumHeight / 2,
      0.1,
      10
    )
    camera.position.z = 3

    const texCanvas = buildTextCanvas(lines, 2048, Math.round(2048 / aspect))
    const texture = new THREE.CanvasTexture(texCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

    const geometry = new THREE.PlaneGeometry(frustumHeight * aspect, frustumHeight, 4, 4)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.22,
      alphaMap: texture,
      transparent: true,
      envMapIntensity: 1.0,
      side: THREE.DoubleSide,
    })

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
    }

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uMouse = uniforms.uMouse
      shader.uniforms.uMouseActive = uniforms.uMouseActive

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `uniform float uTime;\nuniform vec2 uMouse;\nuniform float uMouseActive;\n${NOISE_GLSL}\nfloat gDx;\nfloat gDy;\nfloat gFlowN;\n#include <common>`
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          {
            vec2 flow = vAlphaMapUv * vec2(7.0, 2.4);
            float t = uTime * 0.07;
            float eps = 0.015;
            float n0 = snoise(vec3(flow, t));
            float n1 = snoise(vec3(flow + vec2(eps, 0.0), t));
            float n2 = snoise(vec3(flow + vec2(0.0, eps), t));
            gDx = (n1 - n0) / eps;
            gDy = (n2 - n0) / eps;
            gFlowN = n0;

            vec3 cPearl = vec3(0.918, 0.941, 0.988);
            vec3 cCyan = vec3(0.122, 0.784, 0.859);
            vec3 cSapphire = vec3(0.231, 0.361, 0.878);
            vec3 cAmethyst = vec3(0.486, 0.227, 0.929);
            vec3 cAmber = vec3(0.910, 0.510, 0.227);

            float hue = fract(n0 * 0.5 + 0.5 + uTime * 0.045);
            vec3 tint;
            if (hue < 0.2) {
              tint = mix(cPearl, cCyan, hue / 0.2);
            } else if (hue < 0.4) {
              tint = mix(cCyan, cSapphire, (hue - 0.2) / 0.2);
            } else if (hue < 0.6) {
              tint = mix(cSapphire, cAmethyst, (hue - 0.4) / 0.2);
            } else if (hue < 0.8) {
              tint = mix(cAmethyst, cAmber, (hue - 0.6) / 0.2);
            } else {
              tint = mix(cAmber, cPearl, (hue - 0.8) / 0.2);
            }

            diffuseColor.rgb *= tint;
          }`
        )
        .replace(
          '#include <normal_fragment_maps>',
          `#include <normal_fragment_maps>
          {
            float mouseDist = distance(vAlphaMapUv, uMouse);
            float mouseFalloff = uMouseActive * smoothstep(0.4, 0.0, mouseDist);
            float strength = 0.5 + mouseFalloff * 3.2;

            vec3 bump = normalize(vec3(-gDx * strength, -gDy * strength, 1.4));
            normal = normalize(mix(normal, bump, 0.85));
          }`
        )
        .replace(
          '#include <dithering_fragment>',
          `{
            float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
            gl_FragColor.rgb = mix(vec3(lum), gl_FragColor.rgb, 1.9);
          }
          #include <dithering_fragment>`
        )
    }

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const key = new THREE.DirectionalLight(0xffffff, 0.7)
    key.position.set(2, 2, 3)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xffffff, 0.35)
    rim.position.set(-2, -1, 2)
    scene.add(rim)

    function resize() {
      const r = container.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      const a = r.width / r.height
      camera.left = (-frustumHeight * a) / 2
      camera.right = (frustumHeight * a) / 2
      camera.top = frustumHeight / 2
      camera.bottom = -frustumHeight / 2
      camera.updateProjectionMatrix()
      mesh.scale.x = a / aspectRef.value
      renderer.setSize(r.width, r.height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const aspectRef = { value: aspect }

    const raycaster = new THREE.Raycaster()
    const pointerNDC = new THREE.Vector2(-2, -2)
    const targetMouse = new THREE.Vector2(0.5, 0.5)
    let targetActive = 0

    function onPointerMove(e: PointerEvent) {
      const r = container.getBoundingClientRect()
      pointerNDC.x = ((e.clientX - r.left) / r.width) * 2 - 1
      pointerNDC.y = -((e.clientY - r.top) / r.height) * 2 + 1
      targetActive = 1
    }

    function onPointerLeave() {
      targetActive = 0
    }

    renderer.setSize(rect.width, rect.height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.95

    let animationId = 0
    let disposed = false
    const clock = new THREE.Clock()

    function animate() {
      if (disposed) return
      animationId = requestAnimationFrame(animate)

      uniforms.uTime.value = clock.getElapsedTime()
      uniforms.uMouseActive.value += (targetActive - uniforms.uMouseActive.value) * 0.08

      raycaster.setFromCamera(pointerNDC, camera)
      const hit = raycaster.intersectObject(mesh)[0]
      if (hit && hit.uv) {
        targetMouse.copy(hit.uv)
      }
      uniforms.uMouse.value.lerp(targetMouse, 0.15)

      renderer.render(scene, camera)
    }

    window.addEventListener('resize', resize)
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })

    renderer.render(scene, camera)
    onReady(true)

    if (!prefersReducedMotion) {
      animate()
    }

    return () => {
      disposed = true
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      pmrem.dispose()
      renderer.dispose()
    }
  }

  let unmounted = false

  onMounted(async () => {
    try {
      await document.fonts.load('800 200px Syne')
    } catch {
      /* fall back to default font stack if Syne fails to load */
    }
    if (unmounted) return
    const canvas = canvasRef.value
    const container = containerRef.value
    if (canvas && container) {
      dispose = mount(canvas, container) ?? null
    }
  })

  onUnmounted(() => {
    unmounted = true
    dispose?.()
    dispose = null
  })
}
