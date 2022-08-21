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
// 引入动画
import '@/plugins/animate.css'
// 全局组件
import { setupGlobCom } from '@/components'
// 权限
import { setupPermission } from './directives'
// 引入状态管理
import { setupStore } from '@/stores'

import './permission'

import '@purge-icons/generated' 

// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  await setupI18n(app)
  setupStore(app)
  setupRouter(app)
  setupElementPlus(app)
  setupGlobCom(app)
  setupPermission(app)
  app.mount('#app')
}

setupAll()
