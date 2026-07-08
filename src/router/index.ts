import { createRouter, createWebHistory } from 'vue-router'

import HomeShell from '../pages/HomeShell.vue'
import RootExperience from '../pages/root/RootExperience.vue'
import RootLabs from '../pages/root/RootLabs.vue'
import RootNow from '../pages/root/RootNow.vue'
import RootLink from '../pages/root/RootLink.vue'

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

router.beforeEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Karlo Dela Rosa'
  document.title = title
})

export default router
