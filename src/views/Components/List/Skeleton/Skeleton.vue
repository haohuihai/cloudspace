<template>
  <ElCard>
    <ElSkeleton :loading="loading" style="width: 240px">
      <template #template>
        <ElSkeletonItem variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <ElSkeletonItem variant="p" style="width: 50%" />
          <div style="display: flex; align-items: center; justify-items: space-between">
            <ElSkeletonItem variant="text" style="margin-right: 16px" />
            <ElSkeletonItem variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
    </ElSkeleton>
  </ElCard>

<!-- 拖拽 -->
  <ElCard>
       <div>
        <draggable
            v-model="cars"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
          >
        <template #item="{ element }">
          <div>{{ element }}</div>
        </template>
      </draggable>
    </div>
  </ElCard>
</template>

<script lang="ts" setup>
  import { ElSkeleton, ElSkeletonItem } from 'element-plus';
  import { ref } from 'vue';
  import draggable from "vuedraggable";

    const drag = ref(false);

    const cars = ref(["Mercedes", "Toyota", "Honda", "Dodge"]);
      let loading = ref(true);
      setTimeout(() => {
        loading.value = false;
      }, 4000);
</script>
