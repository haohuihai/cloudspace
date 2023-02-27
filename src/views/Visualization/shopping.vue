<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="" />
      </div>
      <span class="logo">
        <img :src="logoSrc" alt="" />
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" />
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('trend')"
              :class="[
                'iconfont',
                fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt'
              ]"
            ></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('seller')"
              :class="[
                'iconfont',
                fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt'
              ]"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('map')"
              :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"
            ></span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('rank')"
              :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('hot')"
              :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"
            ></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock_ref" />
          <div class="resize">
            <!-- icon-compress-alt -->
            <span
              @click="changeSize('stock')"
              :class="[
                'iconfont',
                fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt'
              ]"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, nextTick, onUnmounted, ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import Hot from './components/Hot.vue'
import Map from './components/Map.vue'
import Rank from './components/Rank.vue'
import Seller from './components/Seller.vue'
import Stock from './components/Stock.vue'
import Trend from './components/Trend.vue'
// import { mapState } from 'vuex'
import { useVisionStore } from '@/stores/modules/vision'
import { getThemeValue } from '@/utils/theme_utils'

import logoImgDark from '@/assets/imgs/logo.png'
import logoImgLight from '@/assets/imgs/logo.png'

import headerBorderDark from '@/assets/imgs/header_border_dark.png'
import headerBorderLight from '@/assets/imgs/header_border_light.png'

import qiehuanDark from '@/assets/imgs/qiehuan_dark.png'
import qiehuanLight from '@/assets/imgs/qiehuan_light.png'

const visionStore = useVisionStore()

const { proxy }: any = getCurrentInstance()
const trend_ref = ref(null) // 实例化
const seller_ref = ref(null) // 实例化
const map_ref = ref(null) // 实例化
const rank_ref = ref(null) // 实例化
const hot_ref = ref(null) // 实例化
const stock_ref = ref(null) // 实例化

interface FullScreenTypes {
  trend: Boolean
  seller: Boolean
  map: Boolean
  rank: Boolean
  hot: Boolean
  stock: Boolean
}
let fullScreenStatus = reactive<FullScreenTypes>({
  trend: false,
  seller: false,
  map: false,
  rank: false,
  hot: false,
  stock: false
})
let theme = computed(() => visionStore.getVisionTheme)
// 注册接收到数据的回调函数
// proxy.$socket.registerCallBack('fullScreen', recvData)
// proxy.$socket.registerCallBack('themeChange', recvThemeChange)
onUnmounted(() => {
  // proxy.$socket.unRegisterCallBack('fullScreen')
  // proxy.$socket.unRegisterCallBack('themeChange')
})
onMounted(() => {
  echarts.registerTheme('chalk', {
    color: [
      '#0ba82c',
      '#2c6eff',
      '#16f2d9',
      '#fe211e',
      '#fa6900',
      '#eedd78',
      '#73a373',
      '#73b9bc',
      '#7289ab',
      '#91ca8c',
      '#f49f42'
    ],
    backgroundColor: '#222733',
    textStyle: {},
    title: {
      textStyle: {
        color: '#ffffff'
      },
      subtextStyle: {
        color: '#dddddd'
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: '4'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '0',
      symbol: 'circle',
      smooth: true
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: '4'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '0',
      symbol: 'circle',
      smooth: true
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        },
        emphasis: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#fc97af',
          color0: 'transparent',
          borderColor: '#fc97af',
          borderColor0: '#87f7cf',
          borderWidth: '2'
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      lineStyle: {
        normal: {
          width: '1',
          color: '#ffffff'
        }
      },
      symbolSize: '0',
      symbol: 'circle',
      smooth: true,
      color: [
        '#759aa0',
        '#dd6b66',
        '#e69d87',
        '#8dc1a9',
        '#ea7e53',
        '#eedd78',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ],
      label: {
        normal: {
          textStyle: {
            color: '#293441'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: '#f3f3f3',
          borderColor: '#999999',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,178,72,1)',
          borderColor: '#eb8146',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#893448'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(137,52,72)'
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: '#f3f3f3',
          borderColor: '#999999',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,178,72,1)',
          borderColor: '#eb8146',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#893448'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(137,52,72)'
          }
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#e6e6e6']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#e6e6e6']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#e6e6e6']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#e6e6e6']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#999999'
        },
        emphasis: {
          borderColor: '#666666'
        }
      }
    },
    legend: {
      textStyle: {
        color: '#999999'
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#cccccc',
          width: 1
        },
        crossStyle: {
          color: '#cccccc',
          width: 1
        }
      }
    },
    timeline: {
      lineStyle: {
        color: '#87f7cf',
        width: 1
      },
      itemStyle: {
        normal: {
          color: '#87f7cf',
          borderWidth: 1
        },
        emphasis: {
          color: '#f7f494'
        }
      },
      controlStyle: {
        normal: {
          color: '#87f7cf',
          borderColor: '#87f7cf',
          borderWidth: 0.5
        },
        emphasis: {
          color: '#87f7cf',
          borderColor: '#87f7cf',
          borderWidth: 0.5
        }
      },
      checkpointStyle: {
        color: '#fc97af',
        borderColor: 'rgba(252,151,175,0.3)'
      },
      label: {
        normal: {
          textStyle: {
            color: '#87f7cf'
          }
        },
        emphasis: {
          textStyle: {
            color: '#87f7cf'
          }
        }
      }
    },
    visualMap: {
      color: ['#fc97af', '#87f7cf']
    },
    dataZoom: {
      backgroundColor: 'rgba(255,255,255,0)',
      dataBackgroundColor: 'rgba(114,204,255,1)',
      fillerColor: 'rgba(114,204,255,0.2)',
      handleColor: '#72ccff',
      handleSize: '100%',
      textStyle: {
        color: '#333333'
      }
    },
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: '#293441'
          }
        },
        emphasis: {
          textStyle: {
            color: '#293441'
          }
        }
      }
    }
  })
  echarts.registerTheme('vintage', {
    color: [
      '#0ba82c',
      '#2c6eff',
      '#16f2d9',
      '#fe211e',
      '#fa6900',
      '#eedd78',
      '#73a373',
      '#73b9bc',
      '#7289ab',
      '#91ca8c',
      '#f49f42'
    ],
    backgroundColor: '#ffffff',
    textStyle: {},
    title: {
      textStyle: {
        color: '#333333'
      },
      subtextStyle: {
        color: '#aaa'
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: '4'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '0',
      symbol: 'circle',
      smooth: true
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: 1
        }
      },
      lineStyle: {
        normal: {
          width: 2
        }
      },
      symbolSize: 4,
      symbol: 'emptyCircle',
      smooth: false
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        },
        emphasis: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#c23531',
          color0: '#314656',
          borderColor: '#c23531',
          borderColor0: '#314656',
          borderWidth: 1
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      lineStyle: {
        normal: {
          width: 1,
          color: '#aaa'
        }
      },
      symbolSize: 4,
      symbol: 'emptyCircle',
      smooth: false,
      color: [
        '#d87c7c',
        '#919e8b',
        '#d7ab82',
        '#6e7074',
        '#61a0a8',
        '#efa18d',
        '#787464',
        '#cc7e63',
        '#724e58',
        '#4b565b'
      ],
      label: {
        normal: {
          textStyle: {
            color: '#eee'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: '#eeeeee',
          borderColor: '#444444',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444444',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#000000'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(100,0,0)'
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: '#eeeeee',
          borderColor: '#444444',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444444',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#000000'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(100,0,0)'
          }
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#ccc']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#e6e6e6']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#ccc']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#ccc']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#999999'
        },
        emphasis: {
          borderColor: '#666666'
        }
      }
    },
    legend: {
      textStyle: {
        color: '#333333'
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#cccccc',
          width: 1
        },
        crossStyle: {
          color: '#cccccc',
          width: 1
        }
      }
    },
    timeline: {
      lineStyle: {
        color: '#293c55',
        width: 1
      },
      itemStyle: {
        normal: {
          color: '#293c55',
          borderWidth: 1
        },
        emphasis: {
          color: '#a9334c'
        }
      },
      controlStyle: {
        normal: {
          color: '#293c55',
          borderColor: '#293c55',
          borderWidth: 0.5
        },
        emphasis: {
          color: '#293c55',
          borderColor: '#293c55',
          borderWidth: 0.5
        }
      },
      checkpointStyle: {
        color: '#e43c59',
        borderColor: 'rgba(194,53,49,0.5)'
      },
      label: {
        normal: {
          textStyle: {
            color: '#293c55'
          }
        },
        emphasis: {
          textStyle: {
            color: '#293c55'
          }
        }
      }
    },
    visualMap: {
      color: ['#bf444c', '#d88273', '#f6efa6']
    },
    dataZoom: {
      backgroundColor: 'rgba(47,69,84,0)',
      dataBackgroundColor: 'rgba(47,69,84,0.3)',
      fillerColor: 'rgba(167,183,204,0.4)',
      handleColor: '#a7b7cc',
      handleSize: '100%',
      textStyle: {
        color: '#333333'
      }
    },
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: '#eee'
          }
        },
        emphasis: {
          textStyle: {
            color: '#eee'
          }
        }
      }
    }
  })
})
const changeSize = (chartName) => {
  // 1.改变fullScreenStatus的数据
  fullScreenStatus[chartName] = !fullScreenStatus[chartName]
  // 2.需要调用每一个图表组件的screenAdapter的方法
  // this.$refs[chartName].screenAdapter()
  // this.$nextTick(() => {
  //   this.$refs[chartName].screenAdapter()
  // })
  // 将数据发送给服务端
  const targetValue = fullScreenStatus[chartName]
  // proxy.$socket.send({
  //   action: 'fullScreen',
  //   socketType: 'fullScreen',
  //   chartName: chartName,
  //   value: targetValue
  // })
  recvData({ chartName: chartName, value: targetValue })
}
// 接收到全屏数据之后的处理
const recvData = (data) => {
  // 取出是哪一个图表需要进行切换
  const chartName = data.chartName
  let chartNameRef = data.chartName + '_ref'
  console.log('chartName', chartName)
  // 取出, 切换成什么状态
  const targetValue = data.value
  fullScreenStatus[chartName] = targetValue
  nextTick(() => {
    switch (chartName) {
      case 'trend':
        trend_ref.value.screenAdapter()
        break
      case 'seller':
        seller_ref.value.screenAdapter()
        break
      case 'map':
        map_ref.value.screenAdapter()
        break
      case 'rank':
        rank_ref.value.screenAdapter()
        break
      case 'hot':
        hot_ref.value.screenAdapter()
        break
        break
      case 'stock':
        stock_ref.value.screenAdapter()
        break
      default:
        break
    }
  })
}
const handleChangeTheme = () => {
  // 修改VueX中数据

  // this.$store.commit('changeTheme')
  // proxy.$socket.send({
  //   action: 'themeChange',
  //   socketType: 'themeChange',
  //   chartName: '',
  //   value: ''
  // })
  if (theme.value === 'chalk') {
    theme.value === 'vintage'
  }
  visionStore.setVisionTheme(theme)
}
const recvThemeChange = () => {
  if (theme.value === 'chalk') {
    theme.value === 'vintage'
  }
  visionStore.setVisionTheme(theme.value)
}
const logoSrc = computed(() => {
  if (theme.value === 'chalk') {
    return logoImgDark
  }
  return logoImgLight
})

const headerSrc = computed(() => {
  if (theme.value === 'chalk') {
    return headerBorderDark
  }
  return headerBorderLight
})

const themeSrc = computed(() => {
  if (theme.value === 'chalk') {
    return qiehuanDark
  }
  return qiehuanLight
})

const containerStyle = computed(() => {
  return {
    backgroundColor: getThemeValue(theme.value).backgroundColor,
    color: getThemeValue(theme.value).titleColor
  }
})
</script>
<style lang="less">
// 全屏样式的定义
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;

  > div {
    img {
      width: 100%;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }

  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }

  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }

  .datetime {
    font-size: 15px;
    margin-left: 10px;
    color: #fff;
  }

  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);

    img {
      height: 45px;
      width: 45px;
    }
  }
}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;

  .screen-left {
    height: 100%;
    width: 27.6%;

    #left-top {
      height: 53%;
      position: relative;
    }

    #left-bottom {
      height: 36%;
      margin-top: 25px;
      position: relative;
    }
  }

  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;

    #middle-top {
      width: 100%;
      height: 53%;
      position: relative;
    }

    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 36%;
      position: relative;
    }
  }

  .screen-right {
    height: 100%;
    width: 27.6%;

    #right-top {
      height: 53%;
      position: relative;
    }

    #right-bottom {
      height: 36%;
      margin-top: 25px;
      position: relative;
    }
  }
}

.resize {
  position: absolute;
  right: 40px;
  top: 10px;
  color: #74728b;
  cursor: pointer;
  &:hover {
    color: blue;
  }
}
canvas {
  border-radius: 10px;
}
</style>
