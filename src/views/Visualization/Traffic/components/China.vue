<template>
  <div id="chart4" ref="chinaRef" style="width: 100%; height: 95%"></div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, reactive } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { china, geoCoordMap, chart4Data } from '../../data/china.js'
const { echarts } = useECharts()
const chinaRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chinaRef as Ref<HTMLDivElement>)
onMounted(() => {
  echarts.registerMap('china', china)
  let s_data = []
  let planePath = 'pin'
  s_data.push({
    type: 'lines',
    zlevel: 2,
    mapType: 'china',
    symbol: 'none',
    effect: {
      show: true,
      period: 1.5,
      trailLength: 0.1,
      //                color: '#ffeb40',
      color: '#2ef358',
      symbol: planePath,
      symbolSize: 6,
      trailLength: 0.5
    },
    lineStyle: {
      normal: {
        color: '#2ef358',
        width: 1,
        opacity: 0.4,
        curveness: 0.2
      }
    },
    data: formtGCData(geoCoordMap, chart4Data, '珠海', true)
  })

  function formtGCData(geoData, data, srcNam, dest) {
    var tGeoDt = []
    if (dest) {
      for (var i = 0, len = data.length; i < len; i++) {
        if (srcNam != data[i].name) {
          tGeoDt.push({
            coords: [geoData[srcNam], geoData[data[i].name]]
          })
        }
      }
    } else {
      for (var i = 0, len = data.length; i < len; i++) {
        if (srcNam != data[i].name) {
          tGeoDt.push({
            coords: [geoData[data[i].name], geoData[srcNam]]
          })
        }
      }
    }
    return tGeoDt
  }
  setOptions({
    tooltip: {
      trigger: 'item'
    },
    geo: {
      map: 'china',
      label: {
        show: true,
        position: 'insideLeft',
        color: 'white',
        fontSize: '10',
        emphasis: {
          show: true
        }
      },
      roam: true,
      silent: true,
      itemStyle: {
        normal: {
          areaColor: 'transparent',
          borderColor: '#0e94eb',
          shadowBlur: 10,
          shadowColor: '#0e94ea'
        }
      },
      left: 10,
      right: 10
    },
    series: s_data
  })
})
</script>
