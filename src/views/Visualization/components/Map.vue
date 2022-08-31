<!-- 商家分布图表 -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref" id="map_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, onUnmounted, ref, computed } from 'vue'
import * as echarts from 'echarts'
import { getProvinceMapInfo } from '@/utils/map_utils'
import { getChinaMap, getProvince, getMapType } from '@/api/vision'
import { useVisionStore } from '@/stores/modules/vision'
type EChartsOption = echarts.EChartsOption
let chartInstance = reactive<any>(null)
let allData = reactive([])
let mapData = reactive({})
let useVision = useVisionStore()
let map_ref = ref(null)
let theme = computed(() => useVision.getVisionTheme)
onMounted(async () => {
  initChart()
  window.addEventListener('resize', screenAdapter)
  updateChart()
  screenAdapter()
})

onUnmounted(() => {
  window.removeEventListener('resize', screenAdapter)
  // this.$socket.unRegisterCallBack('mapData')
})

const initChart = async () => {
  chartInstance = echarts.init(map_ref.value, theme.value)
  let option: EChartsOption
  let data = await getChinaMap()
  echarts.registerMap('china', data)
  chartInstance.setOption({
    title: {
      text: '▎ 商家分布',
      left: 20,
      top: 20
    },
    geo: {
      map: 'china',
      roam: true,
      top: '20%',
      bottom: '5%',
      itemStyle: {
        areaColor: '#2E72BF',
        borderColor: '#333'
      }
    },
    legend: {
      left: '5%',
      bottom: '5%',
      orient: 'vertical'
    }
  })

  chartInstance.on('click', async (arg) => {
    const provinceInfo = getProvinceMapInfo(arg.name)
    if (!mapData[provinceInfo.key]) {
      const ret = await getProvince({ key: provinceInfo.path })
      mapData[provinceInfo.key] = ret
      echarts.registerMap(provinceInfo.key, ret)
    }
    const changeOption = {
      geo: {
        map: provinceInfo.key
      }
    }
    chartInstance.setOption(changeOption)
  })
}
//     getData (ret) {
//       // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
//       // const { data: ret } = await this.$http.get('map')
//       this.allData = ret
//       console.log(this.allData)
//       this.updateChart()
//     },
const updateChart = async () => {
  allData = await getMapType()
  allData = JSON.parse(allData)
  const legendArr = allData.map((item) => {
    return item.name
  })
  const seriesArr = allData.map((item) => {
    // return的这个对象就代表的是一个类别下的所有散点数据
    // 如果想在地图中显示散点的数据, 我们需要给散点的图表增加一个配置, coordinateSystem:geo
    return {
      type: 'effectScatter',
      rippleEffect: {
        scale: 5,
        brushType: 'stroke'
      },
      name: item.name,
      data: item.children,
      coordinateSystem: 'geo'
    }
  })
  const dataOption = {
    legend: {
      data: legendArr
    },
    series: seriesArr
  }
  chartInstance.setOption(dataOption)
}
const screenAdapter = () => {
  const titleFontSize = (map_ref.value.offsetWidth / 100) * 3.6
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    legend: {
      itemWidth: titleFontSize / 2,
      itemHeight: titleFontSize / 2,
      itemGap: titleFontSize / 2,
      textStyle: {
        fontSize: titleFontSize / 2
      }
    }
  }
  chartInstance.setOption(adapterOption)
  chartInstance.resize()
}
// 回到中国地图
const revertMap = () => {
  const revertOption = {
    geo: {
      map: 'china'
    }
  }
  chartInstance.setOption(revertOption)
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
