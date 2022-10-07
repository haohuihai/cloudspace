<template>
  <div class="flex flex-col items-center w-4/12 p-10 shadow-2xl min-w-100 min-h-380px relative">
    <div class="login_box mt-6">
      <input type="text" required v-model="loginInput" /><label>邮箱</label>
    </div>
    <div class="login_box">
      <input
        type="text"
        required
        @blur="valitedInput('isPhonenumber', phoneNumber)"
        v-model="phoneNumber"
      /><label>手机</label>
    </div>
    <div class="login_box">
      <input
        type="text"
        required
        @blur="valitedInput('nickname', nickname)"
        v-model="nickname"
      /><label>昵称</label>
    </div>
    <div class="login_box">
      <input
        type="password"
        @blur="valitedInput('isPassword', password)"
        v-model="password"
        required
      />
      <label>密码</label>
    </div>
    <div class="login_box lastInput">
      <input type="password" v-model="codeNumber" required /><label>验证码</label>
      <span
        class="absolute top-10px -right-2/5 text-base px-4px bg-light-50 cursor-pointer rounded-2px"
        @click="handleSendNumber"
        >{{ isSend ? endTime + 's' : sendNumberTip }}</span
      >
    </div>

    <a href="javascript:void(0)" @click="handleLogin">
      注册
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </a>
    <div class="bottomDesc">
      <span class="toregister" @click="handleToRegister"> 去登录 </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
const emit = defineEmits(['to-login'])
const phoneNumber = ref('')
const loginInput = ref('')
const nickname = ref('')
const password = ref('')
const codeNumber = ref('')
const sendNumberTip = ref('发送验证码')
const isSend = ref(false)
const endTime = ref('')
const valitedInput = (key, value) => {
  console.log('key', value)
}
const handleLogin = () => {}
const handleSendNumber = () => {}
const handleToRegister = () => {
  emit('to-login')
}
</script>
<style lang="less">
.loginType {
  .active_type {
    color: white;
  }
}
.login_box {
  position: relative;
  width: 100%;
  input {
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
    /* 背景颜色为透明色 */
    background-color: transparent;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    color: #fff;
    font-size: 14px;
    pointer-events: none;
    /* 加个过渡 */
    transition: all 0.5s;
  }
  input:focus + label,
  input:valid + label {
    top: -20px;
    color: #03e9f4;
    font-size: 12px;
  }
}

.lastInput {
  width: 73%;
  align-self: flex-start;
}
.bottomDesc {
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    color: white;
    cursor: pointer;
  }
}

@keyframes move1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes move2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes move3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes move4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
