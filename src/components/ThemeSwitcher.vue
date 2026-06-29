<script setup lang="ts">
import { useSiteTheme } from '../composables/useSiteTheme'

const { theme, cycleTheme, themeLabel, nextThemeLabel } = useSiteTheme()
</script>

<template>
  <button
    type="button"
    class="theme-switcher"
    :aria-label="`Switch design theme. Current: ${themeLabel()}. Next: ${nextThemeLabel()}`"
    @click="cycleTheme"
  >
    <span class="theme-switcher-dot" :data-theme="theme" aria-hidden="true" />
    <span class="theme-switcher-label">{{ themeLabel() }}</span>
    <span class="theme-switcher-arrow" aria-hidden="true">→</span>
    <span class="theme-switcher-next">{{ nextThemeLabel() }}</span>
  </button>
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(12, 12, 18, 0.82);
  backdrop-filter: blur(14px);
  color: #f4f4f8;
  font-family: montserrat, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.theme-switcher:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
  background: rgba(20, 20, 30, 0.92);
}

.theme-switcher:active {
  transform: translateY(0);
}

.theme-switcher-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.theme-switcher-dot[data-theme='bento'] {
  background: linear-gradient(135deg, #297ccf, #46cf98);
}

.theme-switcher-dot[data-theme='classic'] {
  background: linear-gradient(135deg, #297ccf, #04b6c1);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.theme-switcher-dot[data-theme='brutalist'] {
  background: #ffe566;
  border: 2px solid #000;
}

.theme-switcher-dot[data-theme='immersive'] {
  background: linear-gradient(135deg, #6ec8ff, #8b7cf6);
  box-shadow: 0 0 8px rgba(110, 200, 255, 0.5);
}

.theme-switcher-label {
  text-transform: uppercase;
}

.theme-switcher-arrow {
  opacity: 0.45;
  font-size: 0.75rem;
}

.theme-switcher-next {
  opacity: 0.55;
  text-transform: uppercase;
  font-size: 0.72rem;
}

@media (max-width: 480px) {
  .theme-switcher {
    bottom: 14px;
    right: 14px;
    left: 14px;
    justify-content: center;
  }

  .theme-switcher-next {
    display: none;
  }

  .theme-switcher-arrow {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-switcher {
    transition: none;
  }

  .theme-switcher:hover {
    transform: none;
  }
}
</style>
