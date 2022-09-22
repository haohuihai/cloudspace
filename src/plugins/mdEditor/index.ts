import { App } from 'vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
//使用的是vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'

VMdPreview.use(vuepressTheme, {
  Prism
})

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  config: {
    toc: {
      includeLevel: [1, 5]
    }
  }
})

export const setupVueMarkdownEditor = (app: App<Element>) => {
  app.use(VueMarkdownEditor)
  app.use(VMdPreview)
}
