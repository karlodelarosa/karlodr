<script setup lang="ts">
import { profile } from '../../data/signal'
import LiquidText from './LiquidText.vue'
import { useIntroState } from '../../composables/useIntroState'
import { useMagnetic } from '../../composables/useMagnetic'
import { useSignalAudio } from '../../composables/useSignalAudio'

const { introComplete } = useIntroState()
const { onMagneticMove, onMagneticLeave } = useMagnetic()
const { playClick } = useSignalAudio()
</script>

<template>
  <section id="hero" class="hero">
    <div class="wrap hero-inner" :class="{ 'is-revealed': introComplete }">
      <p class="tag">
        <span class="dot" aria-hidden="true"></span>
        {{ profile.location }}
      </p>

      <h1 class="hero-name">
        <LiquidText>
          <span class="chroma" :class="{ settle: introComplete }" :data-text="profile.name">{{ profile.name }}</span>
        </LiquidText>
      </h1>
      <p class="hero-role mono">{{ profile.role }}</p>

      <p class="hero-tagline">{{ profile.tagline }}</p>

      <div class="hero-actions">
        <a
          href="#work"
          class="btn btn-primary"
          data-tune
          @mousemove="onMagneticMove($event, 0.3, 10)"
          @mouseleave="onMagneticLeave"
          @click="playClick"
          >View work</a
        >
        <a
          href="#contact"
          class="btn btn-ghost"
          data-tune
          @mousemove="onMagneticMove($event, 0.3, 10)"
          @mouseleave="onMagneticLeave"
          @click="playClick"
          >Get in touch</a
        >
      </div>
    </div>

    <div class="scroll-cue mono" :class="{ 'is-revealed': introComplete }" aria-hidden="true">tune in ↓</div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid var(--panel-edge);
}

.hero-inner {
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(22px);
  filter: blur(10px);
  transition: opacity 5s var(--ease-tune), transform 5s var(--ease-tune), filter 5s var(--ease-tune);
}

.hero-inner.is-revealed {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--carrier);
  box-shadow: 0 0 8px var(--carrier);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

.hero-name {
  font-size: clamp(3.5rem, 12vw, 10rem);
  line-height: 0.92;
  color: var(--signal);
  margin-bottom: 0.1em;
}

.hero-role {
  margin-top: 0.9rem;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--carrier);
}

.hero-tagline {
  margin-top: 1.75rem;
  max-width: 38rem;
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  color: var(--fog);
}

.hero-actions {
  margin-top: 2.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 2px;
  border: 1px solid var(--panel-edge);
  transition: border-color 0.3s var(--ease-tune), color 0.3s var(--ease-tune), background 0.3s var(--ease-tune),
    transform 0.25s ease-out;
}
.btn-primary {
  color: var(--void);
  background: var(--signal);
  border-color: var(--signal);
}
.btn-primary:hover {
  background: var(--carrier);
  border-color: var(--carrier);
}
.btn-ghost {
  color: var(--signal);
}
.btn-ghost:hover {
  border-color: var(--interference);
  color: var(--interference);
}

.scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: var(--edge);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fog);
  z-index: 1;
  opacity: 0;
  transition: opacity 3.3s var(--ease-tune) 2.1s;
  animation: bob 2.6s ease-in-out infinite;
}

.scroll-cue.is-revealed {
  opacity: 1;
}
@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}
</style>
