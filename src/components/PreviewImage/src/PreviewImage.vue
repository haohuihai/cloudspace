<template>
  <!-- 预览图片 -->
  <div
    class="previewMask"
    @click="handleCloseImage"
    :style="{ display: isVisibleImg ? 'block' : 'none' }"
  >
    <div class="previewModal" :style="{}">
      <img :src="imageSrc" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect, unref, onMounted, watch } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
const props = {
  isVisibleImg: { type: Boolean, default: false },
  imageSrc: { type: String, default: '' }
}
export default defineComponent({
  name: 'PreviewImage',
  props,
  emits: ['handle-close-preview'],
  setup(props, { emit }) {
    function handleCloseImage() {
      emit('handle-close-preview')
    }
    return {
      handleCloseImage
    }
  }
})
</script>
<style lang="less" scoped>
.previewMask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(96, 96, 96, 0.6);
  animation: fadeInDown 0.2s;
}
.previewModal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 19941206;
  cursor: move;
  display: block;
  width: 400px;
  height: 400px;
  margin: auto;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
