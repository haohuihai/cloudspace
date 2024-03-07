import formCreate from '@form-create/element-ui'
import { App } from 'vue'
export const setupFormCreate = (app: App<Element>) => {
  app.use(formCreate)
}