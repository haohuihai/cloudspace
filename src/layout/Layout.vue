<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { useRenderLayout } from './components/useRenderLayout'
import { Setting } from '@/components/Setting'
import { Chat } from '@/components/Chat'
import { ChatModal } from '@/components/ChatModal'
import { LockScreenModal } from '@/components/LockScreen'
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')

const appStore = useAppStore()
const mobile = computed(() => appStore.getMobile)
const collapse = computed(() => appStore.getCollapse)
const layout = computed(() => appStore.getLayout)
const isShoLockModal = computed(() => appStore.getLockScreen)

const handleClickOutside = () => {
  appStore.setCollapse(true)
}
const renderLayout = () => {
  switch (unref(layout)) {
    case 'classic':
      const { renderClassic } = useRenderLayout()
      return renderClassic()
    case 'topLeft':
      const { renderTopLeft } = useRenderLayout()
      return renderTopLeft()
    case 'top':
      const { renderTop } = useRenderLayout()
      return renderTop()
    case 'cutMenu':
      const { renderCutMenu } = useRenderLayout()
      return renderCutMenu()
    default:
      break
  }
}
//  {
//           <Backtop></Backtop>
//         }
export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section class={[prefixCls, `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']}>
        {mobile.value && !collapse.value ? (
          <div
            class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
            onClick={handleClickOutside}
          ></div>
        ) : undefined}
        {renderLayout()}
        <Chat />
        <ChatModal />
        <LockScreenModal isShoLockModal={unref(isShoLockModal)}/>
        <Setting></Setting>
      </section>
    )
  }
})
</script>
