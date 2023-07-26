import { createRouter, createWebHistory } from 'vue-router'

import TheHome from '../pages/TheHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/',
          name: 'home',
          component: TheHome,
          meta: {
              title: "Karlo Dela Rosa"
          }
      },
  ]
})

export default router
