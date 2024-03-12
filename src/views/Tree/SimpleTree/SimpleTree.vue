<template>
  <ElRow class="row h-300px bg-white">
    <ElCol :span="6" class="bg-light-800 h-100%">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="list1"
        :clone="clone"
        :move="checkMove"
        :group="{ name: 'people', pull: pullFunction }"
        @start="sourceStart"
        @end="sourceOnEnd"
        @change="sourceOnChange"
        item-key="id"
      >
        <template #item="{ element }">
          <ElButton type="primary">{{element.name}}</ElButton>
        </template>
      </draggable>
    </ElCol>
    <ElCol :span="14">
      <h3>Draggable 2</h3>
      <draggable
        @end="distOnEnd"
        @change="distOnChange"
        class="dragArea list-group" :list="list2" 
        group="people" 
        item-key="id">
        <template #item="{ element }">
            11
        </template>
      </draggable>
    </ElCol>
    <ElCol :span="4">
      1232
    </ElCol>
<!-- 
    <div class="col-3" :value="list1" title="List 1" />

    <div class="col-3" :value="list2" title="List 2" /> -->
  </ElRow>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { ElCol, ElForm, ElRow } from 'element-plus'

import draggable from 'vuedraggable'
const list1 = reactive([
  { name: 'Jesus', id: 1 },
  { name: 'Paul', id: 2 },
  { name: 'Peter', id: 3 }
])
const list2 = reactive([
  { name: 'Luc', id: 5 },
  { name: 'Thomas', id: 6 },
  { name: 'John', id: 7 }
])
const controlOnStart = ref(true)
// const fApi = reactive({})
// const options = reactive({
//   onSubmit: (formData) => {
//     alert(JSON.stringify(formData))
//   },
//   resetBtn: true
// })

const idGlobal = ref(0)
// const rule = reactive([
//   {
//     type: 'input',
//     field: 'goods_name',
//     title: '商品名称',
//     value: 'form-create'
//   },
//   {
//     type: 'checkbox',
//     field: 'label',
//     title: '标签',
//     value: [0, 1, 2, 3],
//     options: [
//       { label: '好用', value: 0 },
//       { label: '快速', value: 1 },
//       { label: '高效', value: 2 },
//       { label: '全能', value: 3 }
//     ]
//   }
// ])
// const myArray = reactive([
//   {
//     id: '1',
//     name: '测是'
//   },
//   {
//     id: '2',
//     name: '测是2'
//   },
//   {
//     id: '3',
//     name: '测是3'
//   }
// ])

// 抬起是出发
function clone({ name }) {
  console.log('name', name);
  
  return { name: "你好啊", id: idGlobal.value++ }
}

// 进入到可移动区时触发
function pullFunction() {
  console.log("controlOnStart", controlOnStart.value);
  
  return controlOnStart.value ? 'clone' : true
}

// 抬起元素是出发
function sourceStart({ originalEvent }) {
  console.log("originalEvent", originalEvent);
  
  controlOnStart.value = originalEvent.ctrlKey
}

// 在目标元素中 排序时获取的目标元素的信息
function checkMove(evt) {
  console.log('evt', evt);
  
}
function addedChange(evt) {
  console.log('addedChange', evt);
  
}
function movedChange(evt) {
  console.log('addedChange', evt);
}

// 在源 元素上触发;
function sourceOnEnd() {
  console.log('sourceOnEnd');
  
}
function distOnEnd() {
  console.log('distOnEnd');
  
}

// 目标元素
function distOnChange(evt) {

  // 这里会触发一个added对象,这个对象里面时element  和newIndex
  // 这样修改是不会触发渲染到新的name的
  console.log('distOnChange', evt);
  
}

// 源 元素
function sourceOnChange(evt) {
  console.log('sourceOnChange', evt);
  
}
</script>