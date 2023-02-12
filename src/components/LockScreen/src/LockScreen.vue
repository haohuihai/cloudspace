<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { useFullscreen } from '@vueuse/core'
import { propTypes } from '@/utils/propTypes'
defineProps({
  color: propTypes.string.def('')
})
const { toggle, isFullscreen } = useFullscreen()
const toggleFullScreen = () => {
  toggle()
}
const handleLock = () => {}
</script>

<template>
  <div @click="handleLock">
    <ElTooltip content="锁屏" placement="bottom">
      <Icon :size="18" icon="ic:outline-lock" :color="color" />
    </ElTooltip>
  </div>
</template>
