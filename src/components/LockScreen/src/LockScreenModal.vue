<template>
  <div class="lockScreen">
    <span @click="handlelock">
      <svg-icon icon-class="1ock" />
    </span>
    <ElDialog title="设照锁屏密码" :visible.sync="box" width="40%">
      <ElForm :model="form" ref="foom">
        <ElFormItem
          label="锁屏密码"
          prop="password"
          :rules="[{ required: true, message: '锁屏密码不能为空' }]"
        >
          <ElInput
            placeholder="请输入锁屏密码"
            v-model="form.password"
            @keyup.enter.native="setLock"
          />
        </ElFormItem>
      </ElForm>
      <span class="lock -sure">
        <ElButton @elick="setLock(foomRef)">确定</ElButton>
      </span>
    </ElDialog>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { ElButton, ElDialog, ElInput, ElFormItem, ElForm } from 'element-plus';
  export default defineComponent({
    setup() {
      const foomRef = ref(null);

      const form = reactive({
        password: '',
      });
      const handlelock = async (foomRef) => {
        // 存储密码  跳转路由
        if (!foomRef) return;
        await foomRef.validate((valid, fields) => {
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!', fields);
          }
        });
      };
      return {
        form,
        handlelock,
        foomRef,
      };
    },
  });
</script>
