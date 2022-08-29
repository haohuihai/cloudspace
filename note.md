一律采用的是动态路由，通过后端接口返回是什么路由


# 使用缓存的变量
系统主题：isDark -> true | false
路由信息：roleRouters
用户信息：userInfo
组件尺寸：default -> default | small | large
主 题 色：theme -> {}
使用语言：lang -> ch | en
布局模式：layout -> classic | topLeft | top | cutMenu


# 存在pinia中的变量
```js
  userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
  sizeMap: ['default', 'large', 'small'],
  mobile: false, // 是否是移动端
  title: import.meta.env.VITE_APP_TITLE, // 标题
  pageLoading: false, // 路由跳转loading
  breadcrumb: true, // 面包屑
  breadcrumbIcon: true, // 面包屑图标
  collapse: false, // 折叠菜单
  uniqueOpened: false, // 是否只保持一个子菜单的展开
  hamburger: true, // 折叠图标
  screenfull: true, // 全屏图标
  size: true, // 尺寸图标
  locale: true, // 多语言图标
  tagsView: true, // 标签页
  tagsViewIcon: true, // 是否显示标签图标
  logo: true, // logo
  fixedHeader: true, // 固定toolheader
  footer: true, // 显示页脚
  greyMode: false, // 是否开始灰色模式，用于特殊悼念日
  layout: wsCache.get('layout') || 'classic', // layout布局
  isDark: wsCache.get('isDark') || false, // 是否是暗黑模式
  currentSize: wsCache.get('default') || 'default', // 组件尺寸
  theme: wsCache.get('theme') || {
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit',
    // 头部背景颜色
    topHeaderBgColor: '#fff',
    // 头部字体颜色
    topHeaderTextColor: 'inherit',
    // 头部悬停颜色
    topHeaderHoverColor: '#f6f6f6',
    // 头部边框颜色
    topToolBorderColor: '#eee'
  }
```

# wsCache的使用
wsCache.set(key, value)
wsCache.get(key)
wsCache.delete(key)
# pinia的使用
src/stores/app.ts
```js
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => appModules,
  persist: {
    enabled: true
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb
    }
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb
    },
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}

```
src/stores/index.ts
```js
import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { store }

```


src/main.ts
```js
// 引入状态管理
import { setupStore } from '@/stores'
import { createApp } from 'vue'
// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  setupStore(app)
  app.mount('#app')
}
setupAll()
```

src/views/helloword.vue
```jsx
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
appStore.getUserInfo
appStore.setIsDark(isDarkTheme)
```
法一：
有的时候会使用下面的方法：
let aaa = appStore.getUserInfo;
<div>{{aaa}}</div>
法二：
let bbb = computed(() => appStore.getUserInfo)
<div>{{bbb}}</div>

法二：当pinia里面的值变化的时候，可以动态箭头他的变化，并重新渲染到页面上

**官方**
store 是一个用reactive 包裹的对象，这意味着不需要在getter 之后写.value，但是，就像setup 中的props 一样，我们不能对其进行解构：
// 这将是响应式的
let doubleValue = computed(() => store.doubleCount),

简单来看，引入pinia里面的createPinia方法，返回一个store,将store使用app.use(store)挂载到vue的实例上


如果要在store上使用其他插件，则如下
import piniaPluginPersist from 'pinia-plugin-persist'

store.use(piniaPluginPersist)

但最终结果是将store放到app的use里面

# Visualization页面

map获取数据是从服务端获取的，在proxy里面定义代理，这里的做法是去调用接口，然后监听客户端的socket，客户端发送消息到服务端，服务端在将数据发送到客户端，直到端开链接；

通过socket将数据发送到客户端，所以将静态文件资源都放到服务端

只有在可视化页面请求了接口，才会去监听客户端的消息。

主要的做法：

map请求接口，返回数据

在服务端使用import from导入模块报错

SyntaxError: Cannot use import statement outside a module

在服务端使用import会报错。得使用require

比如：import { Server } from 'socket.io'会报错

只有const { Server } = require('socket.io')才不回报错

本地开的服务，不管是127.0.0.1还剩localhost，在访问的时候都要用localhost去访问，为什么？

# Proxy

使用代理的时候必须使用明确的ip或者域名，不能使用localhost或者127.0.0.1

# 后端+ mock返回数据格式规范

成功：

```json
{
	code: '0000',
    data: []
}
```

失败：

```json
{
    code: '0001',
    message: '一些说明'
}
```

可视化：

echarts + websocket的使用



