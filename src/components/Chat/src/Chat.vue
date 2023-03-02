<template>
  <div :class="prefixCls" @click="handleShowChat">
    <div class="fixed bottom-12 right-12 cursor-pointer" style="color: #409eff">
      <Icon :size="50" icon="cryptocurrency:chat" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useDesign } from '@/hooks/web/useDesign'
import { useAppStore } from '@/stores/modules/app'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('chat')
const appStore = useAppStore()

function handleShowChat() {
  const visible = appStore.getChatVisiable
  appStore.setChatVisible(!visible)
}
</script>
