<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex p-20px">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <!-- <ElCard class="!my-4 enter-y" :loading="loading"> -->
        <!-- <img class="xl:h-50 h-30 mx-auto" src="../../../assets/svg/illustration.svg" /> -->

        <!-- </ElCard> -->
        <TimeLine class="!my-4" />
        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElCard } from 'element-plus'
import { PageWrapper } from '@/components/Page'
import WorkbenchHeader from './components/WorkbenchHeader.vue'
import ProjectCard from './components/ProjectCard.vue'
import QuickNav from './components/QuickNav.vue'
import DynamicInfo from './components/DynamicInfo.vue'
import SaleRadar from './components/SaleRadar.vue'
import TimeLine from './components/TimeLine.vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 500)
</script>
