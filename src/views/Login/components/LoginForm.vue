<template>
  <!-- 用户名密码登录 -->
  <div class="flex flex-col items-center w-470px p-10 shadow-2xl min-w-100 min-h-380px relative">
    <div class="loginType w-full flex justify-between text-white text-sm mb-4">
      <span :class="{ active_type: loginTypeIndex === index }" @click="chooseLoginType(index)"
        v-for="(item, index) in loginTypeList" :key="index" class="cursor-pointer text-gray-600 hover:text-white">{{
            item
        }}</span>
    </div>
    <template v-if="loginTypeIndex === 0">
      <div class="login_box mt-6">
        <input type="text" required v-model="loginForm.loginInput" /><label>邮箱/手机/昵称</label>
      </div>
      <div class="login_box">
        <input type="password" @blur="valitedInput('isPassword', loginForm.password)" v-model="loginForm.password"
          required />
        <label>密码</label>
      </div>
      <a href="javascript:void(0)" @click="handleLogin">
        登录
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
    </template>
    <template v-if="loginTypeIndex === 1">
      <div class="login_box mt-6" v-if="loginTypeIndex === 1">
        <input type="text" required @blur="valitedInput('isPhonenumber', loginForm.phoneNumber)"
          v-model="loginForm.phoneNumber" /><label>手机</label>
      </div>
      <div class="login_box lastInput">
        <input type="password" v-model="loginForm.codeNumber" required /><label>验证码</label>
        <span class="absolute top-10px -right-2/5 text-base px-4px bg-light-50 cursor-pointer rounded-2px"
          @click="handleSendNumber">{{
              isSend ? endTime + 's' : sendNumberTip
          }}</span>
      </div>
    </template>
    <template v-if="loginTypeIndex === 2">
      <div class="QRcode">
        <div class="QRcode_success" v-if="successShow">
          <img src="@/assets/img/login/success.png" alt="success" />
          <p>扫码成功</p>
        </div>
        <div class="QRcode_overtime" @click="scanAgainScanCode" v-if="overtimeShow">
          <p>二维码失效，点击重新获取</p>
          <img src="@/assets/img/login/reload.png" alt="reload.png" />
        </div>
        <!-- <img class="QRcode_img" :src="" /> -->
      </div>
      <p class="tips">{{ tipsText }}</p>
    </template>
    <div class="absolute bottom-40px flex justify-between w-[80%] left-10">
      <span class="cursor-pointer text-light-50" @click="handleToRegister"> 去注册</span>
      <span class="cursor-pointer text-light-50">忘记密码</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { ElInput, ElForm, ElFormItem, ElButton } from 'element-plus'
import { usePermissionStore } from '@/stores/modules/permission'
import { useAppStore } from '@/stores/modules/app'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { log } from 'console'
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const { t } = useI18n()
const { wsCache } = useCache()
const { currentRoute, addRoute, push } = useRouter()
declare type LoginInput = {
  loginInput?: string
  password?: string
  codeNumber?: string
  nickname?: string
  phoneNumber?: string
}
interface ScanSchema {
  socket?: string
  timerCheck?: string
  activeName?: string
}
const emit = defineEmits(['to-register'])
const successShow = ref(false)
const overtimeShow = ref(false)
const tipsText = ref('')
const isPassInput = reactive<string[]>([])
const loginForm = reactive<LoginInput>({
  loginInput: '', // 邮箱或手机号
  password: '', // 密码,
  codeNumber: '', // 验证码
  nickname: '', // 昵称
  phoneNumber: ''
})
const scanCodeQuery = reactive<ScanSchema>({
  socket: '',
  timerCheck: '',
  activeName: 'ScanCode'
})
const sendNumberTip = ref<string>('发送验证码')
const isSend = ref(false)
const endTime = ref(60)
const timeId = ref(null)
const redirect = ref<string>('')
const loginTypeList = reactive<string[]>(['邮箱', '手机', '扫码'])
const loginTypeIndex = ref<number>(0) // 0 邮箱，1  手机  2  扫码

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)
const handleSendNumber = () => {
  if (isSend.value && isPassInput.length) {
    // delete loginForm.codeNumber
    if (loginTypeIndex.value === 0) {
      // const { data: res } = await $http.post('/user/code', Qs.stringify(loginForm))
      // if (res.status === 'fail') return // $message.success(res.msg)
      // $message.success("验证码发送成功")
      countDown()
      // 手机登录
    } else {
      // const { data: res } = await $http.get('/user/sendSMS', {
      // params: {
      // phoneNumber: loginForm.phoneNumber,
      // codeNumber: loginForm.codeNumber
      // }
      // })
      // if (res.status === 'fail') return // $message.success(res.msg)
      // $message.success("验证码发送成功")
      // countDown()
    }
  } else {
    // $message.error("请输入正确的格式")
  }
}
// 邮箱登录，手机登录
const handleLogin = () => {
  if (isPassInput.length) return
  if (loginTypeIndex.value === 1) return phoneLoginHtttp() // 手机登录
  emailLoginHttp() // 邮箱/昵称登录
}
const emailLoginHttp = async () => {
  // await loginApi(params);
  // const { data: res } = await $http.post('/user/login1', Qs.stringify(loginForm))
  let params = {
    username: loginForm.loginInput || 'admin',
    password: loginForm.password || 'admin'
  }
  try {
    const res = await loginApi(params)
    if (res) {
      wsCache.set(appStore.getUserInfo, res)
      // router.push()
      getRole()
    }
  } finally {
    // loading.value = false
  }
  // if (res.status === 'fail') return // $message.error(res.msg)
  // console.log(`res`, res)
  // window.localStorage.setItem('userInfo', JSON.stringify(res.result))
  // window.localStorage.setItem('token', res.result.token)
  // $message.success("邮箱登录成功")

  // $router.push('/')
}
// 获取权限/路由
const getRole = async () => {
  let params = {
    roleName: loginForm.loginInput || 'admin'
  }
  const res = await getAdminRoleApi(params)
  console.log(res)
  if (res) {
    const routers = res || []
    wsCache.set('roleRouters', routers)
    push({ path: '/home' })

    // try {
    //   await permissionStore.generateRoutes('admin', routers).catch(() => {})
    //   permissionStore.getAddRouters.forEach((route) => {
    //     addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
    //   })
    //   permissionStore.setIsAddRouters(true)

    //   push({ path: redirect.value || permissionStore.addRouters[0].path })
    // } catch (e) {
    //   console.log(e)
    // }
  }
}
const emailRegister = async () => {
  // loginForm.code = loginForm.codeNumber
  // const { data: res } = await $http.post('/user/register', Qs.stringify(loginForm))
  const res = { status: 'fail' }
  if (res.status === 'fail') return // $message.success(res.msg)
  // if (timeId) timeId = null
  // $message.success("邮箱注册成功")
  // isRegister = false
  // if (timeId) {
  // countDown()
  // }
}
const phoneLoginHtttp = async () => {
  const res = { status: 'fail' }
  // const { data: res } = await $http.get('/user/phoneLogin', {
  //   params: {
  //     phoneNumber: loginForm.phoneNumber,
  //     codeNumber: loginForm.codeNumber
  //   }
  // })
  if (res.status === 'fail') return // $message.error(res.msg)

  // $message.success("登录成功")
  // localStorage.setItem('userInfo', JSON.stringify(res.result))
  // localStorage.setItem('token', res.result.token)
  // if (timeId) {
  //   countDown()
  // }
  // $router.push('/')
}
const countDown = () => {
  // isSend = true
  // let self = this
  // self.timeId = setInterval(() => {
  //   self.endTime--
  //   if (self.endTime === -1) {
  //     self.endTime = 60
  //     self.timeId = null
  //     isSend = false
  //   }
  // }, 1000)
}
const handleToRegister = () => {
  emit('to-register')
}
// ------------------------ 扫码登录
// 进入扫码登录
const getScanOperate = () => {
  console.log(`扫码登录`)
}
// 获取二维码
const getQRcode = () => {
  // $store.dispatch('getQRcode')
  // scanCodeQuery.timerCheck = setInterval(() => checkScanCode(), 1000)
}
const chooseLoginType = (index) => {
  loginTypeIndex.value = index
  Object.keys(loginForm).forEach((key) => {
    loginForm[key] = ''
  })
  if (index === 2) {
    getScanOperate()
  }
}
const scanAgainScanCode = () => {
  console.log(111)
}
// 验证输入框是否合法
const valitedInput = (str, value) => {
  // let validForm = new ValidForm()
  // if (!validForm[str](value)) {
  // isPassInput.includes(str) && isPassInput.push(str)
  // $message.error("输入格式错误")
  // } else {
  // isPassInput.includes(str) && isPassInput.splice(isPassInput.indexOf(str), 1)
  // }
}
// const checkScanCode = () => {
// 扫码成功
// if ($store.state.successShow || $store.state.overtimeShow) {
// clearInterval(timerCheck) // 扫码成功，清除定时器，不再询问服务器
// }
// $store.dispatch('checkScanCode', $store.state.uuid)
// }
// 二维码失效后，用户点击二维码重新获取二维码的事件
// const AgainScanCode = () => {
// $store.commit('AgainScanCode')
// getQRcode()
// }
</script>
<style lang="less">
.displaylogin {
  display: none;
}

.loginType {
  .active_type {
    color: white;
  }
}

.login_box {
  /* 相对定位 */
  position: relative;
  width: 100%;

  input {
    /* 清除input框自带的边框和轮廓 */
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
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

  input:focus+label,
  input:valid+label {
    top: -20px;
    color: #03e9f4;
    font-size: 12px;
  }
}

a {
  overflow: hidden;
  position: relative;
  padding: 10px 20px;
  color: #03e9f4;
  /* 取消a表现原有的下划线 */
  text-decoration: none;
  /* 同样加个过渡 */
  transition: all 0.5s;

  &:hover {
    color: #fff;
    border-radius: 5px;
    background-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
  }

  span:first-child {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    /* to right 就是往右边 下面的同理 */
    background: linear-gradient(to right, transparent, #03e9f4);
    /* 动画 名称 时长 linear是匀速运动 infinite是无限次运动 */
    animation: move1 1s linear infinite;
  }

  span:nth-child(2) {
    right: 0;
    top: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(transparent, #03e9f4);
    /* 这里多了个0.25s其实是延迟时间 */
    animation: move2 1s linear 0.25s infinite;
  }

  span:nth-child(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, transparent, #03e9f4);
    animation: move3 1s linear 0.5s infinite;
  }

  span:last-child {
    left: 0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(#03e9f4, transparent);
    animation: move4 1s linear 0.75s infinite;
  }

  span {
    position: absolute;
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

//扫码登录
.QRcode {
  width: 240px;
  height: 238px;
  position: relative;

  .QRcode_overtime {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.68);
    color: #fff;
    text-align: center;
    z-index: 2;
    font-size: 18px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      margin-top: 15px;
    }
  }

  .QRcode_success {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.68);
    color: #fff;
    text-align: center;
    z-index: 3;
    font-size: 18px;
  }

  .QRcode_img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }
}

.tips {
  margin-top: 10px;
  color: white;
}

// }
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
