<template>
  <div class="visualBox">
    <ElRow :gutter="20">
      <ElCol v-for="(o, index) in 4" :key="o" :span="3">
        <ElCard :body-style="{ padding: '0px' }" shadow="hover">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>电商平台</span>
            <div class="bottom"> 电商物流可视化平台 </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import { ElRow, ElCol, ElCard, ElButton } from 'element-plus'
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>
<style lang="less">
.visualBox {
  margin: 10% 10% 0 10%;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
:deep {
  .el-col-6 {
    width: 10%;
  }
}
@media screen and (max-width: 300px) {
  .el-col-6 {
    width: 30%;
  }
}
</style>
