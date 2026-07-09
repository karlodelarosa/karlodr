import { createRouter, createWebHistory } from 'vue-router'

import HomeShell from '../pages/HomeShell.vue'
import MePage from '../pages/MePage.vue'
import RootExperience from '../pages/root/RootExperience.vue'
import RootLabs from '../pages/root/RootLabs.vue'
import RootNow from '../pages/root/RootNow.vue'
import RootLink from '../pages/root/RootLink.vue'
import { useRouteTransition, wait } from '../composables/useRouteTransition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/experience',
      name: 'experience',
      component: RootExperience,
      meta: {
        title: 'Experience — Karlo Dela Rosa',
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
      path: '/now',
      name: 'now',
      component: RootNow,
      meta: {
        title: 'Now — Karlo Dela Rosa',
      },
    },
    {
      path: '/me',
      name: 'me',
      component: MePage,
      meta: {
        title: 'Me — Karlo Dela Rosa',
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
      path: '/classic',
      redirect: { path: '/', query: { theme: 'classic' } },
    },
    {
      path: '/new',
      redirect: { path: '/', query: { theme: 'brutalist' } },
    },
    {
      path: '/immersive',
      redirect: { path: '/', query: { theme: 'immersive' } },
    },
    {
      path: '/root',
      redirect: { path: '/', query: { theme: 'root' } },
    },
    {
      path: '/signal',
      redirect: { path: '/', query: { theme: 'signal' } },
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
