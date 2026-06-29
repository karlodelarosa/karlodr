import { ref, watch } from 'vue'

export type SiteTheme = 'bento' | 'classic' | 'brutalist'

const STORAGE_KEY = 'karlodr-site-theme'

const THEME_ORDER: SiteTheme[] = ['bento', 'classic', 'brutalist']

const THEME_LABELS: Record<SiteTheme, string> = {
  bento: 'Bento',
  classic: 'Classic',
  brutalist: 'Brutal',
}

function readStoredTheme(): SiteTheme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'bento' || stored === 'classic' || stored === 'brutalist') {
    return stored
  }
  return 'bento'
}

const theme = ref<SiteTheme>(readStoredTheme())

function applyDocumentTheme(next: SiteTheme) {
  const el = document.documentElement
  if (next === 'bento' || next === 'classic') {
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
