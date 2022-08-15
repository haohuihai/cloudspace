<script setup lang="ts">
import { ref } from 'vue'
import { LoginForm, RegisterForm } from './components'
import { LocaleDropdown } from '@/components/LocaleDropdown'

import { ThemeSwitch } from '@/components/ThemeSwitch'
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
  <div :class="prefixCls" class="h-[100%] relative <xl:bg-v-dark <sm:px-10px <xl:px-10px <md:px-10px">
    <div class="flex justify-end items-center space-x-10px">
      <ThemeSwitch />
      <LocaleDropdown class="<xl:text-white dark:text-white" />
    </div>
    <Transition appear enter-active-class="animate__animated animate__bounceInRight">
      <div
        class="h-full flex items-center m-auto w-[100%] @2xl:max-w-500px @xl:max-w-500px @md:max-w-500px @lg:max-w-500px">
        <!-- <LoginForm
          v-if="isLogin"
          class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
          @to-register="toRegister"
        />
        <RegisterForm
          v-else
          class="p-20px h-auto m-auto <xl:(rounded-3xl light:bg-white)"
          @to-login="toLogin"
        /> -->

        <div
          class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <div class="text-center space-y-2 sm:text-left">
            <div class="space-y-0.5">
              <p class="text-lg text-black font-semibold">
                Erin Lindford
              </p>
              <p class="text-gray-500 font-medium">
                Product Engineer
              </p>
            </div>
            <button
              class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
</style>
