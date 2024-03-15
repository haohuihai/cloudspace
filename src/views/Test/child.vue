<template>
  <div id="videoContainer" ref="videoContainerRef" class="hhh-container">
    <video ref="videoRef">
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />
      <a href="/media/cc0-videos/flower.mp4">MP4</a>
      <track label="英文" kind="subtitles" srclang="en" src="/child/subtitles/vtt/sintel-en.vtt" default>
			<track label="德语" kind="subtitles" srclang="de" src="/childsubtitles/vtt/sintel-de.vtt">
			<track label="西班牙" kind="subtitles" srclang="es" src="/childsubtitles/vtt/sintel-es.vtt">
    </video>
    <div class="hhh-controls" ref="controlsRef" id="video-controls">
      <div class="hhh-process">
        <div class="hhh-process-outer">
          <progress id="progress" ref="processRef" value="0" min="0">
            <span id="progress-bar" ref="progressBar"></span>
          </progress>
        </div>
      </div>
      <div class="hhh-placholder"></div>
      <div class="hhh-btn-play" ref="playpauseRef" id="playpause">
        <Icon icon="majesticons:play-circle" size="25" />
      </div>
      <div class="hhh-time" ref="timeRef">
        <span class="hhh-time-current">{{videoChangeTime}}</span>
        <span>{{videoDuration}}</span>
      </div>
      <div class="hhh-input-danmu">
        <el-input v-model="inputDanmuValue" @focus="handleInputFocus"  @blur="handleInputBlur" :style="{width: inputWidth + 'px'} " placeholder="发弹幕..." />
      </div>
      <div class="hhh-restart-play" ref="restartPlayRef">
        <Icon icon="gravity-ui:circle-stop" size="25" />
      </div>
      <div class="hhh-danmu-switch">
        <ElSwitch
          v-model="danmuSwitch"
          inline-prompt
          active-text="打开"
          size="large"
          width="80"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          inactive-text="关闭"
        />
      </div>
      <div class="hhh-vol" ref="volRef">
        <span id="volinc">
          <Icon icon="gravity-ui:volume-low" size="25" />
        </span>
        <!-- <span id="voldec">vol-</span> -->
      </div>
      <div class="hhh-subtitles" ref="subtitlesRef">
        <a ref="subtitlesBtnRef">英语</a>
      </div>
      <div id="fs" class="hhh-full" ref="fullRef">
        <Icon icon="majesticons:arrows-expand-full-line" size="25" />
      </div>
    </div>
    <div class="hhh-player-danmu-container">
			<div v-for="(danmu, index) in danmuList" :key="index" class="hhh-player-danmu"
				:style="{ top: `${danmu.top}px`, color: '#fff', right: `${danmu.right}px` }">
				<span :style="{
          color: danmu.color,
					display:'inline-block',
          border: `1px solid ${danmu.color}`,
					padding:'5px',
          'border-radius': '50px',
          'font-size': '16px',
          background: 'rgba(255, 255, 255, 0.1)'
          
				}">
					{{ danmu.text }}
				</span>
			</div>
		</div>
    <div class="hhh-pause-icon" v-if="isPause">
      <Icon :size="60" icon="bx:caret-right-circle"/>
    </div>
  </div>
</template>
<script>
  import { defineComponent, onMounted, onUnmounted, reactive, ref, unref } from 'vue';
import { reactify } from '@vueuse/core';
  export default defineComponent({
    setup() {
      const videoRef = ref();
      const controlsRef = ref();
      const processRef = ref();
      const playpauseRef = ref();
      const timeRef = ref();
      const volRef = ref();
      const fullRef = ref();
      const restartPlayRef = ref();
      const progressBar = ref();
      const videoContainerRef = ref();
      const videoChangeTime = ref(0);
      const videoDuration = ref(0);
      const subtitlesRef = ref();
      const subtitlesBtnRef = ref();
      const isPause = ref(true)
      const danmuSwitch = ref(true)
      const inputDanmuValue = ref('')
      const inputWidth = ref(50)
      const danmuList = reactive([
        {
          text: '测试1',
					top: Math.floor(Math.random() * 160) + 20, // 随机生成弹幕的垂直位置
					color: '#fff', // 随机生成弹幕颜色
					right: 20,
        },
      ])
       var subtitlesMenu;
      onMounted(() => {
        // 获取DOM实例
        // 判断是否支持video自定义控件
        // 监听事件
        initDom();
      });
      const getRandomColor = () => {
        var color = "#";
        for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16).toString(16);
        return color;
      };
      // 卸载事件
      onUnmounted(() => {});

      const initDom = () => {
        const supportsVideo = !!document.createElement('video').canPlayType;
        if (supportsVideo) {
          // 注册事件
          const videoContainer = document.getElementById('videoContainer');
          const videoControls = document.getElementById('video-controls');

          let videoUnRef = unref(videoRef);
          // 隐藏原生控件，展示自定义控件
          // Hide the default controls
          videoUnRef.controls = false;
          videoControls.style.display = 'flex';

          // 自定义暂停播放事件
          unref(playpauseRef).addEventListener('click', (e) => {
            if (videoUnRef.paused || videoUnRef.ended) {
              videoUnRef.play();
              isPause.value = false
            } else {
              videoUnRef.pause();
              isPause.value = true
            }
          });

          // 重新播放， 自定义从头开始播放
          unref(restartPlayRef).addEventListener('click', (e) => {
            videoUnRef.pause();
            videoUnRef.currentTime = 0;
            unref(processRef).value = 0;
          });

          // 静音

          // mute.addEventListener("click", (e) => {
          //   video.muted = !video.muted;
          // });

          // 音量+ 和 音量 -
          unref(volRef).addEventListener('click', (e) => {
            alterVolume('+');
          });
          // voldec.addEventListener('click', (e) => {
          //   alterVolume('-');
          // });

          // 进度条发生改变
          videoUnRef.addEventListener('timeupdate', () => {
            console.log('time', videoUnRef.currentTime,  videoUnRef.duration);
            if (!unref(processRef).getAttribute('max'))
            videoChangeTime.value = Math.floor(videoUnRef.currentTime)
            videoDuration.value = Math.floor(videoUnRef.duration)
            unref(processRef).setAttribute('max', videoUnRef.duration);
            unref(processRef).value = videoUnRef.currentTime;
            unref(progressBar).style.width = `${Math.floor(
              (videoUnRef.currentTime * 100) / videoUnRef.duration,
            )}%`;
          });

          // 监听 点击 滚动条到某一刻
          unref(processRef).addEventListener('click', (e) => {
            const rect = unref(progress).getBoundingClientRect();
            const pos = (e.pageX - rect.left) / unref(progress).offsetWidth;
            videoUnRef.currentTime = pos * videoUnRef.duration;
          });

          // 监听全屏按钮
          unref(fullRef).addEventListener('click', (e) => {
            handleFullscreen();
          });

          // 监听用户使用ESC退出
          document.addEventListener('fullscreenchange', (e) => {
            setFullscreenData(!!document.fullscreenElement);
          });
         
          if (videoUnRef.textTracks) {
              var df = document.createDocumentFragment();
              var subtitlesMenu = df.appendChild(document.createElement('ul'));
              subtitlesMenu.className = 'subtitles-menu';
              subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
              for (var i = 0; i < videoUnRef.textTracks.length; i++) {
                subtitlesMenu.appendChild(createMenuItem('subtitles-' + videoUnRef.textTracks[i].language, videoUnRef.textTracks[i].language, videoUnRef.textTracks[i].label));
              }
              unref(subtitlesRef).appendChild(subtitlesMenu);
          }

          unref(subtitlesBtnRef).addEventListener('click', function(e) {
            if (subtitlesMenu) {
              subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
            }
          });

        }
      }

      // 加减音量
      const alterVolume = (dir) => {
        let videoUnRef = unref(videoRef);
        const currentVolume = Math.floor(videoUnRef.volume * 10) / 10;
        if (dir === '+' && currentVolume < 1) {
          videoUnRef.volume += 0.1;
        } else if (dir === '-' && currentVolume > 0) {
          videoUnRef.volume -= 0.1;
        }
      };

      const handleFullscreen = () => {
        if (document.fullscreenElement !== null) {
          // The document is in fullscreen mode
          document.exitFullscreen();
          setFullscreenData(false);
        } else {
          // The document is not in fullscreen mode
          unref(videoContainerRef).requestFullscreen();
          setFullscreenData(true);
        }
      };
      var subtitleMenuButtons = [];
      const createMenuItem = (id, lang, label) => {
          let videoUnRef = unref(videoRef);
        var listItem = document.createElement('li');
        // var button = listItem.appendChild(document.createElement('button'));
        listItem.setAttribute('id', id);
        listItem.className = 'subtitles-button';
        if (lang.length > 0) listItem.setAttribute('lang', lang);
        listItem.value = label;
        listItem.setAttribute('data-state', 'inactive');
        listItem.appendChild(document.createTextNode(label));
        listItem.addEventListener('click', function(e) {
          // Set all buttons to inactive
          subtitleMenuButtons.map(function(v, i, a) {
            subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
          });
          // Find the language to activate
          var lang = this.getAttribute('lang');
          for (var i = 0; i < videoUnRef.textTracks.length; i++) {
            // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
            if (videoUnRef.textTracks[i].language == lang) {
              videoUnRef.textTracks[i].mode = 'showing';
              this.setAttribute('data-state', 'active');
            }
            else {
              videoUnRef.textTracks[i].mode = 'hidden';
            }
          }
          subtitlesMenu.style.display = 'none';
        });
        subtitleMenuButtons.push(listItem);
      return listItem;
      }
      const setFullscreenData = (state) => {
        unref(videoContainerRef).setAttribute('data-fullscreen', !!state);
      };

      const handleInputFocus = () => {
        inputWidth.value = 100
      }
      const handleInputBlur = () => {
        if (!inputDanmuValue) {
          inputWidth.value = 50
        }
      }
      return {
        videoRef,
        controlsRef,
        processRef,
        fullRef,
        danmuList,
        subtitlesRef,
        subtitlesBtnRef,
        volRef,
        timeRef,
        playpauseRef,
        restartPlayRef,
        progressBar,
        videoContainerRef,
        videoDuration,
        videoChangeTime,
        inputDanmuValue,
        handleInputFocus,
        danmuSwitch,
        inputWidth,
        isPause
      };
    },
  });
</script>
<style scoped lang="less">
  .hhh-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    height: 338px;
    width: 600px;
    margin: 30px auto;
    position: relative;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .hhh-controls {
    position: absolute;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    display: none;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(0, 0, 0, 0.37),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.75)
    );
    z-index: 10;
    .hhh-danmu-switch {
      order: 13;
      color: #fff;
      margin: auto 3px;
      cursor: pointer;
    }
  }
 
  .hhh-process {
    display: block;
    position: absolute;
    height: 20px;
    line-height: 20px;
    left: 12px;
    right: 12px;
    outline: none;
    top: -15px;
    z-index: 35;
  }
  .hhh-btn-play {
    width: 40px;
    position: relative;
    order: 0;
    display: block;
    cursor: pointer;
    margin-left: 3px;
    color: #fff;
    text-align: center;
    margin: auto 0px;
    margin-left: 3px;
  }

  .hhh-time {
    order: 2;
    font-family: ArialMT;
    font-size: 13px;
    color: #fff;
    line-height: 40px;
    height: 40px;
    text-align: center;
    display: inline-block;
    margin: auto 8px;
    .hhh-time-current {
      color: #fff;
      &::after {
        content: '/';
        display: inline-block;
        padding: 0 3px;
      }
    }
  }
  .hhh-input-danmu {
    order: 3;
    width: 20px;
    :deep(.el-input) {
      transform: 0.3s inline;
    }
  }
  .hhh-vol {
    order: 13;
    color: #fff;
    margin: auto 3px;
    cursor: pointer;
  }
  .hhh-restart-play {
    order: 12;
    color: #fff;
    margin: auto 3px;
    cursor: pointer;
  }
  .hhh-subtitles {
    order: 10;
    color: #fff;
    margin: auto 3px;
    cursor: pointer;
    position: relative;
    a {
      font-size: 15px;
    }
     /deep/.subtitles-menu {
        position: absolute;
        bottom: 32px;
        background: rgba(0, 0, 0, .54);
        border-radius: 2px;
        width: 60px;
        left: -17px;
        text-align: center;
        display: none;
        z-index: 40;
        .subtitles-button {
            opacity: .7;
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: hsla(0, 0%, 100%, .8);
            padding: 6px 13px;
            &:hover {
              color: #fff;
              opacity: 1;
            }
        }
    }
    &:hover {
      /deep/.subtitles-menu {
        display: inline-block;
      }
    }
  }
  .hhh-full {
    order: 14;
    color: #fff;
    margin: auto 3px;
    cursor: pointer;
  }
  .hhh-placholder {
    order: 4;
    flex: 1;
  }
  .hhh-process-outer {
    background: hsla(0, 0%, 100%, 0.3);
    display: block;
    height: 3px;
    line-height: 3px;
    width: 100%;
    position: relative;
    cursor: pointer;
    progress {
      width: 100%;
    }
    .hhh-process-cache {
      background: hsla(0, 0%, 100%, 0.5);
      width: 43.9265%;
    }
    .hhh-process-played {
      background-image: linear-gradient(-90deg, #fa1f41, #e31106);
      border-radius: 0 1.5px 1.5px 0;
      width: 1.68238%;
    }
  }
  .hhh-player-danmu-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    .hhh-player-danmu {
      position: absolute;
		  white-space: nowrap;

    }
  }
  .hhh-pause-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    color: #fff;
  }
</style>
