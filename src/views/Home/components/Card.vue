<template>
  <div class="box" @click="toDetailPage" v-for="item in appList" :key="item.id">
    <img src="@/assets/imgs/1256748.png" alt="" />
    <h1>{{item.name}}</h1>
    <div class="card-desc">{{item.desc}}</div>
    <div class="bottom-operate">
      <Icon :size="18" icon="ant-design:menu-unfold-outlined" class=" left-operate" @click="e => toggleCollapse(e)" />
      <Icon :size="18" icon="ant-design:menu-unfold-outlined" class="right-operate" @click="e => toggleCollapse(e)" />
    </div>
  </div>
  <div class="box1"></div>
  <div class="box1"></div>
  <div class="box1"></div>
  <div class="box1"></div>
  <div class="box1"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
interface List {
  name: string
  id: string
  img: string
  desc: string
}
export default defineComponent({
  name: 'Card',
  props: {
    appList: {
      type: Array as () => List[],
      require: true
    }
  },
  emits: ['to-detail'],
  setup(props, { emit }) {
    console.log('props', props)
    const toDetailPage = () => {
      emit('to-detail')
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
  width: 18%;
  min-width: 120px;
  height: 220px;
  margin: 0 5px 20px;
  border-radius: 4px;
  box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.25);

  img {
    cursor: pointer;
    height: 145px;
    width: 100%;
    border-radius: 4px 4px 0 0;
  }

  h1 {
    font-size: 16px;
    padding: 0 10px;
  }

  .card-desc {
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    padding: 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

  &:hover {
    translate: 0.2s;
    box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.45);
  }
}
.box1 {
  width: 18%;
  height: 0;
  border: none;
  margin: 0 5px 20px;
}
</style>
