<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { profile } from '../../data/signal'
import LiquidText from './LiquidText.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useMagnetic } from '../../composables/useMagnetic'
import { useSignalAudio } from '../../composables/useSignalAudio'

const { target, revealed } = useScrollReveal()
const { onMagneticMove, onMagneticLeave } = useMagnetic()
const { playClick } = useSignalAudio()
</script>

<template>
  <section id="contact">
    <div class="wrap contact-inner">
      <p class="tag">107.1 — msg</p>
      <div class="scanline-rule"></div>

      <div ref="target" class="contact-body" :class="{ 'is-revealed': revealed }">
        <h2 class="contact-heading">
          <LiquidText>
            <span class="chroma" :class="{ 'settle-quick': revealed }" data-text="Send a transmission.">Send a transmission.</span>
          </LiquidText>
        </h2>
        <p class="contact-sub">
          Open to composable commerce and full-stack web work. Reach out about a project, a role, or just to say hi — fastest way to reach me is email.
        </p>

        <a
          class="email-link"
          :href="`mailto:${profile.email}`"
          data-tune
          @mousemove="onMagneticMove($event, 0.25, 10)"
          @mouseleave="onMagneticLeave"
          @click="playClick"
        >
          {{ profile.email }}
        </a>

        <ul class="socials">
          <li>
            <RouterLink
              to="/cv"
              class="mono"
              data-tune
              @mousemove="onMagneticMove($event, 0.3, 8)"
              @mouseleave="onMagneticLeave"
              @click="playClick"
              >CV</RouterLink
            >
          </li>
          <li v-for="s in profile.socials" :key="s.label">
            <a
              :href="s.href"
              class="mono"
              data-tune
              target="_blank"
              rel="noopener noreferrer"
              @mousemove="onMagneticMove($event, 0.3, 8)"
              @mouseleave="onMagneticLeave"
              @click="playClick"
              >{{ s.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
#contact {
  border-bottom: none;
}

.contact-inner {
  text-align: left;
}

.contact-body {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 1s var(--ease-tune), transform 1s var(--ease-tune);
}
.contact-body.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

.contact-heading {
  font-size: clamp(3rem, 9vw, 6.5rem);
  line-height: 0.95;
  max-width: 11ch;
}

.contact-sub {
  margin-top: 1.25rem;
  max-width: 42ch;
  color: var(--fog);
  font-size: 1.02rem;
}

.email-link {
  display: inline-block;
  margin-top: 2.5rem;
  font-family: var(--font-mono);
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  color: var(--signal);
  text-decoration: none;
  border-bottom: 1px solid var(--panel-edge);
  padding-bottom: 0.35rem;
  transition: color 0.3s var(--ease-tune), border-color 0.3s var(--ease-tune), transform 0.25s ease-out;
}
.email-link:hover {
  color: var(--carrier);
  border-color: var(--carrier);
}

.socials {
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  display: flex;
  gap: 2rem;
}
.socials a {
  display: inline-block;
  text-decoration: none;
  color: var(--fog);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  transition: color 0.3s var(--ease-tune), transform 0.25s ease-out;
}
.socials a:hover {
  color: var(--interference);
}
</style>
