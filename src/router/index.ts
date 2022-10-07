import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'

// 这里的路由可以是默认路由
export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/backmanage',
    component: Layout,
    redirect: '/backmanage/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    component: () => import('@/views/Home/Home.vue'),
    name: 'Home',
    meta: {
      title: '首页',
      hidden: true
    }
  },
  {
    path: '/visualization',
    component: () => import('@/views/Visualization/Visualization.vue'),
    name: 'Visiual',
    meta: {
      title: '可视化',
      hidden: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'login',
    meta: {
      hidden: true,
      title: 'login',
      noTagsView: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
export default router
