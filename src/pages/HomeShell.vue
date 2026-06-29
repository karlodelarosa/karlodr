<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BentoHome from './BentoHome.vue'
import TheHome from './TheHome.vue'
import NewHome2 from './NewHome2.vue'
import ThemeSwitcher from '../components/ThemeSwitcher.vue'
import { useSiteTheme, type SiteTheme } from '../composables/useSiteTheme'

const route = useRoute()
const router = useRouter()
const { theme, setTheme } = useSiteTheme()

const themeComponents = {
  bento: BentoHome,
  classic: TheHome,
  brutalist: NewHome2,
} as const

const activeComponent = computed(() => themeComponents[theme.value])

function parseThemeQuery(value: unknown): SiteTheme | null {
  if (value === 'bento' || value === 'classic' || value === 'brutalist') {
    return value
  }
  if (value === 'new') return 'brutalist'
  return null
}

onMounted(() => {
  const fromQuery = parseThemeQuery(route.query.theme)
  if (fromQuery) {
    setTheme(fromQuery, { scroll: false })
    router.replace({ path: '/', query: {} })
  }
})

watch(
  () => route.query.theme,
  (value) => {
    const parsed = parseThemeQuery(value)
    if (parsed) {
      setTheme(parsed, { scroll: false })
      router.replace({ path: '/', query: {} })
    }
  }
)
</script>

<template>
  <div class="home-shell">
    <transition appear mode="out-in" enter-active-class="animate__animated animate__fadeIn">
      <component :is="activeComponent" :key="theme" />
    </transition>
    <ThemeSwitcher />
  </div>
</template>

<style scoped>
.home-shell {
  position: relative;
  width: 100%;
}
</style>
