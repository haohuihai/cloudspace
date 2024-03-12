<template>
  <div id="container" class="hhh-container">
    <video ref="videoRef">
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />
      <a href="/media/cc0-videos/flower.mp4">MP4</a>
      video.
    </video>
    <div class="hhh-controls">
      <div class="hhh-process">
        <div class="hhh-process-outer">
          <div class="hhh-process-cache"></div>
          <div class="hhh-process-played"></div>
        </div>
      </div>
      <div class="hhh-btn-play">
        <ElIcon><VideoPause /></ElIcon>
      </div>
      <div class="hhh-time">
        <span class="hhh-time-current">01:12</span>
        <span>02:30</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
  import {
  VideoPause
} from '@element-plus/icons-vue'
import { ElIcon  } from "element-plus";
export default defineComponent({
  setup() {
    const videoRef = ref()
    onMounted(() => {
      const condom = document.getElementById('container')
      console.log('condom', condom, videoRef)
      console.log('this.refs.videoRef', videoRef)
    })
    return {
      videoRef
    }
  }
})
</script>
<style scoped lang="less">
#container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  height: 338px;
  width: 600px;
  video {
    width: 100%;
    height: 100%;
  }
}
.hhh-container {
  position: relative;
}
.hhh-controls {
  position: absolute;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0, 0.37),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0.75)
  );
  z-index: 10;
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
.hhh-process-outer {
  background: hsla(0, 0%, 100%, 0.3);
  display: block;
  height: 3px;
  line-height: 3px;
  margin-top: 8.5px;
  width: 100%;
  position: relative;
  cursor: pointer;
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
</style>
