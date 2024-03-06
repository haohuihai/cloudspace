<template>
  <img 
    :src="{logoSrc}"
    class="w-[calc(var(--logo-height)-10px)] h-[calc(var(--logo-height)-10px)]"
  />
</template>
<script>
import { useAppStore } from '@/stores/modules/app'
import {  } from 'fs/promises'

import { computed, defineComponent, watch, ref } from 'vue'
export default {
  setup() {
    const appStore = useAppStore()
    let logoSrc = ref('@/assets/imgs/logo.png')
    watch(appStore.getCollapse, () => {
      logoSrc.value = '@/assets/imgs/logo_light2.png'
      console.log('appStore.getCollapse',  appStore.getCollapse);
    }, {
      deep: true
    })
    // const logoSrc = computed(() => {
    //   return appStore.getCollapse ? '@/assets/imgs/logo_light2.png' : '@/assets/imgs/logo.png' 
    // })

    console.log('logoSrc', logoSrc.value);
   
  }
  }
</script>
