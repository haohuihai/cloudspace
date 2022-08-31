<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ '▎ ' + showTitle }}</span>
      <span class="iconfont title-icon" :style="comStyle" @click="showChoice = !showChoice"
        >&#xe6eb;</span
      >
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref" id="trend_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { watch, defineExpose, ref, computed, getCurrentInstance, onUnmounted, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { getTrendData } from '@/api/vision'
import { getThemeValue } from '@/utils/theme_utils'
import { useVisionStore } from '@/stores/modules/vision'
import '@/utils/theme'
let useVision = useVisionStore()
let allData = reactive<any>({})
let chartInstane = reactive(null)
let selectTypes = ref([
  {
    key: '',
    text: ''
  }
])
let showChoice = ref(false)
let showTitle = ref('')
let choiceType = ref('map')
let titleFontSize = ref(0)

const trend_ref = ref(null)

let theme = computed(() => useVision.getVisionTheme)
onMounted(() => {
  initChart()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})
onUnmounted(() => {
  window.removeEventListener('resize', screenAdapter)
})
const initChart = () => {
  chartInstane = echarts.init(trend_ref.value, theme.value)

  const initOption = {
    grid: {
      show: false,
      left: '3%',
      top: '35%',
      right: '4%',
      bottom: '1%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 20,
      top: '15%',
      icon: 'circle'
    },
    series: [
      {
        smooth: true
      }
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value'
    }
  }
  chartInstane.setOption(initOption)
}
const getData = async () => {
  let res = await getTrendData()
  allData = JSON.parse(res)
  updateChart()
}

const updateChart = () => {
  // 半透明的颜色值
  const colorArr1 = [
    'rgba(11, 168, 44, 0.5)',
    'rgba(44, 110, 255, 0.5)',
    'rgba(22, 242, 217, 0.5)',
    'rgba(254, 33, 30, 0.5)',
    'rgba(250, 105, 0, 0.5)'
  ]
  // 全透明的颜色值
  const colorArr2 = [
    'rgba(11, 168, 44, 0)',
    'rgba(44, 110, 255, 0)',
    'rgba(22, 242, 217, 0)',
    'rgba(254, 33, 30, 0)',
    'rgba(250, 105, 0, 0)'
  ]
  // 处理数据
  // 类目轴的数据
  const timeArr = allData.common.month
  // y轴的数据 series下的数据
  const valueArr = allData[choiceType.value].data
  const seriesArr = valueArr.map((item, index) => {
    return {
      name: item.name,
      type: 'line',
      data: item.data,
      stack: choiceType.value,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr1[index]
          }, // %0的颜色值
          {
            offset: 1,
            color: colorArr2[index]
          } // 100%的颜色值
        ])
      }
    }
  })
  // 图例的数据
  const legendArr = valueArr.map((item) => {
    return item.name
  })
  const dataOption = {
    xAxis: {
      data: timeArr
    },
    legend: {
      data: legendArr
    },
    series: seriesArr
  }
  chartInstane.setOption(dataOption)
  showTitle.value = allData[choiceType.value].title
  console.log('showTitle', showTitle.value)

  selectTypes.value = allData.type.filter((item) => {
    return item.key !== choiceType.value
  })
}
const screenAdapter = () => {
  console.log(1111111);
  
  titleFontSize.value = (trend_ref.value.offsetWidth / 100) * 3.6

  const adapterOption = {
    legend: {
      itemWidth: titleFontSize.value,
      itemHeight: titleFontSize.value,
      itemGap: titleFontSize.value,
      textStyle: {
        fontSize: titleFontSize.value / 2
      }
    }
  }
  chartInstane.setOption(adapterOption)
  chartInstane.resize()
}
const handleSelect = (currentType) => {
  choiceType.value = currentType
  updateChart()
  showChoice.value = false
}

let marginStyle = computed(() => {
  return {
    marginLeft: titleFontSize.value + 'px'
  }
})

let comStyle = computed(() => {
  return {
    fontSize: titleFontSize.value + 'px',
    color: getThemeValue(theme.value).titleColor
  }
})
watch(
  () => useVision.getVisionTheme,
  () => {
    chartInstane.dispose() // 销毁当前的图表
    initChart() // 重新以最新的主题名称初始化图表对象
    screenAdapter() // 完成屏幕的适配
    updateChart() // 更新图表的展示
  }
)
defineExpose({
  screenAdapter
})
</script>

<style lang="less" scoped>
@import '@/styles/vision.less';
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  font-weight: 600;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-con {
    background-color: #222733;
  }
}
</style>
