<template>
<div class="lock-container">
  <div class="lock-main">
  <h2>Admin</h2>
  <div class="lock -handle">
    <ElInput placeholder="请输入解锁密码" v-model="Password" @keyup.enter />
    <div class="lock-out">
      <span @click="Unlock"><svg-icon icon-class='unlock'/></span>
      <span @click="loginOut"><svg-icon icon-class='lockOut'/></span>
    </div>
  </div>
  </div>
</div>
</template>
<script>
  import md5 from 'js-md5'
  import { setup, ref } from 'vue';
import { useAppStore } from '@/stores/modules/app'
import { ElMessage } from 'element-plus';

  export default {
    setup() {
      const appStore = useAppStore()
      const Password = ref('')
      const Unlock = () => {
        let convertPasswd = md5(Password);
        if (appStore.getLockPassword !== convertPasswd) {
          ElMessage('密码错误')
        } else {
          // 进入到之前的路由
          const { push } = useRouter()
          push('/screenLock')
        }
        // 和 vuex 或者  session进行对比
      }
      return {
        Unlock
      }
    },
  };
</script>
