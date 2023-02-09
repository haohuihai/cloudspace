<template>
  <!-- 用户名密码登录 -->
  <div class="w-350px flex flex-col bg-light-50" :style="{ height: 'fit-content' }">
    <ElTabs v-model="loginTypeIndex" class="demo-tabs">
      <ElTabPane label="账号登录" name="account">
        <ElForm
          ref="ruleFormRef"
          class="my-10px mx-auto w-90/100"
          :model="loginForm"
          :rules="rules"
        >
          <ElFormItem prop="account">
            <ElInput v-model="loginForm.account" placeholder="账号名/手机号/邮箱">
              <template #prefix>
                <Icon size="18" icon="ant-design:user-outlined" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput v-model="loginForm.password" placeholder="请输入密码">
              <template #prefix>
                <Icon size="18" icon="bx:lock" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElRow>
            <ElCol :span="12">
              <ElFormItem prop="inputCode">
                <ElInput v-model="loginForm.inputCode" placeholder="验证码">
                  <template #prefix>
                    <Icon size="18" icon="bx:image" />
                  </template>
                </ElInput>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8" :offset="2">
              <img
                class="w-40 h-30px"
                src="data:image/jpg;base64,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"
              />
            </ElCol>
          </ElRow>
          <ElRow>
            <ElCol :span="12">
              <ElFormItem class="forItemBottom" prop="savePassword">
                <ElCheckbox v-model="loginForm.savePassword" label="记住密码" size="large" />
              </ElFormItem>
            </ElCol>
            <ElCol :span="12">
              <ElFormItem class="forItemBottom" :style="{ 'text-align': 'right' }">
                <ElButton type="primary" :style="{ height: '40px' }" class="ml-1/2 h-40px" link
                  >忘记密码</ElButton
                >
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
      </ElTabPane>
      <ElTabPane label="手机登录" name="phone">
        <ElForm
          ref="rulePhoneFormRef"
          class="my-10px mx-auto w-85/100"
          :model="rulePhoneForm"
          :rules="rulesPhone"
        >
          <ElFormItem prop="phone">
            <ElInput v-model="rulePhoneForm.phone" placeholder="手机号">
              <template #prefix>
                <Icon size="18" icon="ant-design:user-outlined" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElRow>
            <ElCol :span="14">
              <ElFormItem prop="code">
                <ElInput v-model="rulePhoneForm.code" placeholder="验证码">
                  <template #prefix>
                    <Icon size="18" icon="bx:lock" />
                  </template>
                </ElInput>
              </ElFormItem>
            </ElCol>
            <ElCol :span="8" :offset="1">
              <ElButton :disabled="isSend" class="w-full" @click="handleSendNumber">
                {{ isSend ? endTime + ' s' : sendNumberTip }}</ElButton
              >
            </ElCol>
          </ElRow>
        </ElForm>
      </ElTabPane>
      <ElTabPane label="扫码登录" name="scan">
        <div class="QRcode">
          <!--扫码成功的样式-->
          <div class="QRcode_success" v-if="successShow">
            <!-- <img src="../../assets/img/login/success.png" alt="success" /> -->
            <p>扫码成功</p>
          </div>
          <!--二维码失效的样式-->
          <div class="QRcode_overtime" @click="AgainScanCode" v-if="overtimeShow">
            <p>二维码失效，点击重新获取</p>
            <!-- <img src="../../assets/img/login//reload.png" alt="reload.png" /> -->
          </div>
          <!--真正让用户扫的二维码-->
          <img class="QRcode_img" src="@/assets/imgs/scan.png" />
        </div>
        <p class="tips">{{ tipsText }}</p>
      </ElTabPane>
    </ElTabs>
    <ElButton
      v-show="loginTypeIndex !== 'scan'"
      type="primary"
      class="w-4/5 mx-auto"
      :loading="loginLoding"
      @click="submitForm"
      >登录</ElButton
    >

    <ElDivider content-position="center">其他方式登录</ElDivider>
    <div class="flex justify-evenly enter-x signWay">
      <a @click="onThirdLogin('github')" title="github">
        <Icon size="20" icon="bxl:github" />
      </a>
      <a @click="onThirdLogin('wechat_enterprise')" title="企业微信">
        <Icon size="20" icon="fa6-brands:weixin" />
      </a>
      <a @click="onThirdLogin('dingtalk')" title="钉钉">
        <Icon size="20" icon="ri:dingding-fill" />
      </a>
      <a @click="onThirdLogin('wechat_open')" title="微信">
        <Icon size="20" icon="fa6-brands:weixin" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loginApi, getTestRoleApi, getAdminRoleApi } from '@/api/login'
import { reactive, ref, watch, unref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
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
  ElMessage
} from 'element-plus'
import { usePermissionStore } from '@/stores/modules/permission'
import { useAppStore } from '@/stores/modules/app'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'

interface ScanSchema {
  socket?: string
  timerCheck?: string
  activeName?: string
}

interface LoginFormType {
  account: string
  password: string
  inputCode: string
  savePassword: boolean
}

interface RulePhoneType {
  phone: string
  code: string
}
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const { t } = useI18n()
const { wsCache } = useCache()
const { currentRoute, push } = useRouter()

const emit = defineEmits(['to-register'])
const successShow = ref(false)
const overtimeShow = ref(false)
const tipsText = ref('等待用户扫码')
const isPassInput = reactive<string[]>([])

const ruleFormRef = ref<FormInstance>()
const rulePhoneFormRef = ref<FormInstance>()

const loginForm = reactive<LoginFormType>({
  account: '',
  password: '',
  inputCode: '',
  savePassword: false
})
const rulePhoneForm = reactive<RulePhoneType>({
  phone: '',
  code: ''
})
const rulesPhone = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: '请输入账户/手机号/密码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
})
const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: '请输入账户/手机号/密码',
      trigger: 'blur'
    }
  ],
  inputCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const scanCodeQuery = reactive<ScanSchema>({
  socket: '',
  timerCheck: '',
  activeName: 'ScanCode'
})

const sendNumberTip = ref<string>('发送验证码')
const isSend = ref(false)
const endTime = ref(60)
const timeId = ref<any>(null)

const redirect = ref<string>('')
// const loginTypeList = reactive<string[]>(['邮箱', '手机', '扫码'])
const loginTypeIndex = ref<string>('account') // account 邮箱，phone  手机  scan  扫码

let loginLoding = ref<boolean>(false)

// 监听当前路由变化
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
  let regExp = new RegExp('^1[3578]\\d{9}$')
  // 校验手机号是否合法
  let isRight = !isSend.value && regExp.test(rulePhoneForm.phone)

  if (isRight) {
    if (loginTypeIndex.value === 'phone') {
      // const { data: res } = await $http.post('/user/code', Qs.stringify(loginForm))
      // if (res.status === 'fail') return // $message.success(res.msg)
      // $message.success("验证码发送成功")
      countDown()
      // 手机登录
    } else {
      // const { data: res } = await $http.get('/user/sendSMS', {
      // params: {
      // phoneNumber: loginForm.phoneNumber,
      // inputCode: loginForm.inputCode
      // }
      // })
      // if (res.status === 'fail') return // $message.success(res.msg)
      // $message.success("验证码发送成功")
      // countDown()
    }
  } else {
    ElMessage.error('请输入正确的手机格式')
  }
}
const submitForm = async () => {
  console.log(unref(loginTypeIndex))
  if (unref(loginTypeIndex) === 'account') {
    let formEl = ruleFormRef.value
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        loginLoding.value = true
        accountLoginHttp()
        // console.log('账号密码!', loginForm)
      } else {
        console.log('error submit!', fields)
      }
    })
  } else if (unref(loginTypeIndex) === 'phone') {
    let formEl = rulePhoneFormRef.value
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        // phoneLoginHtttp()
        console.log('手机登录!', loginForm)
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

// 第三方登录
function onThirdLogin(type) {
  // thirdModalRef.value.onThirdLogin(type);
}

const accountLoginHttp = async () => {
  // await loginApi(params);
  // const { data: res } = await $http.post('/user/login1', Qs.stringify(loginForm))
  let params = {
    username: loginForm.account || 'admin',
    password: loginForm.password || 'admin'
  }
  try {
    const res = await loginApi(params)
    console.log('res', res)
    loginLoding.value = false
    if (res) {
      wsCache.set(appStore.getUserInfo, res)
      // router.push()
      getRole()
    }
  } finally {
    // loading.value = false
  }
}
// 获取权限/路由
const getRole = async () => {
  let params = {
    roleName: loginForm.account || 'admin'
  }
  const res = await getAdminRoleApi(params)
  if (res) {
    const routers = res || []
    wsCache.set('roleRouters', routers)
    push({ path: '/home' })
    loginLoding.value = false
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
  // loginForm.code = loginForm.inputCode
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
  //     inputCode: loginForm.inputCode
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
  isSend.value = true
  timeId.value = setInterval(() => {
    endTime.value--
    if (endTime.value === -1) {
      endTime.value = 60
      timeId.value = null
      isSend.value = false
    }
  }, 1000)
}

// 注册
const handleToRegister = () => {
  emit('to-register')
}
// ------------------------ 扫码登录

// 获取二维码
const getQRcode = () => {
  // $store.dispatch('getQRcode')
  // scanCodeQuery.timerCheck = setInterval(() => checkScanCode(), 1000)
}

const scanAgainScanCode = () => {
  console.log(111)
}
// 验证输入框是否合法
const valitedInput = (str, value) => {
  console.log('校验')
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
const AgainScanCode = () => {
  console.log('二维码失效')
  // $store.commit('AgainScanCode')
  // getQRcode()
}
</script>
<style lang="less">
// @prefix-cls: ~'@{namespace}-tabs__nav';

// .@{prefix-cls} {
//   transform: translateX(-50%);
//   left: 50%;
// }
.forItemBottom {
  margin-bottom: 0px !important;
}

.el-divider__text {
  font-size: 12px;
  color: rgb(133, 133, 133);
}

.el-tabs__nav-wrap::after {
  display: none;
}

.el-tabs__nav {
  transform: translateX(-50%) !important;
  left: 50%;
}

.displaylogin {
  display: none;
}

.signWay {
  a {
    height: 25px;
    border-radius: 50%;
    color: #888;
    font-size: 20px;
  }

  a:hover {
    color: #409eff;
  }
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

  input:focus + label,
  input:valid + label {
    top: -20px;
    color: #03e9f4;
    font-size: 12px;
  }
}

// a {
//   overflow: hidden;
//   position: relative;
//   padding: 10px 20px;
//   color: #03e9f4;
//   /* 取消a表现原有的下划线 */
//   text-decoration: none;
//   /* 同样加个过渡 */
//   transition: all 0.5s;

//   &:hover {
//     color: #fff;
//     border-radius: 5px;
//     background-color: #03e9f4;
//     box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
//   }

//   span:first-child {
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 2px;
//     /* to right 就是往右边 下面的同理 */
//     background: linear-gradient(to right, transparent, #03e9f4);
//     /* 动画 名称 时长 linear是匀速运动 infinite是无限次运动 */
//     animation: move1 1s linear infinite;
//   }

//   span:nth-child(2) {
//     right: 0;
//     top: -100%;
//     width: 2px;
//     height: 100%;
//     background: linear-gradient(transparent, #03e9f4);
//     /* 这里多了个0.25s其实是延迟时间 */
//     animation: move2 1s linear 0.25s infinite;
//   }

//   span:nth-child(3) {
//     right: -100%;
//     bottom: 0;
//     width: 100%;
//     height: 2px;
//     background: linear-gradient(to left, transparent, #03e9f4);
//     animation: move3 1s linear 0.5s infinite;
//   }

//   span:last-child {
//     left: 0;
//     bottom: -100%;
//     width: 2px;
//     height: 100%;
//     background: linear-gradient(#03e9f4, transparent);
//     animation: move4 1s linear 0.75s infinite;
//   }

//   span {
//     position: absolute;
//   }
// }

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
  margin: 0 auto;

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
  color: #858585;
  text-align: center;
  font-size: 13px;
  margin: 0;
  padding: 0;
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
