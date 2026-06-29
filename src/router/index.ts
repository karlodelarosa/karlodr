import { createRouter, createWebHistory } from 'vue-router'

import HomeShell from '../pages/HomeShell.vue'

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
      path: '/classic',
      redirect: { path: '/', query: { theme: 'classic' } },
    },
    {
      path: '/new',
      redirect: { path: '/', query: { theme: 'brutalist' } },
    },
  ],
})

router.beforeEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Karlo Dela Rosa'
  document.title = title
})

export default router
