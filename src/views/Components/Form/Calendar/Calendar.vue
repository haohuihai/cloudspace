<template>
  <div>
    <ElCard>
      <ElCalendar v-model="value" class="calendarContainer">
        <template #dateCell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''" class="">
            {{ data.day.split('-').slice(1).join('-') }}
          </p> 
          <div  v-for="(item, index) in tableData" :key="item.key"  @click.stop="handleCell(data.day)">
            <div class="cellClass" v-if="data.day == item.day">
              <div class="mt-1 mb-1 text-white px-2px flex justify-between rounded-sm "  :style="{background: it.color}" @click.stop="handleDetail(it)" v-for="(it) in tableData[index].info" :key="item.key">
                  <span>{{ it.name }} </span><span>{{ it.createAt }}</span>
              </div>
            </div>
          </div>
        </template>
      </ElCalendar>
       <div class="fixed right-30px bottom-30">
            <ElButton size="large" type="primary" :icon="Plus" circle  @click="handlePlusDay"/>
        </div>
    </ElCard>
    <ElDialog destroy-on-close v-model="dialogFormVisible" :title="dialogFormTitle" width="500px">
        <ElForm ref="ruleFormRef" :rules="formRules" :model="form">
            <ElFormItem label="内容" :label-width="formLabelWidth" prop="name">
              <ElInput v-model="form.name" autocomplete="off"  ref="inputNameRef"/>
            </ElFormItem>
             <ElFormItem label="优先级" :label-width="formLabelWidth">
                <ElSelectV2
                  v-model="form.selected"
                  :options="selectOptions"
                  placeholder="Please select"
                  size="large"
                  style="width: 240px"
                >
                <template #default="{ item }">
                  <span :style="{border:  `4px solid ${item.color} `, margin: '0 4px 0 -10px',}"></span>
                  <span style="margin-right: 8px" >{{ item.label }}</span>
              </template>
                </ElSelectV2>
            </ElFormItem>
        </ElForm>
        <template #footer>
          <ElButton type="danger" v-if="form.name" @click="handleDeleteDay">
            删除
          </ElButton>
          <ElButton type="primary" @click="submitForm(ruleFormRef)">
            添加
          </ElButton>
        </template>
        
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch, nextTick } from 'vue';
  import { ElCalendar, ElDialog,ElForm, ElSelectV2, ElFormItem, ElMessage, ElInput, ElAffix, ElCard, ElButton } from 'element-plus';
  import type { FormRules, FormInstance } from 'element-plus';
  
  import {
  Plus
} from '@element-plus/icons-vue'
interface RuleForm {
  name: string
}
  const tableData = reactive([
    {
      day: '2024-02-29',
      info: [
        {
          all: ' all1',
          name: 'name1',
          createAt: '12:32',
          catalog: '1',
          color: '#ff6274',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name2',
          color: '#ffa523',
          catalog: '2',

          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name3',
          color: '#58c086',
          createAt: '12:32',
          catalog: '3',

          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name4',
          color: '#58c086',
          catalog: '3',

          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name5',
          color: '#58c086',
          createAt: '12:32',
          catalog: '3',

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
          color: '#ff6274',
          catalog: '1',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name2',
          color: '#ffa523',
          catalog: '2',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name3',
          color: '#58c086',
          catalog: '3',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name4',
          color: '#58c086',
          catalog: '3',
          createAt: '12:32',
          isFinsh: false
        },
        {
          all: 'all2',
          name: 'name5',
          color: '#58c086',
          catalog: '3',
          createAt: '12:32',
          isFinsh: false
        },
      ],
    },
  ]);
  const value = ref(new Date());
  const inputNameRef = ref<HTMLElement|null>(null)
  const formLabelWidth = '140px'
  let dialogFormVisible = ref(false)
  let dialogFormTitle = ref("创建日程")
  const ruleFormRef = ref<FormInstance>()
  const formRules = reactive({
    name: [
      {required: true, message: '请输入日程内容', trigger: 'blur'},
      {min: 2,max: 10, message: '内容长度在2 - 10个字之间'}
    ]
  })
  const form = reactive({
    name: '',
    color: '#ff6274',
    selected: '1'
  })
    const selectOptions = reactive([
    {
      value: "1",
      label: "重要且紧急",
      color: '#ff6274'
    },
    {
      value: "2",
      label: "重要不紧急",
      color: '#ffa523'
    },
    {
      value: "3",
      label: "不重要紧急",
      color: '#58c086'
    },
    {
      value: "4",
      label: "不重要不紧急",
      color: '#4ba9ff'
    },
  ])

  watch(dialogFormVisible, () => {
    console.log('dialogFormVisible', dialogFormVisible);
    if (dialogFormVisible.value) {
      nextTick(() => {
        inputNameRef.value && inputNameRef.value.focus()
      })
      
    }
    
  })

  const handleDetail = (item) => {
      form.name = item.name
      form.color = item.color;
      form.selected= item.catalog;
      dialogFormTitle.value = "编辑日程"
      dialogFormVisible.value = true;
  }

const handlePlusDay = () => {
  dialogFormVisible.value=true;
  form.name = '';
  form.color = '#ff6274';
  form.selected= '1';

}
  const handleCell = (item) => {
    console.log('item', item);
    
  }

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleDeleteDay = () => {
   ElMessage({
    message: '删除成功',
    type: 'success',
  })
}

</script>
<style lang="less" scoped>
@cellHeight: 160px;
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
