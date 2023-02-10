<template>
  <div class="p-20px">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import GrowCard from './GrowCard.vue'
import SiteAnalysis from './SiteAnalysis.vue'
import VisitSource from './VisitSource.vue'
import VisitRadar from './VisitRadar.vue'
import SalesProductPie from './SalesProductPie.vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 500)
</script>
