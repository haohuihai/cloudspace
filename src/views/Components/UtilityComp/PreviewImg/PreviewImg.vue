<template>
  <div class="image-preview">
    <ElImage
      style="width: 100px; height: 100px"
      :zoom-rate="1.2"
      :preview-src-list="ramdomList.list.map((item) => item.url)"
      :hide-on-click-modal="true"
      fit="cover"
      :initial-index="currentImgIndex"
      lazy
      setActiveItem="setCurrentItem"
      v-for="(item, index) in ramdomList.list"
      :key="item.id"
      :src="item.url"
      @click="() => handleSetCurrent(index)"
    />
  </div>
</template>
<script setup>
import { ElImage, ElMessage } from 'element-plus'
import { randomImageApi } from '@/api/common'
import { onMounted, reactive, ref } from 'vue'
let currentImgIndex = ref(0)
let ramdomList = reactive({ list: [] })

const handleSetCurrent = (index) => {
  currentImgIndex.value = index
}

const handleGetImageList = () => {
  let params = {
    cid: 1,
    start: 0,
    count: 20
  }
  randomImageApi(params).then((result) => {
    if (result.errmsg === '正常') {
      ramdomList.list = result.data
    }
    console.log(result)
  })
}
onMounted(() => {
  handleGetImageList()
})
// return {
//   currentImgIndex,
//   handleSetCurrent
// }
</script>
<style scoped>
.image-preview {
}
</style>
