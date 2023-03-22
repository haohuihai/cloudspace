<template>
  <div class="height-100vh backgroundImg">
    <div class="input-search">
      <ElInput v-model="inputKeyword" placeholder="请输入你想搜的" @input="handleSearch" />
    </div>
    <div class="container-box">
      <div v-for="item in appList.list" :key="item.id" class="box" @click="toDetailPage(item)">
        <img class="icon" :src="item.img" />
        <p class="url">{{ item.name }}</p>
      </div>
      <!-- <ElSkeleton
        style="width: 210px; margin-right: 20px"
        :loading="loading"
        animated
        v-for="i in 5"
        :key="i"
      >
        <template #template>
          <ElSkeletonItem variant="image" style="height: 190px" />
          <div style="padding: 14px 0">
            <ElSkeletonItem variant="h3" class="w-60%" />
            <div class="flex h-16px items-center">
              <ElSkeletonItem variant="text" class="mr-10px" />
              <ElSkeletonItem variant="text" style="width: 100%" />
            </div>
          </div>
        </template>
      </ElSkeleton> -->
      <!-- <Card :appList="appList.list" @to-detail="toDetailPage" v-if="!!appList.list.length" /> -->
      <!-- <ElEmpty v-if="!loading && !appList.list.length" :image-size="200" /> -->
    </div>
    <Chat />
    <ChatModal />
  </div>
</template>
<script setup lang="ts">
import { ElInput, ElSkeleton, ElSkeletonItem, ElEmpty } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Card } from './components'
import { Chat } from '@/components/Chat'
import { ChatModal } from '@/components/ChatModal'
import { getAppListApi } from '@/api/common'
const router = useRouter()
interface List {
  name: string
  id: string
  img: string
  desc: string
}
let inputKeyword = ref('')
const loading = ref(true)
const appList = reactive<{ list: List[] }>({
  list: []
})

onMounted(async () => {
  const result = await getAppListApi()
  loading.value = false
  appList.list = result
})

const handleSearch = async () => {
  console.log(inputKeyword.value)
  const result = await getAppListApi({name: inputKeyword.value})
  loading.value = false
  appList.list = result
}

const toggleCollapse = () => {
  console.log(123)
}
const toDetailPage = (item) => {
  console.log(item)
  router.push({
    path: item.path
  })
}
</script>
<style lang="less">
.backgroundImg {
  height: 100vh;
  background-image: url('@/assets/home/iTab-0.jfif');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.input-search {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 100px;

  .el-input {
    width: 30%;
    border-radius: 0px 4px 4px 0px;

    .el-input__wrapper {
      padding-right: 0;
      height: 40px;
      background: #fff;
      border: none;
      outline: 0;
      font-size: 16px;
      color: #4a4266;
      padding: 0 20px;
      border-radius: 50px;
    }
    .is-focus {
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    }
  }
}

.container-box {
  width: 74%;
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto 0;
}
.box {
  -webkit-animation: fadeInDown 0.2s;
  animation: fadeInDown 0.2s;
  position: relative;
  display: inline-block;
  width: 60px;
  border: 0;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}
.box a {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.url {
  color: #fff;
  height: 1.5em;
  line-height: 1.5em;
  width: 60px;
  font-size: 0.75em;
  white-space: nowrap;
  overflow: hidden;
  -webkit-border-top-right-radius: 5px;
  -webkit-border-bottom-right-radius: 5px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  padding-top: 3px;
  padding-bottom: 8px;
}
.icon {
  width: 3em;
  height: 3em;
  max-width: 60px;
  display: inline-block;
}
</style>
