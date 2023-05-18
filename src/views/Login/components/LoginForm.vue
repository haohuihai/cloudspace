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
              <img @click="getImageCode" class="w-40 h-30px" :src="imageCodeSvg" />
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
          <div class="QRcode_success" v-if="isScanCodeSuccess">
            <img src="@/assets/login/success.png" alt="成功" />
            <p>扫码成功</p>
          </div>
          <!--二维码失效的样式-->
          <div class="QRcode_overtime" @click="AgainScanCode" v-if="overtimeShow">
            <p>二维码失效，点击重新获取</p>
            <img src="@/assets/login/reload.png" alt="失效" />
          </div>
          <!--真正让用户扫的二维码-->
          <img class="QRcode_img" :src="QRImage" v-if="QRImage" />
          <img class="QRcode_img" src="@/assets/imgs/login_loading.gif" v-else />
        </div>
        <p class="tips" v-if="isScanCodeSuccess">扫码成功，请在手机上确认</p>
        <p class="tips" v-else-if="overtimeShow">二维码已失效，请重新获取</p>
        <p class="tips" v-else-if="QRImage">等待用户扫码</p>
        <p class="tips" v-else>正在加载</p>
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
import {
  loginApi,
  getTestRoleApi,
  getAdminRoleApi,
  getPhoneCode,
  phoneLoginApi,
  getImageCodeApi,
  getImageQRimage
} from '@/api/login'
import { reactive, ref, watch, unref, onMounted } from 'vue'
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
import { useLoginWithout, setNewCode, getCode } from '@/stores/modules/login'
import { useI18n } from '@/hooks/web/useI18n'
import { useCache } from '@/hooks/web/useCache'
import { computed } from 'vue'

interface ScanSchema {
  socket?: string
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
const loginStore = useLoginWithout()
const permissionStore = usePermissionStore()
const { t } = useI18n()
const { wsCache } = useCache()
const { currentRoute, push } = useRouter()

const emit = defineEmits(['to-register'])
const successShow = ref(false)

const ruleFormRef = ref<FormInstance>()
const rulePhoneFormRef = ref<FormInstance>()
const imageCodeSvg = ref<any>(null)

const loginForm = reactive<LoginFormType>({
  account: 'admin',
  password: 'admin',
  inputCode: '',
  savePassword: false
})
const rulePhoneForm = reactive<RulePhoneType>({
  phone: '17602220823',
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
let timerCheck = ref(null)
const scanCodeQuery = reactive<ScanSchema>({
  socket: '',
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
onMounted(() => {
  getImageCode()
  // 监听是否记住密码
  if (wsCache.get(appStore.userPassword)) {
    var pwd = GetCookie(usr)
    loginForm.password = wsCache.get(appStore.userPassword)
  }
})
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
const randomString = (e) => {
  e = e || 32
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) {
    n += t.charAt(Math.floor(Math.random() * a))
  }
  return n
}
function randomNum(n) {
  var res = ''
  for (var i = 0; i < n; i++) {
    res += Math.floor(Math.random() * 10)
  }
  return res
}
// 获取图像验证吗
const getImageCode = async () => {
  let code = randomString(4)
  loginStore.setNewCode(code)
  const result = await getImageQRimage({
    code
  })
  console.log('result', result)

  imageCodeSvg.value = result
}

// 发送验证吗
const handleSendNumber = async () => {
  let regExp = new RegExp('^1[3578]\\d{9}$')
  // 校验手机号是否合法
  let isRight = !isSend.value && regExp.test(rulePhoneForm.phone)

  if (isRight) {
    if (loginTypeIndex.value === 'phone') {
      countDown()
      let phoneCode = randomNum(4)

      const result = await getPhoneCode({
        phoneNumber: rulePhoneForm.phone,
        phoneCode
      })
      loginStore.setPhoneCode(result)
      ElMessage.success(`验证码为：${result}`)
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

// 登录
const submitForm = async () => {
  console.log(loginStore.getCode)

  if (unref(loginTypeIndex) === 'account') {
    if (loginForm.inputCode.toLowerCase() !== loginStore.getCode.toLowerCase()) {
      ElMessage.error('验证码输入错误')
      return
    }
    let formEl = ruleFormRef.value

    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        loginLoding.value = true
        accountLoginHttp()
      } else {
        console.log('error submit!', fields)
      }
    })
  } else if (unref(loginTypeIndex) === 'phone') {
    if (loginStore.getPhoneCode != rulePhoneForm.code) {
      ElMessage.error('手机验证码输入错误')
      return
    }
    let formEl = rulePhoneFormRef.value
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        phoneLogin()
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

// 第三方登录
function onThirdLogin(type) {
  ElMessage.info('功能正在开发中...')
}

const accountLoginHttp = async () => {
  let params = {
    username: loginForm.account || 'admin',
    password: loginForm.password || 'admin',
    validate: loginForm.inputCode
  }
  try {
    const res = await loginApi(params)
    if (res) {
      if (loginForm.savePassword) {
        // var expdate = new Date()
        // expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000))
        //将用户名和密码写入到Cookie
        // SetCookie(loginForm.account, loginForm.password, expdate)
      }
      wsCache.set(appStore.getUserInfo, res)
      getRole()
    }
  } finally {
    loginLoding.value = false
  }
}
//写入到Cookie
function SetCookie(name, value, expires) {
  var argv = SetCookie.arguments
  //本例中length = 3
  var argc = SetCookie.arguments.length
  var expires = argc > 2 ? argv[2] : null
  var path = argc > 3 ? argv[3] : null
  var domain = argc > 4 ? argv[4] : null
  var secure = argc > 5 ? argv[5] : false
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expires == null ? '' : '; expires=' + expires.toGMTString()) +
    (path == null ? '' : '; path=' + path) +
    (domain == null ? '' : '; domain=' + domain) +
    (secure == true ? '; secure' : '')
}
//取Cookie的值
function GetCookie(name) {
  var arg = name + '='
  var alen = arg.length
  var clen = document.cookie.length
  var i = 0
  while (i < clen) {
    var j = i + alen
    //alert(j);
    if (document.cookie.substring(i, j) == arg) return getCookieVal(j)
    i = document.cookie.indexOf(' ', i) + 1
    if (i == 0) break
  }
  return null
}
function getCookieVal(offset) {
  var endstr = document.cookie.indexOf(';', offset)
  if (endstr == -1) endstr = document.cookie.length
  return unescape(document.cookie.substring(offset, endstr))
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
    push({ path: '/dashboard' })
  }
}

// 邮箱注册
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
const phoneLogin = async () => {
  const result = await phoneLoginApi({
    loginInput: rulePhoneForm.phone,
    type: 'phone'
  })
  console.log(result)

  if (result.code !== 200) {
    ElMessage.error(result.message)
    return
  }
  wsCache.set(appStore.getUserInfo, result)
  getRole()
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

watch(loginTypeIndex, (value) => {
  console.log(value)
  if (value === 'scan') {
    getQRcode()
  }
})
const QRImage = computed(() => {
  return loginStore.getQRimage
})

const isScanCodeSuccess = computed(() => {
  return loginStore.getCodeStatus
})
// 注册功能
const handleToRegister = () => {
  emit('to-register')
}
// ------------------------ 扫码登录

// 获取二维码
const getQRcode = () => {
  loginStore.httpQRcode()
  // 轮询检查二维码是否失效
  // timerCheck.value = setInterval(() => checkScanCode(), 1000)
}

const scanAgainScanCode = () => {
  console.log(111)
}

// 检查二维码的状态
const checkScanCode = () => {
  // 扫码成功
  // if ($store.state.successShow || $store.state.overtimeShow) {
  //   clearInterval(timerCheck.value) // 扫码成功，清除定时器，不再询问服务器
  // }
  console.log('检查中')
  if (1) {
    clearInterval(timerCheck.value)
  }
  loginStore.checkScanStatus(loginStore.QRId)
}

// 二维码是否超时
const overtimeShow = computed(() => {
  return loginStore.getCodeOvertime
})
// 二维码失效后，用户点击二维码重新获取二维码的事件
const AgainScanCode = () => {
  loginStore.resetQRcode()
  getQRcode()
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

    img {
      width: 40px;
      height: 40px;
    }
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
  margin-top: 10px;
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
