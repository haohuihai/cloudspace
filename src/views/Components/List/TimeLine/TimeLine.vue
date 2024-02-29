<template>
  <ElCard>
    <ElTimeline vInfiniteScroll="load" :style="{'overflow': 'auto', 'height': 'calc(100vh - 85px)'}" ref="elTimeLine">
      <ElTimelineItem
        v-for="item in articleData"
        :key="item.key"
        :timestamp="item.data"
        placement="top"
      >
        <ElCard>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/12 20:46</p>
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
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '1',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '2',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '3',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '4',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '5',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
      key: '6',
    },
    {
      data: '2021-12-23',
      title: '',
      outline: '',
      avatar: '',
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
