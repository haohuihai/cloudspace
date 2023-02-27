<template>
  <div id="gdMap" class="gd-map" ref="gdMapRef"></div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref, reactive } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { guangdong } from '../../data/guangdong.js'
const { echarts } = useECharts()

const gdMapRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(gdMapRef as Ref<HTMLDivElement>)

onMounted(() => {
  echarts.registerMap('GD', guangdong)
  setOptions({
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c}件'
    },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['Max', 'Min'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      },
      textStyle: {
        color: '#fff'
      }
    },

    series: [
      {
        name: '香港18区人口密度',
        type: 'map',
        map: 'GD',
        zoom: 1.3,
        data: [
          { name: '韶关市', value: 20057 },
          { name: '梅州市', value: 15477 },
          { name: '清远市', value: 31686 },
          { name: '珠海市', value: 6992 },
          { name: '汕头市', value: 44045 },
          { name: '佛山市', value: 40689 },
          { name: '湛江市', value: 37659 },
          { name: '茂名市', value: 45180 },
          { name: '肇庆市', value: 55204 },
          { name: '梅州市', value: 21900 },
          { name: '汕尾市', value: 4918 },
          { name: '河源市', value: 5881 },
          { name: '阳江市', value: 4178 },
          { name: '东莞市', value: 2227 },
          { name: '江门市', value: 2180 },
          { name: '中山市', value: 9172 },
          { name: '揭阳市', value: 3368 },
          { name: '潮州市', value: 3368 },
          { name: '云浮市', value: 806 },
          { name: '广州市', value: 806 },
          { name: '深圳市', value: 806 },
          { name: '惠州市', value: 806 }
        ]
      }
    ]
  })
})
</script>
<style lang="less" scoped>
.gd-map {
  width: 100%;
  height: 90%;
}
</style>
