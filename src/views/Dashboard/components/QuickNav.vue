<template>
  <ElCard v-bind="$attrs" :body-style="{ padding: '0' }">
    <template #header>快捷导航</template>
    <ElRow>
      <ElCol :span="8" v-for="item in navItems" :key="item.title">
        <ElCard shadow="hover">
          <span class="flex flex-col items-center">
            <Icon :icon="item.icon" :color="item.color" size="20" />
            <span class="text-md mt-2">{{ item.title }}</span>
          </span>
        </ElCard>
      </ElCol>
    </ElRow>
  </ElCard>
</template>
<script lang="ts" setup>
import { ElCard, ElRow, ElCol } from 'element-plus'
import { navItems } from '../data'
</script>
