import router from './router'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单


// 这里路由切换一次会重新走一次
router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/dashboard' })
    } else if (wsCache.get(appStore.getLockPassword)) {  // 判断是否是锁屏状态
      next({path: '/lockScreen'})
    }else {
      // 判断是否已经将路由添加到store里面
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }
      
      // 没添加 进行添加
      // 开发者可根据实际情况进行修改   拿缓存中的路由；放到store里面 并push了404的路由
      const roleRouters = wsCache.get('roleRouters') || []
      await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])

      // 拿store的路由   添加到可访问路由表    
      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })

      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)

      // 这里有重定向的问题
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      // 路由添加完，可以直接进入下面的页面
      permissionStore.setIsAddRouters(true)
      next(nextData.path)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})
