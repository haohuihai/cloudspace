<template>
  <ElDialog title="设置锁屏密码" destroy-on-close v-model="isShoLockModal" width="400px">
    <ElForm :model="form" ref="foomRef">
      <ElFormItem
        label="锁屏密码"
        prop="password"
        :rules="[{ required: true, message: '锁屏密码不能为空' }]"
      >
        <ElInput
          placeholder="请输入锁屏密码"
          v-model="form.password"
          @keyup.enter.native="handlelock"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton type="primary" @click="handlelock(foomRef)">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script>
import { computed, defineComponent, ref, reactive, defineProps } from 'vue'
import { ElButton, ElDialog, ElInput, ElFormItem, ElForm } from 'element-plus'
export default defineComponent({
  props: {
    isShoLockModal: Boolean
  },
  components: { ElButton, ElDialog, ElInput, ElFormItem, ElForm },
  setup(props, { attrs, emit, slots }) {
    console.log('props', props)
    const foomRef = ref(null)

    const form = reactive({
      password: ''
    })

    const handlelock = async (foomRef) => {
      // 存储密码  跳转路由
      if (!foomRef) return
      await foomRef.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      form,
      handlelock,
      isShoLockModal: props.isShoLockModal,
      foomRef
    }
  }
})
</script>
