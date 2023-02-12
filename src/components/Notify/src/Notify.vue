<script lang="ts">
import { Icon } from '@/components/Icon'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Notify',
  setup() {
    function handleNotify() {}
    return {
      handleNotify
    }
  }
})
</script>
<template>
  <div>
    <ElTooltip content="通知" placement="bottom" @click="handleNotify">
      <Icon :size="18" icon="mdi:bell-outline" />
    </ElTooltip>
  </div>
</template>
