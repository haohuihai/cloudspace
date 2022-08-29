
<!-- 热销商品图表 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref" id="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
    <span class="cat-name" :style="comStyle">{{ catName }}</span>
  </div>
</template>

<script setup lang="ts">

import * as echarts from 'echarts'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
type EChartsOption = echarts.EChartsOption
let chartInstance = ref(null);
let currentIndex = ref(0)
let titleFontSize = ref(0)
let allData = reactive([])
let myChart = reactive({})
onMounted(() => {
  // this.$socket.registerCallBack('hotData', this.getData)
  initChart()
    // $socket.send({
  //     action: 'getData',
  //     socketType: 'hotData',
  //     chartName: 'hot',
  //     value: ''
  //   })
  screenAdapter()
  document.addEventListener('resize', screenAdapter)

})

  onUnmounted(() => {
    document.removeEventListener('resize', screenAdapter)
    // this.$socket.unRegisterCallBack('hotData')
  });
const initChart = () => {
  var chartDom = document.getElementById('hot_ref');
  myChart = echarts.init(chartDom)

  let option: EChartsOption

  option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  option && myChart.setOption(option)
}
const screenAdapter = () => {
  let chartDom = document.getElementById('hot_ref');
  
  titleFontSize.value = chartDom.offsetWidth / 100 * 3.6
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize.value
      }
    },
    legend: {
      itemWidth: titleFontSize.value,
      itemHeight: titleFontSize.value,
      itemGap: titleFontSize.value / 2,
      textStyle: {
        fontSize: titleFontSize.value / 2
      }
    },
    series: [
      {
        radius: titleFontSize.value * 4.5,
        center: ['50%', '60%']
      }
    ]
  }
  chartInstance.setOption(adapterOption)
  chartInstance.resize()
}
</script>

<style lang="less" scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}

.arr-right {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
}

.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
