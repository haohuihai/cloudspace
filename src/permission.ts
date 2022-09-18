import router from './router'
import { useAppStoreWithOut } from '@/stores/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/stores/modules/permission'
// import { useDictStoreWithOut } from '@/stores/modules/dict'
import { usePageLoading } from '@/hooks/web/usePageLoading'
// import { getDictApi } from '@/api/common'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

// const dictStore = useDictStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      // 判断是否已经将路由添加到store里面
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      // if (!dictStore.getIsSetDict) {
      //   // 获取所有字典
      //   const res = await getDictApi()
      //   if (res) {
      //     dictStore.setDictObj(res.data)
      //     dictStore.setIsSetDict(true)
      //   }
      // }
      // 开发者可根据实际情况进行修改   拿缓存中的路由；放到store里面 并push了404的路由
      const roleRouters = wsCache.get('roleRouters') || []
      await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])


      // 拿store的路由   添加到可访问路由表
      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) 
      })

      // 
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      // 路由添加完，可以直接进入下面的页面
      permissionStore.setIsAddRouters(true)

      next(nextData)
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
