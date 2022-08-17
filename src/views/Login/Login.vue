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
    class="h-[100%] flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500"
  >
    <!-- <div class="flex justify-end items-center space-x-10px">
      <ThemeSwitch />
      <LocaleDropdown class="<xl:text-white dark:text-white" />
    </div> -->
    <Transition appear enter-active-class="animate__animated animate__bounceInRight">
      <div class="h-full flex items-center m-auto w-[100%]">
        <LoginForm v-if="isLogin" class="p-20px h-auto m-auto" @to-register="toRegister" />
        <RegisterForm v-else class="p-20px h-auto m-auto" @to-login="toLogin" />
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
