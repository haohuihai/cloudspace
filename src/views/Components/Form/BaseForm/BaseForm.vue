<template>
  <ElCard>
    <ElForm status-icon ref="ruleFormRef" :rules="rules" :model="form" label-width="120px">
      <ElFormItem label="标题">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="发布地点">
        <ElSelect v-model="form.region" placeholder="选择区域">
          <ElOption label="上海" value="shanghai" />
          <ElOption label="北京" value="beijing" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="选择时间">
        <ElCol :span="4">
          <ElDatePicker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
        </ElCol>
        <ElCol :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </ElCol>
        <ElCol :span="11">
          <ElTimePicker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
        </ElCol>
      </ElFormItem>
      <ElFormItem label="公开">
        <ElSwitch v-model="form.delivery" />
      </ElFormItem>
      <ElFormItem label="标签">
        <ElCheckboxGroup v-model="form.type">
          <el-checkbox label="JavaScript" name="type" />
          <el-checkbox label="CSS" name="type" />
          <el-checkbox label="HTML" name="type" />
          <el-checkbox label="CSS3" name="type" />
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem label="是否开启赞助">
        <ElRadioGroup v-model="form.resource">
          <ElRadio label="开启" />
          <ElRadio label="关闭" />
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="备注">
        <ElInput v-model="form.desc" type="textarea" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(ruleFormRef)">创建</ElButton>
        <ElButton @click="resetForm(ruleFormRef)">重置</ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import {
  ElRadioGroup,
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElCol,
  ElCheckbox,
  ElSelect,
  ElRadio,
  ElCheckboxGroup,
  ElSwitch,
  ElTimePicker,
  ElDatePicker,
  ElOption,
  ElCard
} from 'element-plus'
interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const rules = reactive<any>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  // region: [
  //   {
  //     required: true,
  //     message: 'Please select Activity zone',
  //     trigger: 'change'
  //   }
  // ],
  // count: [
  //   {
  //     required: true,
  //     message: 'Please select Activity count',
  //     trigger: 'change'
  //   }
  // ],
  // date1: [
  //   {
  //     type: 'date',
  //     required: true,
  //     message: 'Please pick a date',
  //     trigger: 'change'
  //   }
  // ],
  // date2: [
  //   {
  //     type: 'date',
  //     required: true,
  //     message: 'Please pick a time',
  //     trigger: 'change'
  //   }
  // ],
  // type: [
  //   {
  //     type: 'array',
  //     required: true,
  //     message: 'Please select at least one activity type',
  //     trigger: 'change'
  //   }
  // ],
  // resource: [
  //   {
  //     required: true,
  //     message: 'Please select activity resource',
  //     trigger: 'change'
  //   }
  // ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
})
const ruleFormRef = ref<FormInstance>()
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
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped></style>
