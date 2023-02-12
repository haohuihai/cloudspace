import { App } from 'vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

// 预览插件
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

//使用的是vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// 引入emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// todo-list
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

// 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'

import Prism from 'prismjs'

VMdPreview.use(vuepressTheme, {
  Prism
})
  .use(createEmojiPlugin())
  .use(createTodoListPlugin())
  .use(createAlignPlugin())

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})
  .use(createEmojiPlugin())
  .use(createTodoListPlugin())
  .use(createAlignPlugin())
export const setupVueMarkdownEditor = (app: App<Element>) => {
  app.use(VueMarkdownEditor)
  app.use(VMdPreview)
}
