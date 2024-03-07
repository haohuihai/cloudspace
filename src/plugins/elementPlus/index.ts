import type { App } from 'vue'

// 需要全局引入一些组件，如ElScrollbar，不然一些下拉项样式有问题
import { 
      ElLoading,
      ElScrollbar,
      ElForm,
      ElTooltip,
      ElRow,
      ElCol,
      ElFormItem,
      ElCheckboxGroup,
      ElCheckbox,
      ElInput,
      ElButton,
      ElContainer,
      ElAside,
      ElMain,
      ElHeader,
      ElDialog,
      ElSelect,
      ElCalendar,
      ElInputNumber,
      ElRadio,
      ElSlider,
      ElDatePicker,
      ElImage,
      ElDropdown,
      ElSwitch,
      ElTree,
      ElBreadcrumb,
      ElTable,
      ElRadioGroup,
      ElOption,
      ElDivider,
      ElPopconfirm,
      ElTransfer,
      ElColorPicker,
      ElCascader,
      ElRate,
      ElIcon,
      ElUpload,
      ElAlert,
      ElTabPane,
      ElTabs,
     } from 'element-plus'

const plugins = [ElLoading]

const components = [
  ElScrollbar,
  ElTabPane,
  ElTabs,
  ElCascader,
  ElAlert,
  ElRate,
  ElIcon,
  ElUpload,
  ElColorPicker,
  ElTransfer,
  ElTooltip,
  ElOption,
  ElInput,
  ElDivider,
  ElRadioGroup,
  ElPopconfirm,
  ElAside,
  ElContainer,
  ElForm,
  ElRow,
  ElFormItem,
  ElCol,
  ElCheckboxGroup,
  ElCheckbox,
  ElSlider,
  ElDatePicker,
  ElImage,
  ElDropdown,
  ElSwitch,
  ElTree,
  ElBreadcrumb,
  ElTable,
  ElMain,
  ElHeader,
  ElTooltip,
  ElButton,
  ElDialog,
  ElSelect,
  ElCalendar,
  ElInputNumber,
  ElRadio,
]

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
