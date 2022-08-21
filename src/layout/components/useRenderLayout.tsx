import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { Menu } from '@/components/Menu'
import { TabMenu } from '@/components/TabMenu'
import { TagsView } from '@/components/TagsView'
import { Logo } from '@/components/Logo'
import AppView from './AppView.vue'
import ToolHeader from './ToolHeader.vue'
import { ElScrollbar } from 'element-plus'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('layout')

const appStore = useAppStore()

const pageLoading = computed(() => appStore.getPageLoading)

// 标签页
const tagsView = computed(() => appStore.getTagsView)

// 菜单折叠
const collapse = computed(() => appStore.getCollapse)

// logo
const logo = computed(() => appStore.logo)

// 固定头部
const fixedHeader = computed(() => appStore.getFixedHeader)

// 是否是移动端
const mobile = computed(() => appStore.getMobile)

export const useRenderLayout = () => {
  const renderClassic = () => {
    return (
      <>
        <div class={['absolute top-0 left-0 h-full', { '!fixed z-3000': mobile.value }]}>
          {logo.value ? (
            <Logo
              class={[
                'bg-[var(--left-menu-bg-color)] border-bottom-1 border-solid border-[var(--logo-border-color)] dark:border-[var(--el-border-color)]',
                {
                  '!pl-0': mobile.value && collapse.value,
                  'w-[var(--left-menu-min-width)]': appStore.getCollapse,
                  'w-[var(--left-menu-max-width)]': !appStore.getCollapse
                }
              ]}
              style="transition: all var(--transition-time-02);"
            ></Logo>
          ) : undefined}
          <Menu class={[{ '!h-[calc(100%-var(--logo-height))]': logo.value }]}></Menu>
        </div>
        <div
          class={[
            `${prefixCls}-content`,
            'absolute top-0 h-[100%]',
            {
              'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                collapse.value && !mobile.value && !mobile.value,
              'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                !collapse.value && !mobile.value && !mobile.value,
              'fixed !w-full !left-0': mobile.value
            }
          ]}
          style="transition: all var(--transition-time-02);"
        >
          <ElScrollbar
            v-loading={pageLoading.value}
            class={[
              `${prefixCls}-content-scrollbar`,
              {
                '!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))] mt-[calc(var(--top-tool-height)+var(--tags-view-height))]':
                  fixedHeader.value
              }
            ]}
          >
            <div
              class={[
                {
                  'fixed top-0 left-0 z-10': fixedHeader.value,
                  'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                    collapse.value && fixedHeader.value && !mobile.value,
                  'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                    !collapse.value && fixedHeader.value && !mobile.value,
                  '!w-full !left-0': mobile.value
                }
              ]}
              style="transition: all var(--transition-time-02);"
            >
              <ToolHeader class="border-bottom-1 border-solid border-[var(--top-tool-border-color)] bg-[var(--top-header-bg-color)] dark:border-[var(--el-border-color)]"></ToolHeader>

              {tagsView.value ? (
                <TagsView class="border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]"></TagsView>
              ) : undefined}
            </div>

            <AppView></AppView>
          </ElScrollbar>
        </div>
      </>
    )
  }
  return {
    renderClassic
  }
}
