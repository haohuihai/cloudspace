<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useFullscreen } from '@vueuse/core'
import { propTypes } from '@/utils/propTypes'
import { useDesign } from '@/hooks/web/useDesign'
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('screenfull')
defineProps({
  color: propTypes.string.def('')
})
const { toggle, isFullscreen } = useFullscreen()
const toggleFullScreen = () => {
  toggle()
}
</script>

<template>
  <div :class="prefixCls" @click="toggleFullScreen">
    <ElTooltip content="全屏">
      <Icon
        :size="18"
        :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
        :color="color"
      />
    </ElTooltip>
  </div>
</template>
