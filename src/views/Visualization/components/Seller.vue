<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref" id="seller_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('seller_ref')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption

  const data: number[] = []
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200))
  }

  option = {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000)
      } else {
        data[i] += Math.round(Math.random() * 200)
      }
    }
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          type: 'bar',
          data
        }
      ]
    })
  }

  setTimeout(function () {
    run()
  }, 0)
  setInterval(function () {
    run()
  }, 3000)

  option && myChart.setOption(option)
})
</script>

<style lang="less" scoped></style>
