<!-- 地区销售排行 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref" id="rank_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, reactive, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useVisionStore } from '@/stores/modules/vision'
import { getRankData } from '@/api/vision'
let useVision = useVisionStore()
let chartInstance = reactive<any>(null)
let allData = reactive([])
let startValue = ref(0) // 区域缩放的起点值
let endValue = ref(9) // 区域缩放的终点值
let timerId = null // 定时器的标识
let rank_ref = ref(null)

let theme = computed(() => useVision.getVisionTheme)
onMounted(() => {
  initChart()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})

onUnmounted(() => {
  window.removeEventListener('resize', screenAdapter)
  clearInterval(timerId)
})
const getData = async () => {
  let data = await getRankData()
  allData = JSON.parse(data)
  // 对allData里面的每一个元素进行排序, 从大到小进行
  allData.sort((a, b) => {
    return b.value - a.value
  })
  updateChart()
  startInterval()
}
const initChart = () => {
  chartInstance = echarts.init(rank_ref.value, theme.value)
  const initOption = {
    title: {
      text: '▎ 地区销售排行',
      left: 20,
      top: 20
    },
    grid: {
      show: false,
      top: '40%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar'
      }
    ]
  }
  chartInstance.setOption(initOption)
  chartInstance.on('mouseover', () => {
    clearInterval(timerId)
  })
  chartInstance.on('mouseout', () => {
    startInterval()
  })
}
const startInterval = () => {
  if (timerId) {
    clearInterval(timerId)
  }
  timerId = setInterval(() => {
    startValue.value++
    endValue.value++
    if (endValue.value > allData.length - 1) {
      startValue.value = 0
      endValue.value = 9
    }
    updateChart()
  }, 2000)
}
const updateChart = () => {
  const colorArr = [
    ['#0BA82C', '#4FF778'],
    ['#2E72BF', '#23E5E5'],
    ['#5052EE', '#AB6EE5']
  ]
  // 处理图表需要的数据
  // 所有省份所形成的数组
  const provinceArr = allData.map((item) => {
    return item.name
  })
  // 所有省份对应的销售金额
  const valueArr = allData.map((item) => {
    return item.value
  })
  const dataOption = {
    xAxis: {
      data: provinceArr
    },
    dataZoom: {
      show: false,
      startValue: startValue.value,
      endValue: endValue.value
    },
    series: [
      {
        data: valueArr,
        itemStyle: {
          color: (arg) => {
            let targetColorArr = null
            if (arg.value > 300) {
              targetColorArr = colorArr[0]
            } else if (arg.value > 200) {
              targetColorArr = colorArr[1]
            } else {
              targetColorArr = colorArr[2]
            }
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: targetColorArr[0]
              },
              {
                offset: 1,
                color: targetColorArr[1]
              }
            ])
          }
        }
      }
    ]
  }
  chartInstance.setOption(dataOption)
}
const screenAdapter = () => {
  const titleFontSize = (rank_ref.value.offsetWidth / 100) * 3.6
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
        }
      }
    ]
  }
  chartInstance.setOption(adapterOption)
  chartInstance.resize()
}

watch(
  () => useVision.getVisionTheme,
  () => {
    chartInstance.dispose() // 销毁当前的图表
    initChart() // 重新以最新的主题名称初始化图表对象
    screenAdapter() // 完成屏幕的适配
    updateChart() // 更新图表的展示
  }
)
</script>

<style lang="less" scoped>
@import '@/styles/vision.less';
</style>
