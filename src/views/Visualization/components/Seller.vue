<!-- 商家销量统计的横向柱状图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref" id="seller_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useVisionStore } from '@/stores/modules/vision'
let useVision =  useVisionStore()
let chartInstance = reactive(null)
let allData = reactive([]) // 服务器返回的数据
let currentPage = ref(1) // 当前显示的页数
let totalPage = ref(0) // 一共有多少页
let timerId =  null // 定时器的标识
onMounted(() => {
  
  initChart()
  getData()
})

onUnmounted(() => {
  clearInterval(timerId)
  window.removeEventListener('resize', screenAdapter)

})

const getData = () => {
  // const { data: ret } = await this.$http.get('seller')
  allData = ret
  // 对数据排序
  allData.sort((a, b) => {
    return a.value - b.value // 从小到大的排序
  })
  // 每5个元素显示一页
  totalPage.value = allData.length % 5 === 0 ? allData.length / 5 : allData.length / 5 + 1
  updateChart()
  // 启动定时器
  startInterval()
}
const initChart = () => {
  type EChartsOption = echarts.EChartsOption
  var chartDom = document.getElementById('seller_ref')!
  chartInstance = echarts.init(chartDom)
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
  const initOption = {
    title: {
      text: '▎商家销售统计',
      left: 20,
      top: 20
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true // 距离是包含坐标轴上的文字
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        z: 0,
        lineStyle: {
          color: '#2D3443'
        }
      }
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'white'
          }
        },
        itemStyle: {
          // 指明颜色渐变的方向
          // 指明不同百分比之下颜色的值
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            // 百分之0状态之下的颜色值
            {
              offset: 0,
              color: '#5052EE'
            },
            // 百分之100状态之下的颜色值
            {
              offset: 1,
              color: '#AB6EE5'
            }
          ])
        }
      }
    ]
  }
  chartInstance.setOption(initOption)
  // 对图表对象进行鼠标事件的监听
  chartInstance.on('mouseover', () => {
    clearInterval(timerId)
  })
  chartInstance.on('mouseout', () => {
    startInterval()
  })

}

const screenAdapter = () => {
  // console.log(this.$refs.seller_ref.offsetWidth)
  const titleFontSize = $refs.seller_ref.offsetWidth / 100 * 3.6
  // 和分辨率大小相关的配置项
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          width: titleFontSize
        }
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
        }
      }
    ]
  }
  chartInstance.setOption(adapterOption)
  // 手动的调用图表对象的resize 才能产生效果
  chartInstance.resize()
}
const startInterval = () => {
  if (timerId) {
    clearInterval(timerId)
  }
  timerId = setInterval(() => {
  currentPage.value++
  if (currentPage.value > totalPage.value) {
    currentPage.value = 1
  }
  updateChart()
}, 3000)
}
const updateChart = () => {
  const start = (currentPage.value - 1) * 5
  const end = currentPage.value * 5
  const showData = allData.slice(start, end)
  const sellerNames = showData.map((item) => {
    return item.name
  })
  const sellerValues = showData.map((item) => {
    return item.value
  })
  const dataOption = {
    yAxis: {
      data: sellerNames
    },
    series: [
      {
        data: sellerValues
      }
    ]
  }
  chartInstance.setOption(dataOption)
}
watch(() => useVision.getVisionTheme,
  () => {
    chartInstance.dispose() // 销毁当前的图表
    initChart() // 重新以最新的主题名称初始化图表对象
    screenAdapter() // 完成屏幕的适配
    updateChart() // 更新图表的展示
})
</script>

<style lang="less" scoped></style>
