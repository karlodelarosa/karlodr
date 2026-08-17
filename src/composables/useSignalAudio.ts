import { ref } from 'vue'

// Synthesized UI sound (Web Audio API, no asset files) — off by default since
// unsolicited audio is bad manners; visitors opt in via the strip's toggle.
const STORAGE_KEY = 'kdr-audio-enabled'

const enabled = ref(typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1')

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtor) return null
  if (!ctx) ctx = new AudioCtor()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function envelope(gain: GainNode, c: AudioContext, attack: number, decay: number, peak: number) {
  const now = c.currentTime
  gain.gain.cancelScheduledValues(now)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.linearRampToValueAtTime(peak, now + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay)
}

function tone(freq: number, duration: number, type: OscillatorType, peak: number) {
  if (!enabled.value) return
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.connect(gain)
  gain.connect(c.destination)
  envelope(gain, c, 0.006, duration, peak)
  osc.start()
  osc.stop(c.currentTime + duration + 0.05)
}

export function useSignalAudio() {
  function playClick() {
    tone(620, 0.05, 'sine', 0.05)
  }

  function playTune() {
    const c = getCtx()
    if (!enabled.value || !c) return
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(560, c.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1100, c.currentTime + 0.13)
    osc.connect(gain)
    gain.connect(c.destination)
    envelope(gain, c, 0.006, 0.16, 0.045)
    osc.start()
    osc.stop(c.currentTime + 0.22)
  }

  function toggle() {
    enabled.value = !enabled.value
    localStorage.setItem(STORAGE_KEY, enabled.value ? '1' : '0')
    if (enabled.value) getCtx() // warm up the context on the gesture that enabled it
  }

  return { enabled, playClick, playTune, toggle }
}
