import { createRouter, createWebHistory } from 'vue-router'

import HomeShell from '../pages/HomeShell.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import RootLabs from '../pages/root/RootLabs.vue'
import RootLink from '../pages/root/RootLink.vue'
import { useRouteTransition, wait } from '../composables/useRouteTransition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeShell,
      meta: {
        title: 'Karlo Dela Rosa',
      },
    },
    {
      path: '/labs',
      name: 'labs',
      component: RootLabs,
      meta: {
        title: 'Labs — Karlo Dela Rosa',
      },
    },
    {
      path: '/link',
      name: 'link',
      component: RootLink,
      meta: {
        title: 'Connect — Karlo Dela Rosa',
      },
    },
    {
      path: '/work/:slug',
      name: 'work',
      component: ProjectDetail,
      meta: {
        title: 'Work — Karlo Dela Rosa',
      },
    },
  ],
})

let transitionToken = 0

router.beforeEach(async (to, from) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Karlo Dela Rosa'
  document.title = title

  if (!from.name || to.path === from.path) return

  const token = ++transitionToken
  const { phase } = useRouteTransition()
  phase.value = 'covering'
  await wait(350)
  if (token !== transitionToken) return
})

router.afterEach((to, from) => {
  if (!from.name || to.path === from.path) return

  const token = transitionToken
  const { phase } = useRouteTransition()
  requestAnimationFrame(() => {
    if (token !== transitionToken) return
    phase.value = 'revealing'
    setTimeout(() => {
      if (token !== transitionToken) return
      phase.value = 'idle'
    }, 350)
  })
})

export default router
