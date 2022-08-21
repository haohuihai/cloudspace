<script setup lang="ts">
import { computed, unref, ref, watch, nextTick } from 'vue'
import { ElIcon } from 'element-plus'
import { propTypes } from '@/utils/propTypes'
import Iconify from '@purge-icons/generated'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('icon')

const props = defineProps({
  // icon name
  icon: propTypes.string,
  // icon color
  color: propTypes.string,
  // icon size
  size: propTypes.number.def(16)
})

const elRef = ref<ElRef>(null)

const symbolId = computed(() => {
  return props.icon
})

const getIconifyStyle = computed(() => {
  const { color, size } = props
  return {
    fontSize: `${size}px`,
    color
  }
})

const updateIcon = async (icon: string) => {
  const el = unref(elRef)
  if (!el) return
  await nextTick()
  if (!icon) return
  const span = document.createElement('span')
  span.className = 'iconify'
  span.dataset.icon = icon
  el.textContent = ''
  el.appendChild(span)
}
watch(
  () => props.icon,
  (icon: string) => {
    updateIcon(icon)
  }
)
</script>

<template>
  <ElIcon :class="prefixCls" :size="size" :color="color">
    <span ref="elRef" :class="$attrs.class" :style="getIconifyStyle">
      <span class="iconify" :data-icon="symbolId"></span>
    </span>
  </ElIcon>
</template>
