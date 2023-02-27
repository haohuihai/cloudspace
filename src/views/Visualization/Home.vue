<template>
  <div class="visualBox">
    <ElRow :gutter="20" class="rowCard">
      <ElCol
        v-for="item in visionList.list"
        :key="item.id"
        :span="3"
        @click="() => toEcharts(item)"
      >
        <ElCard :body-style="{ padding: '0px', border: 'none' }" shadow="hover">
          <img :src="item.image" class="image" height="300" />
          <div style="padding: 14px; background: #000000cf">
            <span class="title">{{ item.name }}</span>
            <!-- <div class="bottom"> {{ item.content }} </div> -->
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import { ElRow, ElCol, ElCard, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
interface List {
  name: string
  id: number
  path: string
  image: string
  content: string
}

const visionList = reactive<{ list: List[] }>({
  list: [
    {
      name: '电商平台可视化',
      id: 1,
      image: '/src/assets/imgs/vision/shopping.png',
      path: '/visualization/shopping',
      content: '统计商家的销售'
    },
    {
      name: '智慧物流可视化',
      id: 2,
      image: '/src/assets/imgs/vision/traffic1.png',
      path: '/visualization/traffic',
      content: '统计物流的流向'
    }
  ]
})
const { push } = useRouter()

const currentDate = ref(new Date())

function toEcharts(item) {
  push(item.path)
}
</script>
<style lang="less" scoped>
.visualBox {
  background-image: url('@/assets/imgs/visionhome.png');
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  overflow: hidden;
}
.rowCard {
  margin-top: 10%;
  left: 20%;
}
.title {
  font-size: 16px;
  font-weight: 600;
  color: #bcc9d4;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  color: #969799;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  height: 200px;
  width: 100%;

  display: block;
}
:deep(.el-card) {
  border: none;
  cursor: pointer;
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
