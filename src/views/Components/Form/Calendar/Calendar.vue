<template>
  <div>
    <ElCard>
      <ElCalendar v-model="value">
        <template #dateCell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''" class="">
            {{ data.day.split('-').slice(1).join('-') }}
          </p> 
          <div  v-for="(item, index) in tableData" :key="item.key">
            <div class="h-54px overflow-scroll" v-if="data.day == item.day">
              <div class="mt-1 mb-1 text-white px-2px flex justify-between" :style="{background: it.bg}" v-for="(it, iIndex) in tableData[index].info" :key="item.key">
                  <span>{{ it.name }} </span><span>{{ it.createAt }}</span>
              </div>
            </div>
          </div>
        </template>
      </ElCalendar>
       <ElAffix :offset="120">
            <Icon icon="ic:baseline-plus"/>
        </ElAffix>
    </ElCard>
   
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElCalendar } from 'element-plus';
  const tableData = reactive([
    {
      day: '2024-02-29',
      info: [
        {
          all: ' all1',
          name: 'name1',
          createAt: '12:32',
          bg: 'red',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name2',
          bg: 'blue',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name3',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name4',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name5',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
      ],
    },
    {
      day: '2024-02-20',
      info: [
        {
          all: ' all1',
          name: 'name1',
          createAt: '12:32',
          bg: 'red',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name2',
          bg: 'blue',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name3',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name4',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name5',
          bg: 'green',
          createAt: '12:32',
          isFinsh: false
        },
      ],
    },
  ]);
  const value = ref(new Date());
</script>
<style>
  .is-selected {
    color: #1989fa;
  }
</style>
