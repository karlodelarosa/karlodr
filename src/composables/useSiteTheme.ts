import { ref, watch } from 'vue'

export type SiteTheme = 'root' | 'signal' | 'bento' | 'classic' | 'brutalist' | 'immersive'

const STORAGE_KEY = 'karlodr-site-theme'

const THEME_ORDER: SiteTheme[] = ['root', 'signal', 'bento', 'classic', 'brutalist', 'immersive']

const THEME_LABELS: Record<SiteTheme, string> = {
  root: 'Root',
  signal: 'Signal',
  bento: 'Bento',
  classic: 'Classic',
  brutalist: 'Brutal',
  immersive: 'Immersive',
}

function readStoredTheme(): SiteTheme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (
    stored === 'root' ||
    stored === 'signal' ||
    stored === 'bento' ||
    stored === 'classic' ||
    stored === 'brutalist' ||
    stored === 'immersive'
  ) {
    return stored
  }
  return 'root'
}

const theme = ref<SiteTheme>(readStoredTheme())

function applyDocumentTheme(next: SiteTheme) {
  const el = document.documentElement
  if (next === 'root' || next === 'signal' || next === 'bento' || next === 'classic' || next === 'immersive') {
    el.classList.add('dark')
  } else if (next === 'brutalist') {
    el.classList.remove('dark')
  }
}

watch(
  theme,
  (next) => {
    localStorage.setItem(STORAGE_KEY, next)
    applyDocumentTheme(next)
  },
  { immediate: true }
)

export function useSiteTheme() {
  function setTheme(next: SiteTheme, options?: { scroll?: boolean }) {
    if (theme.value !== next) {
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      theme.value = next
    }
  }

  function cycleTheme() {
    const index = THEME_ORDER.indexOf(theme.value)
    const next = THEME_ORDER[(index + 1) % THEME_ORDER.length]
    setTheme(next)
  }

  function themeLabel(value: SiteTheme = theme.value) {
    return THEME_LABELS[value]
  }

  function nextThemeLabel() {
    const index = THEME_ORDER.indexOf(theme.value)
    const next = THEME_ORDER[(index + 1) % THEME_ORDER.length]
    return THEME_LABELS[next]
  }

  return {
    theme,
    setTheme,
    cycleTheme,
    themeLabel,
    nextThemeLabel,
    THEME_ORDER,
  }
}
