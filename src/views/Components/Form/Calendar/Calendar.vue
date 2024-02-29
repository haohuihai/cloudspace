<template>
  <div>
    <ElCard>
      <ElCalendar v-model="value" class="calendarContainer">
        <template #dateCell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''" class="">
            {{ data.day.split('-').slice(1).join('-') }}
          </p> 
          <div  v-for="(item, index) in tableData" :key="item.key">
            <div class="cellClass" v-if="data.day == item.day" >
              <div class="mt-1 mb-1 text-white px-2px flex justify-between rounded-sm " :style="{background: it.bg}" @click="handleDetail(it)" v-for="(it) in tableData[index].info" :key="item.key">
                  <span>{{ it.name }} </span><span>{{ it.createAt }}</span>
              </div>
            </div>
          </div>
        </template>
      </ElCalendar>
       <div class="fixed right-30px bottom-30">
            <ElButton size="large" type="primary" :icon="Plus" circle />
        </div>
    </ElCard>
   
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ElCalendar, ElAffix, ElCard, ElButton } from 'element-plus';
  import {
  Plus
} from '@element-plus/icons-vue'
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

  const handleDetail = (item) => {
    console.log('item', item);
    
  }
</script>
<style lang="less" scoped>
@cellHeight: calc((100vh - 205px - 80px) / 5);
  .is-selected {
    color: #1989fa;
  }
  .calendarContainer {
    :deep(.el-calendar-day) {
      height: @cellHeight;
      .cellClass {
        overflow: overlay;
        height: calc(@cellHeight - 35px);
      }
    }
  }
</style>
