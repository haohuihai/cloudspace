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
import { watch, ref, computed, getCurrentInstance, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { getTrendData } from '@/api/vision'
import { getThemeValue } from '@/utils/theme_utils'
import { useVisionStore } from '@/stores/modules/vision'
let useVision =  useVisionStore()
let allData = reactive<any>({})
let chartInstane = reactive(null)
let selectTypes = ref([{
  key: '',
  text: ''
}])
let showChoice = ref(false)
let showTitle = ref('')
let choiceType = ref('map')
let titleFontSize = ref(0)
onMounted(() => {
  initChart()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()

      // {
      //   name: '其他',
      //   type: 'line',
      //   stack: 'Total',
      //   smooth: true,
      //   lineStyle: {
      //     width: 0
      //   },
      //   showSymbol: false,
      //   label: {
      //     show: true,
      //     position: 'top'
      //   },
      //   areaStyle: {
      //     opacity: 0.8,
      //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //       {
      //         offset: 0,
      //         color: 'rgb(255, 191, 0)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgb(224, 62, 76)'
      //       }
      //     ])
      //   },
      //   emphasis: {
      //     focus: 'series'
      //   },
      //   data: [220, 302, 181, 234, 210, 290, 150]
      // }

  // option && myChart.setOption(option)
})
const initChart = () => {
  var chartDom = document.getElementById('trend_ref')
 chartInstane = echarts.init(chartDom, 'dark')
  const initOption = {
    grid: {
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
        smooth: true,
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
  const legendArr = valueArr.map(item => {
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
  showTitle.value =  allData[choiceType.value].title
  console.log('showTitle', showTitle.value);
  
  selectTypes.value = allData.type.filter(item => {
      return item.key !== choiceType
    })
}
const screenAdapter = () => {
  let chartDom = document.getElementById('trend_ref')
  titleFontSize.value = chartDom.offsetWidth / 100 * 3.6
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
        color: getThemeValue(useVision.getVisionTheme).titleColor
      }
})
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-con {
    background-color: #222733;
  }
}
</style>
