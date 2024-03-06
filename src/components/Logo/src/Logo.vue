<template>
  <img 
    :src="getImageUrl(logoSrc)"
    class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
  />
</template>
<script>
import { useAppStore } from '@/stores/modules/app'
import { computed, defineComponent, watch, ref } from 'vue'
export default {
  setup() {

    let logoSrc = ref('logo.png')
    const appStore = useAppStore()

    watch(() => appStore.getCollapse, (oldValue, newValue) => {
      let name = newValue ?  'logo_light2.png' : 'logo.png'
      logoSrc.value = name
    })

    const getImageUrl = (name) => {
      return new URL(`../../../assets/imgs/${name}`, import.meta.url).href
    }
    
    return {
      getImageUrl,
      logoSrc
    }
  }
}
</script>
