import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: '',
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: '',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    }
  }
]
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
