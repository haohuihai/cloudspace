<template>
    <ElCard class="cardBox">
      <div id="mui-player" class="videoContainer"></div>
    </ElCard>
</template>
<script  lang="ts" setup>

import { onMounted } from 'vue'
import 'mui-player/dist/mui-player.min.css'
import MuiPlayer from 'mui-player'
import { ElCard } from 'element-plus'
  onMounted (() => {
    var mp = new MuiPlayer({
      container:'#mui-player',
      title:'标题',
      src:'/media.mp4',
      height: "300px",
      objectFit: 'contain'
    })
  })
</script>
<style lang='less' scoped>
:deep(.el-card__body) {
  height: calc(100vh - 95px);
}
.videoContainer {
    width: 700px !important;
    margin: 0 auto !important;
}
</style>