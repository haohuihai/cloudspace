<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <ElTabs v-model="activeKey" class="demo-tabs">
          <ElTabPane label="流量趋势" name="tab1"><VisitAnalysis /></ElTabPane>
          <ElTabPane label="访问量" name="tab2"><VisitAnalysisBar /></ElTabPane>
        </ElTabs>
      </div>
    </template>
  </ElCard>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElCard, ElTabs, ElTabPane } from 'element-plus'
import VisitAnalysis from './VisitAnalysis.vue'
import VisitAnalysisBar from './VisitAnalysisBar.vue'

const activeKey = ref('tab1')
</script>
