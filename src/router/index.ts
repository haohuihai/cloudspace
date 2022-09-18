import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/backmanage',
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
    path: '/article',
    component: () => import('@/views/Article/Article.vue'),
    name: 'Article',
    meta: {
      title: '文章列表',
      hidden: true
    }
  },
  {
    path: '/article/publisharticle',
    component: () => import('@/views/Article/publicArticle.vue'),
    name: 'PublishArticle',
    meta: {
      title: '写文章',
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
    name: 'Login',
    meta: {
      hidden: true,
      title: 'login',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true,
          affix: true
        }
      },
    ]
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
