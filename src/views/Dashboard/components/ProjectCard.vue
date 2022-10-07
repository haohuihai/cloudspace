<template>
  <ElRow justify="space-between">
    <ElCol :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
      <ElCard shadow="never" :body-style="{ padding: '0', border: 'none'}">
        <template #header>
          <div class="flex justify-between">
            <span>项目</span>
            <ElLink type="primary" :underline="false">更多</ElLink>
          </div>
        </template>
        <ElSkeleton :loading="false" animated>
          <ElRow>
            <ElCol
              v-for="(item, index) in items"
              :key="`card-${index}`"
              :xl="8"
              :lg="8"
              :md="12"
              :sm="24"
              :xs="24"
            >
              <ElCard shadow="hover">
                <div class="flex items-center">
                  <Icon :icon="item.icon" :size="25" class="mr-10px" />
                  <span class="text-16px">{{ item.title }}</span>
                </div>
                <div class="mt-15px text-14px text-gray-400"> {{ item.desc }}</div>
                <div class="mt-20px text-12px text-gray-400 flex justify-between">
                  <span>{{ item.group }}</span>
                  <span>{{ item.date }}</span>
                </div>
              </ElCard>
            </ElCol>
          </ElRow>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElSkeleton, ElRow, ElCol, ElLink } from 'element-plus'
import { groupItems } from '../data'
import { useDesign } from '@/hooks/web/useDesign'
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('woekplace')
export default defineComponent({
  components: { ElCard, ElLink, ElRow, ElCol, ElSkeleton },
  setup() {
    return { items: groupItems }
  }
})
</script>

<style></style>
