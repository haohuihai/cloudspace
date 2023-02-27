<template>
  <div id="chart3" style="width: 100%; height: 100%" ref="dispatchBarRef"></div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, reactive } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'

const dispatchBarRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(dispatchBarRef as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        nameTextStyle: {
          color: '#fff'
        },
        type: 'category',
        data: ['入库', '在库', '出库', '丢失', '撤销']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '天猫',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: '京东',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90]
      },
      {
        name: '拼多多',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: '淘宝',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: '抖音',
        type: 'bar',
        data: [862, 1018, 964, 1026, 979],
        emphasis: {
          focus: 'series'
        },
        markLine: {
          lineStyle: {
            type: 'dashed'
          },
          data: [[{ type: 'min' }, { type: 'max' }]]
        }
      }
    ]
  })
})
</script>
