<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { Collapse } from '@/components/Collapse'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { Notify } from '@/components/Notify'
import { LockScreen } from '@/components/LockScreen'
import { UserInfo } from '@/components/UserInfo'
import { Screenfull } from '@/components/Screenfull'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useAppStore } from '@/stores/modules/app'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls, variables } = useDesign()

const prefixCls = getPrefixCls('tool-header')

const appStore = useAppStore()

// 面包屑
const breadcrumb = computed(() => appStore.getBreadcrumb)

// 折叠图标
const hamburger = computed(() => appStore.getHamburger)

// 全屏图标
const screenfull = computed(() => appStore.getScreenfull)

// 锁屏图标
const lockscreen = computed(() => appStore.getLockScreen)

// 尺寸图标
const notice = computed(() => appStore.getNotice)

// 布局
const layout = computed(() => appStore.getLayout)

// 多语言图标
const locale = computed(() => appStore.getLocale)

export default defineComponent({
  name: 'ToolHeader',
  setup() {
    return () => (
      <div
        id={`${variables.namespace}-tool-header`}
        class={[
          prefixCls,
          'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
          'dark:bg-[var(--el-bg-color)]'
        ]}
      >
        {layout.value !== 'top' ? (
          <div class="h-full flex items-center">
            {hamburger.value && layout.value !== 'cutMenu' ? (
              <Collapse class="hover-tigger" color="var(--top-header-text-color)"></Collapse>
            ) : undefined}
            {false && breadcrumb.value ? <Breadcrumb class="<md:hidden"></Breadcrumb> : undefined}
          </div>
        ) : undefined}
        <div class="h-full flex items-center">
          {notice.value && <Notify class="hover-tigger" color="var(--top-header-text-color)" />}
          {screenfull.value ? (
            <Screenfull class="hover-tigger" color="var(--top-header-text-color)"></Screenfull>
          ) : undefined}
          {lockscreen.value ? (
            <LockScreen class="hover-tigger" color="var(--top-header-text-color)"></LockScreen>
          ) : undefined}
         {
          // locale.value ? (
          //   <LocaleDropdown
          //     class="hover-tigger"
          //     color="var(--top-header-text-color)"
          //   ></LocaleDropdown>
          // ) : undefined
          
          }
          <UserInfo class="hover-tigger"></UserInfo>
        </div>
      </div>
    )
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-tool-header';

.@{prefix-cls} {
  transition: left var(--transition-time-02);
}
</style>
