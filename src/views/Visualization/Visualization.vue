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
          <Trend ref="trend"></Trend>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('trend')" :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('seller')"  :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('map')"  :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('rank')"  :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon-compress-alt -->
            <span @click="changeSize('hot')"  :class="['iconfont', fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, onUnmounted, ref, computed } from 'vue'
import Hot from './components/Hot.vue'
import Map from './components/Map.vue'
import Rank from './components/Rank.vue'
import Seller from './components/Seller.vue'
// import Stock from './components/Stock.vue'
import Trend from './components/Trend.vue'
// import { mapState } from 'vuex'
import { useVisionStore } from '@/stores/modules/vision'
import { getThemeValue } from '@/utils/theme_utils'

import logoImgDark from '@/assets/imgs/logo_dark.png'
import logoImgLight from '@/assets/imgs/logo_light2.png'

import headerBorderDark from '@/assets/imgs/header_border_dark.png'
import headerBorderLight from '@/assets/imgs/header_border_light.png'

import qiehuanDark from '@/assets/imgs/qiehuan_dark.png'
import qiehuanLight from '@/assets/imgs/qiehuan_light.png'

const visionStore = useVisionStore()
const { proxy }: any = getCurrentInstance()

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
let theme = ref('chalk')
// 注册接收到数据的回调函数
// proxy.$socket.registerCallBack('fullScreen', recvData)
// proxy.$socket.registerCallBack('themeChange', recvThemeChange)
onUnmounted(() => {
  proxy.$socket.unRegisterCallBack('fullScreen')
  proxy.$socket.unRegisterCallBack('themeChange')
})
const changeSize = (chartName) => {
  // 1.改变fullScreenStatus的数据
  // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
  // 2.需要调用每一个图表组件的screenAdapter的方法
  // this.$refs[chartName].screenAdapter()
  // this.$nextTick(() => {
  //   this.$refs[chartName].screenAdapter()
  // })
  // 将数据发送给服务端
  const targetValue = fullScreenStatus[chartName]
  proxy.$socket.send({
    action: 'fullScreen',
    socketType: 'fullScreen',
    chartName: chartName,
    value: targetValue
  })
}
// 接收到全屏数据之后的处理
const recvData = (data) => {
  // 取出是哪一个图表需要进行切换
  const chartName = data.chartName
  // 取出, 切换成什么状态
  const targetValue = data.value
  fullScreenStatus[chartName] = targetValue
  // this.$nextTick(() => {
  //   this.$refs[chartName].screenAdapter()
  // })
}
const handleChangeTheme = () => {
  // 修改VueX中数据
  // this.$store.commit('changeTheme')
  proxy.$socket.send({
    action: 'themeChange',
    socketType: 'themeChange',
    chartName: '',
    value: ''
  })
}
const recvThemeChange = () => {
  visionStore.setVisionTheme('changeTheme')
}
const logoSrc = computed(() => {
  if (theme.value === 'chalk') {
    return logoImgDark
  }
  return logoImgLight
})
// const logoSrc = () => '@/static/img/' + getThemeValue(theme.value).logoSrc

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
  }

  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);

    img {
      height: 35px;
      width: 128px;
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
      height: 31%;
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
      height: 56%;
      position: relative;
    }

    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }

  .screen-right {
    height: 100%;
    width: 27.6%;

    #right-top {
      height: 46%;
      position: relative;
    }

    #right-bottom {
      height: 38%;
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
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.com-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

}

.com-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas {
  border-radius: 20px;
}

</style>
