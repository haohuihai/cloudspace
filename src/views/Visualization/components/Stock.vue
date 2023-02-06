<!-- 库存销量分析 -->
<template>
  <div class='com-container'>
    <div class='com-chart' ref='stock_ref'></div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onUnmounted, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { getStockData } from '@/api/vision'
import { getThemeValue } from '@/utils/theme_utils'
import { useVisionStore } from '@/stores/modules/vision'
let useVision =  useVisionStore()
let chartInstance = reactive<any>(null)
let allData = reactive([])
let currentIndex = ref(0) // 当前显示的数据
let timerId = null // 定时器的标识

let stock_ref = ref(null)
// created () {
//     // 在组件创建完成之后 进行回调函数的注册
//     this.$socket.registerCallBack('stockData', this.getData)
// }
onMounted (() => {
    initChart()
    getData()
  //   $socket.send({
  //   action: 'getData',
  //   socketType: 'stockData',
  //   chartName: 'stock',
  //   value: ''
  // })
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})
onUnmounted (() => {
  window.removeEventListener('resize', screenAdapter)
  clearInterval(timerId)
  // this.$socket.unRegisterCallBack('stockData')
})
const initChart = () => {
  chartInstance = echarts.init(stock_ref.value, useVision.getVisionTheme)
  const initOption = {
    title: {
      text: '▎库存和销量分析',
      left: 20,
      top: 20
    }
  }
  chartInstance.setOption(initOption)
  chartInstance.on('mouseover', () => {
    clearInterval(timerId)
  })
  chartInstance.on('mouseout', () => {
    startInterval()
  })
}
const getData = async () => {
  // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
  let data = await getStockData()
  allData = JSON.parse(data)
  updateChart()
  startInterval()
}
const updateChart = () => {
  const centerArr = [
    ['18%', '40%'],
    ['50%', '40%'],
    ['82%', '40%'],
    ['34%', '75%'],
    ['66%', '75%']
  ]
  const colorArr = [
    ['#4FF778', '#0BA82C'],
    ['#E5DD45', '#E8B11C'],
    ['#E8821C', '#E55445'],
    ['#5052EE', '#AB6EE5'],
    ['#23E5E5', '#2E72BF']
  ]
  // 处理图表需要的数据
  const start = currentIndex.value * 5
  const end = (currentIndex.value + 1) * 5
  const showData = allData.slice(start, end)
  const seriesArr = showData.map((item, index) => {
    return {
      type: 'pie',
      center: centerArr[index],
      hoverAnimation: false, // 关闭鼠标移入到饼图时的动画效果
      labelLine: {
        show: false // 隐藏指示线
      },
      label: {
        position: 'center',
        color: colorArr[index][0]
      },
      data: [
        {
          name: item.name + '\n\n' + item.sales,
          value: item.sales,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: colorArr[index][0]
              },
              {
                offset: 1,
                color: colorArr[index][1]
              }
            ])
          }
        },
        {
          value: item.stock,
          itemStyle: {
            color: '#333843'
          }
        }
      ]
    }
  })
  const dataOption = {
    series: seriesArr
  }
  chartInstance.setOption(dataOption)
}
const screenAdapter = () => {
  const titleFontSize = stock_ref.value.offsetWidth / 100 * 3.6
  const innerRadius = titleFontSize * 2.8
  const outterRadius = innerRadius * 1.125
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    series: [
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2
        }
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2
        }
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2
        }
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2
        }
      },
      {
        type: 'pie',
        radius: [outterRadius, innerRadius],
        label: {
          fontSize: titleFontSize / 2
        }
      }
    ]
  }
  chartInstance.setOption(adapterOption)
  chartInstance.resize()
}
const  startInterval = () => {
  if (timerId) {
    clearInterval(timerId)
  }
  timerId = setInterval(() => {

  currentIndex.value++
    if (currentIndex.value > 1) {
      currentIndex.value = 0
    }
    updateChart() // 在更改完currentIndex之后 , 需要更新界面
  }, 5000)
}

watch(() => useVision.getVisionTheme,
  () => {
    chartInstance.dispose() // 销毁当前的图表
    initChart() // 重新以最新的主题名称初始化图表对象
    screenAdapter() // 完成屏幕的适配
    updateChart() // 更新图表的展示
  })
</script>

<style lang="less" scoped>
@import '@/styles/vision.less';
</style>
