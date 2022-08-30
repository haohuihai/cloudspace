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
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue'
import { getHotData } from '@/api/vision'
import { getThemeValue } from '@/utils/theme_utils'
import { useVisionStore } from '@/stores/modules/vision'
let useVision =  useVisionStore()
type EChartsOption = echarts.EChartsOption
let chartInstance = reactive<any>(null)
let currentIndex = ref(0)
let titleFontSize = ref(0)
let allData = reactive([])
onMounted(() => {
  // this.$socket.registerCallBack('hotData', this.getData)
  initChart()
  getData()
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
})
const getData = async () => {
  let data = await getHotData()
  allData = JSON.parse(data)
  updateChart()
}
const updateChart = () => {
  const legendData = allData[currentIndex.value].children.map(item => {
    return item.name
  })
  const seriesData = allData[currentIndex.value].children.map(item => {
    return {
      name: item.name,
      value: item.value,
      children: item.children // 新增加children的原因是为了在tooltip中的formatter的回调函数中,来拿到这个二级分类下的三级分类数据
    }
  })
  const dataOption = {
    legend: {
      data: legendData
    },
    series: [
      {
        data: seriesData
      }
    ]
  }
  chartInstance.setOption(dataOption)
}
const initChart = () => {
  var chartDom = document.getElementById('hot_ref')
  chartInstance = echarts.init(chartDom)

  let option: EChartsOption
  option = {
    title: {
      text: '▎ 热销商品的占比',
      left: 20,
      top: 20
    },
    legend: {
      top: '15%',
      icon: 'circle'
    },
    tooltip: {
      show: true,
      formatter: arg => {
        // console.log(arg)
        const thirdCategory = arg.data.children
        // 计算出所有三级分类的数值总和
        let total = 0
        thirdCategory.forEach(item => {
          total += item.value
        })
        let retStr = ''
        thirdCategory.forEach(item => {
          retStr += `
          ${item.name}:${parseInt(item.value / total * 100) + '%'}
          <br/>
          `
        })
        return retStr
      }
    },
    series: [
      {
        type: 'pie',
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          },
          labelLine: {
            show: false
          }
        }
      }
    ]
  }

  option && chartInstance.setOption(option)
}
const toLeft  = ()  =>{
  currentIndex.value--
  if (currentIndex.value < 0) {
    currentIndex.value = allData.length - 1
  }
  updateChart()
}
const toRight =  () => {
  currentIndex.value++
  if (currentIndex.value > allData.length - 1) {
    currentIndex.value = 0
  }
  updateChart()
}
let comStyle = computed(() => {
  return {
        fontSize: titleFontSize.value + 'px',
        color: getThemeValue(useVision.getVisionTheme).titleColor
      }
})

let catName = computed(() => {
  if (allData.length) {
    return ''
  } else {
    return allData[currentIndex.value].name
  }
})

watch(() => useVision.getVisionTheme,
  () => {
    chartInstance.dispose() // 销毁当前的图表
    initChart() // 重新以最新的主题名称初始化图表对象
    screenAdapter() // 完成屏幕的适配
    updateChart() // 更新图表的展示
})
const screenAdapter = () => {
  let chartDom = document.getElementById('hot_ref')

  titleFontSize.value = (chartDom.offsetWidth / 100) * 3.6
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
