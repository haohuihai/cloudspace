<template>
  <ElCard v-bind="$attrs">
    <template #header
      ><div class="flex justify-between items-center"
        >最新动态
        <ElButton text type="primary" size="small" style="fontsize: 16px">更多</ElButton></div
      ></template
    >

    <div class="flex w-100%" v-for="(item, index) in dynamicInfoItems" :key="index">
      <img class="w-30px h-30px rounded-full mr-10px" :src="headerImg" alt="" />
      <div class="flex-1">
        <div class="h-30px leading-30px"> {{ item.name }} <span v-html="item.desc"></span> </div>
        <div>{{ item.date }}</div>
        <ElDivider style="margintop: 10px; marginbottom: 10px" />
      </div>
    </div>
  </ElCard>
</template>
<script setup lang="ts">
import { ElCard, ElButton, ElDivider } from 'element-plus'
import { dynamicInfoItems } from '../data'
import { Icon } from '@/components/Icon'
import headerImg from '@/assets/imgs/avatar.jpeg'
// const ListItem = List.Item;
// const ListItemMeta = List.Item.Meta;
</script>
