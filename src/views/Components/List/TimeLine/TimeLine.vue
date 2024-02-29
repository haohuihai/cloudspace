<template>
  <ElCard>
    <ElTimeline vInfiniteScroll="load" :infinite-scroll-distance="20" :style="{'overflow': 'auto', 'height': 'calc(100vh - 50px)'}" ref="elTimeLine">
      <ElTimelineItem
        v-for="item in articleData"
        :key="item.key"
        :timestamp="item.date"
        placement="top"
        :color="item.color"
        :type="item.type"
      >
        <ElCard>
          <h4>{{item.title}}</h4>
          <p>{{item.outline}}</p>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>
  </ElCard>
</template>

<script lang="ts" setup>
  import { ElCard, ElTimeline, ElTimelineItem } from 'element-plus';
  import { ref, onMounted } from 'vue';
  import { reactive } from 'vue';
  const articleData = reactive([
    {
      date: '2021-12-23',
      title: '完成了跑步',
      outline: '',
      color: 'green',
      type: 'success',
      icon: '',
      avatar: '',
      key: '1',
    },
    {
      date: '2021-12-23',
      title: '看完了vue实战',
      outline: '',
      avatar: '',
      key: '2',
      color: 'green',
      type: 'success',
      icon: '',
    },
    {
      date: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      color: 'green',
      type: 'success',
      icon: '',
      key: '3',
    },
    {
      date: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '4',
      color: 'green',
      type: 'success',
      icon: '',
    },
    {
      date: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      color: 'green',
      type: 'success',
      icon: '',
      key: '5',
    },
    {
      date: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '6',
      color: 'green',
      type: 'success',
      icon: '',
    },
    {
      date: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      color: 'green',
      type: 'success',
      icon: '',
      key: '7',
    },
  ]);
  const load = () => {
    console.log('123');
  };

  const elTimeLine = ref();
  const elTimeLineHeight = ref(0);
  onMounted(() => {
    console.log(elTimeLine.value?.clientHeight);
    
    elTimeLineHeight.value = elTimeLine.value?.clientHeight + 20;
    console.log('elTimeLineHeight', elTimeLineHeight.value);
    
  });
</script>

<style>
  .is-selected {
    color: #1989fa;
  }
</style>
