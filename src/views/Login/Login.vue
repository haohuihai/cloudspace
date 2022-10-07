<script setup lang="ts">
import { ref } from 'vue'
import { LoginForm, RegisterForm } from './components'
// import { LocaleDropdown } from '@/components/LocaleDropdown'

// import { ThemeSwitch } from '@/components/ThemeSwitch'
import { useDesign } from '@/hooks/web/useDesign'
const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')
const isLogin = ref(true)

const toRegister = () => {
  isLogin.value = false
}
const toLogin = () => {
  isLogin.value = true
}
</script>
<template>
  <div
    :class="prefixCls"
    class="h-[100%] flex justify-center loginHome"
  >
    <!--  -->

    <!-- <div class="flex justify-end items-center space-x-10px">
      <ThemeSwitch />
      <LocaleDropdown class="<xl:text-white dark:text-white" />
    </div> -->
    <img class="headBgc" src="@/assets/imgs/headTitle.png" />

    <Transition appear enter-active-class="animate__animated animate__bounceInRight">
      <div class="h-full flex mt-1/6 w-[100%]">
        <LoginForm v-if="isLogin" class="p-20px mx-auto" @to-register="toRegister" />
        <RegisterForm v-else class="p-20px m-auto" @to-login="toLogin" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.loginHome {
  background: url('@/assets/imgs/loginbgc.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.headBgc {
  position: absolute;
  top: 60px;
  left: 50%;
  height: 70px;
  width: 290px;
  transform: translateX(-50%);
}
</style>
