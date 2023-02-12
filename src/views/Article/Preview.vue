<template>
  <div>
    <ElRow>
      <ElCol :span="6"><div class="grid-content ep-bg-purple">123</div></ElCol>
      <ElCol :span="13">
        <h1></h1>
        <div class="grid-content ep-bg-purple-light h-screen overflow-x-scroll">
          <v-md-preview :text="articleContent" /> </div
      ></ElCol>
      <ElCol :span="5"><div class="grid-content ep-bg-purple">222</div></ElCol>
    </ElRow>
  </div>
</template>
<script lang="ts">
import { useRoute } from 'vue-router'

import { ElCard, ElSkeleton, ElRow, ElCol, ElLink } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { defineComponent, reactive } from 'vue'
import { ref, setup, watch, toRefs } from 'vue'
import { getArticleDetail } from '@/api/article'
export default defineComponent({
  components: { ElRow, ElCol },
  setup(props) {
    const route = useRoute()
    let articleContent = ref('')
    watch(
      () => route.params.id,
      async (newId) => {
        console.log('newId', newId)

        const { data } = await getArticleDetail(newId)
        console.log(data)
        articleContent.value = data[0].content
      },
      {
        immediate: true
      }
    )
    return {
      articleContent
    }
  }
})
</script>
<style lang="less" scoped>
:deep {
  .ep-bg-purple-light {
    .vuepress-markdown-body:not(.custom) {
      padding: 1rem;
    }
  }
}
</style>
