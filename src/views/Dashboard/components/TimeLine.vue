<template>
  <ElCard :body-style="{ maxHeight: '300px', overflow: 'overlay' }">
    <template #header>访问时间</template>
    <ElSkeleton :loading="loading">
      <ElTimeline>
        <ElTimelineItem
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
        >
          <span v-html="activity.content"></span>
        </ElTimelineItem>
      </ElTimeline>
    </ElSkeleton>
  </ElCard>
</template>
<script lang="ts" setup>
import { CountTo } from '/@/components/CountTo/index'
import { Icon } from '/@/components/Icon'
import { ElTimeline, ElTimelineItem, ElCard } from 'element-plus'

import { activities } from '../data'

defineProps({
  loading: {
    type: Boolean
  }
})
</script>
