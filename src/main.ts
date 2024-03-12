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



// 引入字体的文件
import '@/assets/font/iconfont.css'
// 引入全局的样式文件
import '@/styles/global.less'

// 引入element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入formCreate
import { setupFormCreate } from '@/plugins/formCreate'

// 引入rem字体配置文件

import '@/utils/rem'

// 引入vueknova
import { setupVueKonva } from '@/plugins/konva'

import { setElementIcons } from '@/plugins/elIcon'
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
// 引入markdown插件
import { setupVueMarkdownEditor } from '@/plugins/mdEditor'

import '@/socket'
// import SocketService from '@/utils/socket_service'
import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'


// import '@/socket'
// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  
  app.use(formCreate)
  app.use(FcDesigner)
  await setupI18n(app)
  setupStore(app)
  setupRouter(app)
  setElementIcons(app)
  setupElementPlus(app)
  setupGlobCom(app)
  setupPermission(app)
  setupVueMarkdownEditor(app)
  setupVueKonva(app)
  setupFormCreate(app)
  app.mount('#app')
}

setupAll()
