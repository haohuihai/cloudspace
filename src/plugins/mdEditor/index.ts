import { App } from 'vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
//使用的是vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})

// const pluginList = [
//     VueMarkdownEditor
// ]
// const plugins = {
//     install (app: App<Element>) {
//         // 批量注册插件  改用自动引入
//         Object.entries(pluginList).forEach(([, v]) => {
//             app.use(v)
//         })
//     }
// }

export const setupVueMarkdownEditor = (app: App<Element>) => {
    app.use(VueMarkdownEditor)
  }
//   export default router

// export default plugins
