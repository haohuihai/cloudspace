import { createApp } from 'vue'
// 引入windi css
import App from './App.vue'
import '@/plugins/windi.css'
// 路由
import { setupRouter } from './router'
// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'
// 引入全局样式
import '@/styles/index.less'
import './assets/main.css'
// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入vueknova

import { setupVueKonva } from '@/plugins/konva'
// 引入动画
import '@/plugins/animate.css'
// 全局组件
import { setupGlobCom } from '@/components'
// 权限
import { setupPermission } from './directives'
// 引入状态管理
import { setupStore } from '@/stores'
// 引入字体的文件
import '@/assets/font/iconfont.css'
// 引入全局的样式文件
import '@/styles/global.less'

import './permission'

import '@purge-icons/generated'
// 引入markdown插件
import { setupVueMarkdownEditor } from '@/plugins/mdEditor'

import '@/socket'
// import SocketService from '@/utils/socket_service'

// 引入socket

// import '@/socket'
// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  await setupI18n(app)
  // app.config.globalProperties.$socket = SocketService
  app.config.globalProperties.$echarts = window.echarts
  setupStore(app)
  setupRouter(app)
  setupElementPlus(app)
  setupGlobCom(app)
  setupPermission(app)
  setupVueMarkdownEditor(app)
  setupVueKonva(app)
  app.mount('#app')
}

setupAll()
