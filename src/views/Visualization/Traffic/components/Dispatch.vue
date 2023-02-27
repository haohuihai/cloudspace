<template>
  <div id="pie" ref="dispatchRef"></div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, reactive } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'

const dispatchRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(dispatchRef as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'left',
      orient: 'vertical',
      itemGap: 5,
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '入库量',
        type: 'pie',
        radius: [0, '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 1048, name: '天猫' },
          { value: 735, name: '京东' },
          { value: 580, name: '拼多多' },
          { value: 484, name: '淘宝' },
          { value: 300, name: '抖音' }
        ]
      }
    ]
  })
})
</script>
