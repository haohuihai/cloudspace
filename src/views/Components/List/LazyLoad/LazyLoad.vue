<template>
  <ElCard class="cardBox">
    <div id="mui-player" class="abp" ref="muiPlayer" style="position: relative">
      <template slot="castScreen">
        <svg
          t="1573891279687"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3272"
          width="20"
          height="20"
        >
          <path
            d="M853.015273 814.545455h-161.419637a34.909091 34.909091 0 0 1 0-69.818182h161.419637A54.690909 54.690909 0 0 0 907.636364 690.106182V264.075636A54.690909 54.690909 0 0 0 853.015273 209.454545H170.961455A54.667636 54.667636 0 0 0 116.363636 264.075636v426.030546A54.667636 54.667636 0 0 0 170.961455 744.727273h141.358545a34.909091 34.909091 0 0 1 0 69.818182H170.961455A124.555636 124.555636 0 0 1 46.545455 690.106182V264.075636A124.555636 124.555636 0 0 1 170.961455 139.636364h682.053818A124.578909 124.578909 0 0 1 977.454545 264.075636v426.030546A124.578909 124.578909 0 0 1 853.015273 814.545455zM674.909091 907.636364H349.090909l162.909091-209.454546 162.909091 209.454546z"
            fill="#ffffff"
            p-id="3273"
          ></path>
        </svg>
      </template>
      <template slot="nextMedia">
        <svg
          t="1584686776454"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1682"
          width="22"
          height="22"
        >
          <path
            d="M783.14692466 563.21664097L240.85307534 879.55472126c-39.1656664 24.10194914-90.38230866-6.02548665-90.38230865-51.21664226v-632.676158c0-45.19115433 51.21664097-75.31859011 90.38230865-51.21664226l542.29384932 316.33808029c39.1656664 21.08920518 39.1656664 81.34407804 0 102.43328194z"
            p-id="1683"
            fill="#ffffff"
          ></path>
          <path
            d="M873.52923331 734.94302767c0 42.17841036-39.1656664 78.33133408-90.38230865 78.33133407s-90.38230866-36.15292371-90.38230735-78.33133407V289.05697233c0-42.17841036 39.1656664-78.33133408 90.38230735-78.33133407s90.38230866 36.15292371 90.38230865 78.33133407v445.88605534z"
            p-id="1684"
            fill="#ffffff"
          ></path>
        </svg>
      </template>
      <template slot="HD">
        <div
          style="
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 16px;
          "
        >
          <p onclick="on_hd(1)">蓝光1080P</p>
          <p onclick="on_hd(2)">超清</p>
          <p onclick="on_hd(3)">高清</p>
          <p onclick="on_hd(4)">标清</p>
        </div>
      </template>
      <div
        id="comment-stage"
        class="container"
        style="z-index: 1 !important; height: 325px; width: 100%"
      ></div>
    </div>
  </ElCard>
</template>
<script  lang="ts" setup>
interface window {
  CommentManager?: null
}
import { onMounted, ref } from 'vue'
import 'mui-player/dist/mui-player.min.css'
// 引入弹幕功能
import './CommentCoreLibrary.min.css'
import MuiPlayerDesktopPlugin from 'mui-player-desktop-plugin'
import MuiPlayer from 'mui-player'
import { ElCard } from 'element-plus'
import { log } from 'console'

let playTime = ref(0)
let disableTime = ref(false)
onMounted(() => {
  var mp = new MuiPlayer({
    container: '#mui-player',
    title: '风景视频',
    src: '/media.mp4',
    volume: 1,
    dragSpotShape: 'square',
    height: '300px',
    objectFit: 'contain',
    subtitle: {
      tracks: [
        {
          kind: 'subtitles',
          src: '/video.vtt',
          label: '英语',
          srclang: 'en',
          default: true
        }
      ]
    },
    themeColor: '#55c612',
    custom: {
      headControls: [
        {
          slot: 'castScreen', // 对应定义的 slot 值
          click: function (e) {
            // 按钮点击事件回调
            console.log('cast screen button click...')
          },
          style: {} // 自定义添加控件样式
        }
      ],
      footerControls: [
        {
          slot: 'nextMedia', // 对应定义的 slot 值
          position: 'left', // 显示的位置，可选 left、right
          tooltip: '下一集', // 鼠标悬浮在控件上显示的文字提示
          oftenShow: false, // 是否常显示。默认为false，在 mobile 环境下竖屏状态下隐藏，pc环境判下视频容器小于500px时隐藏
          click: function (e) {
            // 按钮点击事件回调
            console.log('next media button click...')
          },
          style: {} // 自定义添加控件样式
        }
      ],
      rightSidebar: [
        {
          slot: 'HD', // 对应定义的 slot 值
          width: '200px' // 侧栏宽度，string | number
        }
      ]
    },
    plugins: [
      new MuiPlayerDesktopPlugin({
        leaveHiddenControls: true,
        customSetting: [
          {
            functions: '清晰度',
            model: 'select',
            show: true,
            zIndex: 0,
            childConfig: [
              // {functions: '蓝光1080P'},
              // {functions: '超清'},
              { functions: '超清', selected: true }
              // {functions: '标清'},
            ],
            onToggle: function (data, selected, back) {
              // Action
            }
          }
        ]
      })
    ]
  })

  mp.on('back', function (event) {
    console.log('播放器返回时触发')
  })
  mp.on('controlstoggle', function (event) {
    console.log('播放器控件切换', event)
  })
  mp.on('seek-progress', function (event) {
    mp.showToast('视频寻址时触发' + event.percentage)
  })
  // 传入需要加载的js地址 和 回调函数
  function dynamicLoadJs(url, callback) {
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    if (typeof callback == 'function') {
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          callback()
          script.onload = script.onreadystatechange = null
        }
      }
    }
    head.appendChild(script)
  }
  // 使用示例是不是很简单呢
  dynamicLoadJs('/CommentCoreLibrary/js/CommentCoreLibrary.min.js', () => {

    var CM = new window.CommentManager(document.getElementById('comment-stage'))
    // 初始化弹幕管理器
    CM.init() 

    // 载入弹幕列表，
    var danmakuData = [
      { mode: 1, text: '请画出受力分析（10分）', stime: 200, size: 25, dur: 7000, color: 0xffffff },
      { mode: 5, text: '这风景太漂亮了吧~', stime: 1000, size: 25, dur: 4000, color: 0xff0000 },
      {
        mode: 5,
        text: '前方高能，建议反复观看！！',
        stime: 1500,
        size: 25,
        dur: 4000,
        color: 0xffff00
      }
    ]
    CM.load(danmakuData)

    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    mp.on('ready', function (event) {
      mp.showToast('播放器已创建完成')
      mp.video().addEventListener('play',function() {
        console.log('播放');
        
        playTime.value = mp.video().currentTime * 1000
        disableTime.value = true;
        CM.start()
        triggerTime();
      })
      mp.video().addEventListener('pause',function() {
          disableTime.value = false;
          CM.stop();
      })
      mp.video().addEventListener('seeked',function() {
          CM.clear();
          playTime.value = mp.video().currentTime * 1000;
      })
    })

    
    // 停止播放（停止弹幕移动）
    mp.on('pause', function () {
      CM.stop()
    })

    // 更新时间轴时间
    CM.time(500)

     // 触发通报 CCL 播放时间
    function triggerTime() {
        if(!disableTime.value) { return };
        setTimeout(function() {
            playTime.value += 100; // 每100毫秒追加时间轴，生成模拟播放

            console.log('Polling => ' + (playTime.value / 1000) + 's');
            CM.time(playTime.value); // 通报播放时间
            triggerTime(); // 轮询调用
        },100);
    }
  })
})
</script>
<style lang='less' scoped>
:deep(.el-card__body) {
  height: calc(100vh - 95px);
}
.abp {
  width: 700px !important;
  margin: 0 auto !important;
}
</style>