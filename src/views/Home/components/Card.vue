<template>
  <ElRow :gutter="15">
    <ElCol :span="5" v-for="item in appList" :key="item.id" class="mb-10px cursor-pointer">
      <ElCard shadow="hover" :body-style="{ padding: '10px' }">
        <div class="box" @click="toDetailPage(item)" :body-style="{ paddingBottom: '0' }">
          <img src="@/assets/imgs/1256748.png" alt="" />
          <h1>{{ item.name }}</h1>
          <div class="card-desc">{{ item.desc }}</div>
        </div>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
interface List {
  name: string
  id: string
  img: string
  desc: string
}
import { ElRow, ElCol, ElCard } from 'element-plus'
export default defineComponent({
  name: 'Card',
  components: { ElRow, ElCol, ElCard },
  props: {
    appList: {
      type: Array as () => List[],
      require: true
    }
  },
  emits: ['to-detail'],
  setup(props, { emit }) {
    console.log('props', props)
    const toDetailPage = (item) => {
      emit('to-detail', item)
    }
    const toggleCollapse = (e) => {
      e.stopPropagation()
      console.log('toggle', e)
    }
    return {
      toDetailPage,
      toggleCollapse
    }
  }
})
</script>
<style scoped lang="less">
.box {
  // width: 18%;
  // min-width: 120px;
  // height: 220px;
  // margin: 0 5px 20px;
  // border-radius: 4px;
  // box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25);

  img {
    cursor: pointer;
    height: 150px;
    width: 100%;
    border-radius: 4px 4px 0 0;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 15px;
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-desc {
    color: rgba(153, 153, 153, 1);
    font-size: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    max-width: 240px;
  }

  .bottom-operate {
    border-top: 1px solid #bcbcbc;
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;

    i {
      cursor: pointer;
      flex: 1;
      text-align: center;
    }

    .left-operate {
      border-right: 1px solid #bcbcbc;
    }
  }

  // &:hover {
  //   translate: 0.2s;
  //   box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.45);
  // }
}
.box1 {
  width: 18%;
  height: 0;
  border: none;
  margin: 0 5px 20px;
}
</style>
