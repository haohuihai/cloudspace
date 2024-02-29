<template>
  <ElCard body-style="height: calc(100vh - 87px)">
    <ElSteps :active="active" align-center>
      <ElStep title="第一步" description="输入账单信息" />
      <ElStep title="第二步" description="输入派送地点" />
      <ElStep title="第三步" description="输入账户密码" />
      <ElStep title="第四步" description="确认账单信息" />
    </ElSteps>
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="w-120 mt-30"
    >
      <ElFormItem label="姓名" prop="pass">
        <ElInput v-model="ruleForm.pass" type="password" autocomplete="off" />
      </ElFormItem>
      <ElFormItem label="年龄" prop="age">
        <ElInput v-model.number="ruleForm.age" />
      </ElFormItem>
      <ElFormItem>
        <ElButton v-if="active !== 1" @click="preSteps">上一步</ElButton>
        <ElButton type="primary" v-if="active !== 4" @click="nextSteps">下一步</ElButton>
        <ElButton v-else @click="onSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>
<script setup lang="ts">
import { reactive, ref, watch, unref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElTabPane,
  ElDivider,
  ElTabs,
  ElRow,
  ElCol,
  ElCheckbox,
  ElMessage,
  ElSteps,
  ElStep,
  ElCard,
  ElAlert
} from 'element-plus'
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
const active = ref(1)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  pass: '',
  age: ''
})

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }]
})

const nextSteps = () => {
  if (active.value !== 4) {
    active.value += 1
  }
}
const preSteps = () => {
  active.value -= 1
}
const onSubmit = () => {
  ElAlert('提交成功')
}
</script>
<style scoped lang="less"></style>
