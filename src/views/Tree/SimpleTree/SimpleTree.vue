<template>
  <div>
    <!-- <FormCreate :rule="rule" :api="fApi" :option="options" /> -->
    <div class="row">
      <div class="col-3">
        <h3>Draggable 1</h3>
        <draggable
          class="dragArea list-group"
          :list="list1"
          :clone="clone"
          :group="{ name: 'people', pull: pullFunction }"
          @start="start"
          item-key="id"
        >
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>

      <div class="col-3">
        <h3>Draggable 2</h3>
        <draggable class="dragArea list-group" :list="list2" group="people" item-key="id">
          <template #item="{ element }">
            <div class="list-group-item">
              {{ element.name }}
            </div>
          </template>
        </draggable>
      </div>
<!-- 
      <div class="col-3" :value="list1" title="List 1" />

      <div class="col-3" :value="list2" title="List 2" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
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
const fApi = reactive({})
const options = reactive({
  onSubmit: (formData) => {
    alert(JSON.stringify(formData))
  },
  resetBtn: true
})
const rule = reactive([
  {
    type: 'input',
    field: 'goods_name',
    title: '商品名称',
    value: 'form-create'
  },
  {
    type: 'checkbox',
    field: 'label',
    title: '标签',
    value: [0, 1, 2, 3],
    options: [
      { label: '好用', value: 0 },
      { label: '快速', value: 1 },
      { label: '高效', value: 2 },
      { label: '全能', value: 3 }
    ]
  }
])
const myArray = reactive([
  {
    id: '1',
    name: '测是'
  },
  {
    id: '2',
    name: '测是2'
  },
  {
    id: '3',
    name: '测是3'
  }
])

function clone({ name }) {
  return { name, id: idGlobal++ }
}
function pullFunction() {
  return this.controlOnStart ? 'clone' : true
}
function start({ originalEvent }) {
  this.controlOnStart = originalEvent.ctrlKey
}
</script>