<!-- <template>
  <div class="login_body">
    <div class="login">
      <div class="loginType">
        <span
          :class="{ active_type: loginTypeIndex === index }"
          @click="chooseLoginType(index)"
          v-for="(item, index) in loginTypeList"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <template v-if="loginTypeIndex !== 2">
        <div class="login_box" v-if="loginTypeIndex === 0">
          <input type="text" required v-model="loginForm.loginInput" /><label>邮箱</label>
        </div>
        <div class="login_box" v-if="loginTypeIndex === 1">
          <input
            type="text"
            required
            @blur="valitedInput('isPhonenumber', loginForm.phoneNumber)"
            v-model="loginForm.phoneNumber"
          /><label>手机</label>
        </div>
        <div class="login_box">
          <input
            type="text"
            required
            @blur="valitedInput('nickname', loginForm.nickname)"
            v-model="loginForm.nickname"
          /><label>昵称</label>
        </div>
        <div class="login_box" v-if="loginTypeIndex === 0">
          <input
            type="password"
            @blur="valitedInput('isPassword', loginForm.password)"
            v-model="loginForm.password"
            required="required"
          />
          <label>密码</label>
        </div>
        <div class="login_box lastInput">
          <input type="password" v-model="loginForm.codeNumber" required="required" /><label
            >验证码</label
          >
          <span class="sendNumber" @click="handleSendNumber">{{
            isSend ? endTime + 's' : sendNumberTip
          }}</span>
        </div>

        <a href="javascript:void(0)" @click="handleLogin">
          注册
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </template>

      <template v-else>
        <div class="QRcode">
          <div class="QRcode_success" v-if="successShow">
            <img src="../../assets/img/login/success.png" alt="success" />
            <p>扫码成功</p>
          </div>
          <div class="QRcode_overtime" @click="scanAgainScanCode" v-if="overtimeShow">
            <p>二维码失效，点击重新获取</p>
            <img src="../../assets/img/login/reload.png" alt="reload.png" />
          </div>
          <img class="QRcode_img" :src="QRcode" />
        </div>
        <p class="tips">{{ tipsText }}</p>
      </template>

      <div class="bottomDesc" v-if="loginTypeIndex === 0">
        <span class="toregister" @click="handleToRegister">
          {{ isRegister ? '去登录' : '去注册' }}
        </span>
        <span class="forgetPassword">忘记密码</span>
      </div>
    </div>
  </div>
</template> -->
