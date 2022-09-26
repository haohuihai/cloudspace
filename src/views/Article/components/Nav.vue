<template>
  <div class="global-nav" :class="isShowNav ? 'global-top-hide' : ''">
    <a href="/">
      <img class="head-image" src="@/assets/imgs/1256748.png" alt="111" />
    </a>
    <div class="global-nav-right">
      <div class="global-top-left">
        <ul>
            <li>
              首页
            </li>
            <li>
              沸点
            </li>

            <li>
              小册
            </li>
            <li>
              活动
            </li>
          </ul>
          <ElInput
          suffix-icon="el-icon-search"
          v-model="input"
          @clear="handleClear"
          placeholder="请输入内容"
          :clearable="true"
          @change="handleChange"
          max="100"
        />
      </div>
      <div class="global-top-right">
        <ElButton type="primary" @click="btnClick">写文章</ElButton>
        <!-- <ElButton to="/publishArticle"></ElButton> -->
      </div>
              <!-- <el-dropdown
                size="medium"
                split-button
                type="primary"
                @command="handleClick"
              >
                更多菜单
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">写文章</el-dropdown-item>
                  <el-dropdown-item command="b">狮子头</el-dropdown-item>
                  <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <!-- <a href='' class="iconfont icon-caret-down"></a> -->
            <!-- <li class="loginBtn" v-if="!isLogin" @click="toLoginPage">
              登录
            </li>

            <li v-else class="avator">
              <a class="iconfont el-icon-bell notice"></a>
              <el-popover placement="bottom" width="200" trigger="click">
                <div>
                  <input id="choice_p" size="small" type="file" />
                </div>
                <div class="changepassword" @click="handleChangePWD">
                  修改密码
                </div>
                <div class="output" @click="outLogin">退出登录</div>
              </el-popover>
            </li> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ElInput, ElSkeleton, ElSkeletonItem, ElEmpty, ElButton } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'
// const { push } = useRouter()
export default defineComponent({
  name: 'Nav',
  props: {
    isLogin: {
      type: Boolean,
      require: true
    }
  },
  setup(props, { slots, expose, emit }) {
    let input = ref('')
    let isShowNav = ref(false)
    let visible = ref(false)
    let photoObj = ref('')
    let photo = ref('')
    let fileList = ref([])
    onMounted(() => {
      if (props.isLogin) {
        uploadHeadImage()
      }
    })
    const toLoginPage = () => {
      push("login")
    }
    const outLogin = () => {
      localStorage.clear()
      push("login")
    }
    const handleChangePWD = () => {}
    const uploadHeadImage = (e) => {
      let that = this
      document
        .getElementById("choice_p")
        .addEventListener("change", function (e) {
          var files = this.files
          var reader = new FileReader()
          reader.readAsDataURL(files[0])
          reader.onload = async function (e) {
            let obj = {
              base64: this.result,
              userId: selfUserInfo.userId,
            }
            let { data } = await that.$http.post("/userImg", obj)
            if (data.status === "SUCCESS") {
              ElMessage({
              message: data.msg,
              type: 'success',
            })
              that.$message.success(data.msg)
            } else {
              ElMessage.error(data.msg)
            }
          }
        })
    }
    const handleClick = (command) => {
      console.log(`e`, command)
      if (command === "a") {
        toWrite()
      } else {
        ElMessage.error("你触发了item")
      }
    }
    const toWrite = () => {
      push("publicArtic")
    }
    const handleClear = () => {
      console.log(`123`, 123)
    }
    const handleChange = () => {}
    const handleRemove = (file) => {
      console.log(file)
    }
    return {
      input,
      visible,
      photoObj,
      photo,
      fileList,
      isShowNav,
      handleClear,
      handleChange
    }
  }
})
</script>

<style lang="less">

.global-top-hide {
  transform: translate3d(0, -100%, 0);
}
.global-nav {
  display: flex;
  align-items: center;
  height: 6rem;
  transition: all 0.2s;
  transform: translateZ(0);
  background: #fff;
  color: #909090;
  z-index: 20;
  justify-content: space-between;
}
.head-image {
  width: 70px;
  height: 41px;
}
.global-nav-right ul li:nth-child(2) ul li:nth-child(1) {
  position: relative;
  display: flex;
  align-items: center;
}
.global-nav-right ul li:nth-child(2) ul li:nth-child(1) a {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}
.global-nav-right ul li:nth-child(2) ul li:nth-child(1) input {
  border: 1px solid hsla(0, 0%, 59.2%, 0.2);
  background-color: rgba(227, 231, 236, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;
  position: relative;
  color: #666;
  font-size: 1.2rem;
  width: 14rem;
  height: 2.8rem;
  padding-left: 10px;
  padding-right: 35px;
}
.global-nav-right .loginBtn {
  color: #007fff;
  background-color: #fff;
  border: 0.1rem solid #007fff;
  margin-right: 0;
  height: 32px;
  text-align: center;
  line-height: 31px;
  border-radius: 3px;
  font-size: 19px;
  width: 63px;
  letter-spacing: 2px;
}
.global-nav-right {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.global-nav-right .loginBtn:hover {
  background-color: #007fff;
  color: #fff;
}
.global-nav-right ul li:nth-child(2) ul li:nth-child(2) a {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 16px;
}
.global-nav-right .avator {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.global-nav-right .notice {
  font-size: 25px;
  margin-right: 10px;
}

.global-nav-right .global-top-left ul {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 18px;
  height: 41px;
}

.global-nav-right .global-top-left ul li {
  margin: 0 10px;
  color: rgba(140, 140, 140, 1);
}
.global-nav-right .global-top-left ul li:nth-child(1){
  color: #007fff;
}
.global-nav-right .global-top-left > ul li:nth-child(1):hover {
  color: #007fff;
}
.changepassword {
  margin-top: 10px;
  width: 70px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}
.changepassword:hover {
  opacity: 0.5;
}
.output {
  margin-top: 10px;
  width: 70px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background-color: #409eff;
  color: #fff;
  border-radius: 4px;
  text-align: center;
}
.output:hover {
  opacity: 0.5;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

li {
  cursor: pointer;
  list-style: none;
}
</style>
