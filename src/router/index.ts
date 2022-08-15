import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login/Login.vue')
    }
  ]
})
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
export default router
