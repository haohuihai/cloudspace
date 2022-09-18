<template>
  <div class="container page-component__scroll">
    <!-- <canvas id="canvas"></canvas> -->
    <Nav :isLogin="isLogin" :selfUserInfo="selfUserInfo"></Nav>
    <div
      class="global-nav-bottom"
      :class="isShowNav ? 'global-nav-bottom-hide' : ''"
    >
      <ul>
        <li
          :class="item.active ? 'changeActive' : ''"
          v-for="(item, index) in navBotList"
          :key="index"
          @click="chooseItem(index)"
        >
          {{ item.articleName }}
        </li>
      </ul>
    </div>
    <div class="mainContent">
      <div class="main-left">
        <div class="fullter">
          <ul>
            <li
              :class="currentIndex == index ? 'active' : ''"
              @click="switchHotType(index)"
              v-for="(item, index) in maxType"
              :key="index"
            >
              {{ item.type }}
            </li>
          </ul>
        </div>
        <keep-alive>
          <ArticItem :articItem="articItem" @toPreview="toPreview"></ArticItem>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Nav, ArticItem } from './components'
import { getArticleList } from '@/api/article'
import { onMounted, ref } from 'vue'
let navBotList = ref([])
let isHideNavBot = ref(false)
let page =1
let articItem = []
let isLogin = ref(false)
let isShowNav = ref(false)
let currentIndex = ref(0)
let selfUserInfo = ref({})
let maxType = ref([
  {
    type: "热门",
    id: 1,
  },
  {
    type: "最新",
    id: 2,
  },
  {
    type: "热榜",
    id: 3,
  },
])
onMounted( async () => {
  const res = getArticleList({page: 1})
  console.log('res', res)
})
const chooseItem = () => {
  
}
const switchHotType = () => {

}
const toPreview = () => {}
</script>

<style scoped lang="less">
/**
全局背景颜色，
顶部字体
*/
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  z-index: -1;
  /* background-color: red; */
  // background: url("../../assets/img/bg1xingkong.jpg") 0 0 / cover no-repeat;
}
.container {
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
  margin-top: 11rem;

  .mainContent {
    display: flex;
    justify-content: space-between;

    .main-left {
      width: 760px;
      border-radius: 2px;
      // background-color: #fff;
      // opacity: 0.8;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .fullter .active {
      color: #007fff;
    }
    .fullter ul {
      display: flex;
      padding: 1.3rem 1rem;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
      li {
        padding: 0 1rem;
        cursor: pointer;
        font-size: 1.27rem;
        color: #909090;
        border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
      }
      li:last-child {
        border-right: none;
      }
    }
    .main-right {
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      margin-bottom: 1.3rem;
      font-size: 1.16rem;
      line-height: 1.29;
      color: #333;
      visibility: visible;
      width: 24.5rem;

      .login {
        display: flex;
        flex-direction: column;
        padding: 1.333rem;
        background-color: #fff;
        margin-bottom: 1.3rem;
        .login-title {
          margin-bottom: 0.5rem;
          font-size: 1.167rem;
          color: #2e3135;
          font-weight: 600;
        }
        .login-desc {
          margin-bottom: 0.5rem;
          font-size: 1.167rem;
          color: #2e3135;
        }

        .login-input {
          display: flex;
          padding: 0 10px;
          border: 1px solid #d9d9d9;
          display: flex;
          border-radius: 2px;
          justify-content: center;
          align-items: center;
          background-color: #fbfbfb;
          position: relative;
          margin-bottom: 0.833rem;

          div {
            width: 14%;
            border-right: 1px solid #d9d9d9;
          }

          input {
            padding: 0.7rem 0.6rem;
            font-size: 1.167rem;
            background-color: #fbfbfb;
            border-radius: 2px;
            outline: none;
            width: 86%;
            border: none;
            box-sizing: border-box;
          }
        }

        .login-code {
          display: flex;
          position: relative;
          align-items: center;
          margin-bottom: 0.833rem;
          .stopSendSty {
            color: #909090;
            cursor: default;
          }
          .isSendSty {
            color: #007fff;
            cursor: pointer;
          }
          input {
            padding: 0.7rem 0.6rem;
            width: 100%;
            font-size: 1.167rem;
            background-color: #fbfbfb;
            border: 1px solid #f4f4f4;
            border-radius: 2px;
            outline: none;
            box-sizing: border-box;
          }
          div {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            font-size: 1.167rem;
            color: #007fff;
            line-height: 1;
            vertical-align: middle;
            background-color: transparent;
            padding: 0.9rem 1.3rem;
          }
        }
        .login-btn {
          padding: 0.7rem 0;
          width: 100%;
          font-size: 1.167rem;
          background-color: #007fff;
          color: #ffffff;
          text-align: center;
          border-radius: 0.3rem;

          cursor: pointer;
        }

        .login-btn:hover {
          background: #0e39ad;
        }
        .login-bot {
          margin-top: 1.667rem;
          font-size: 1.167rem;
          line-height: 1.5;
          color: #767676;
          span {
            color: #007fff;
            cursor: pointer;
          }
        }
      }
      .bannerImg {
        width: 100%;
        height: 200px;
        margin-bottom: 1.3rem;
      }
    }
  }
}

.otherSource {
  margin-top: 1.5rem;
  background-color: #fff;
  .sourceItem {
    display: flex;
    align-items: center;
    padding: 1.3rem;
    height: 100%;
    cursor: pointer;
    &:hover {
      background-color: hsla(0, 0%, 84.7%, 0.1);
    }
    img {
      width: 3rem;
      margin-right: 0.8rem;
    }
    span {
      position: relative;
      font-size: 1.3rem;
      line-height: 1;
      color: #333;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 350;
  background: rgba(0, 0, 0, 0.1);
}
.editor {
  line-height: normal !important;
  min-height: calc(100vh - 95px);
}
.containerBox {
  width: 100vw;
}
.lineHeight80 {
  margin: 4px 0;
  height: 40px;
  line-height: 40px;
  padding: 4px 17px;
  background-color: white;
  z-index: 200;
}
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-button {
    padding: 6px 10px;
    margin: 0;
  }
}
.el-input__inner {
  border: none;
  font-size: 17px;
}
.ql-editor {
  overflow: scroll !important;
  // margin-bottom: -50px;
  // margin-right: -50px;
  padding: 0 !important;
  // padding-bottom: 50px;
  height: 100%;
  outline: none;
  position: relative;
  background-color: #f8f9fa;
  margin: 0 !important;
}
// .ql-container.ql-snow {
//   height: calc(100vh - 82px);
// }

.preveireContent {
  width: 50%;
  border-left: solid #f8f9fa;
}
.ql-toolbar.ql-snow {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #fafbfc;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}

// 让所有颜色继承body的颜色
.v-note-wrapper {
  height: 100vh;
  background-color: unset !important;
  /deep/ .v-note-panel {
    background-color: unset !important;
    color: unset !important;
    // 下面的是编辑区的颜色
    .content-input-wrapper {
      min-height: 100%;
      background-color: unset !important;
      color: unset !important;
      .auto-textarea-wrapper {
        background-color: unset !important;
        color: unset !important;
        padding: 0;
        textarea {
          background: unset;
          color: unset;
        }
      }
    }
    // 下面是预览区颜色
    .v-note-show {
      .v-show-content {
        background-color: unset !important;
      }
    }
  }
}

.el-form-item {
  margin-bottom: 0;
}
.el-dialog__body {
  padding-top: 0;
}
.el-form-item__label {
  width: 80px !important;
}
.el-form-item__content {
  margin-left: 80px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 80px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 80px;
  display: block;
}

.validatorSty {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
#captcha {
  margin: 0 auto;
  margin-top: 260px;
  --width: 400px;
  --height: 260px;
  --puzzle-width: 80px;
  --puzzle-height: 80px;
  --offset-left: var(--width) * -1;
  --moved: 0px;

  display: block;
  width: var(--width);
  height: var(--height);
  border-radius: 4px;
  background-image: url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80);
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

#captcha::before,
#captcha::after {
  position: absolute;
  content: "";
  display: block;
  width: inherit;
  height: inherit;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;

  clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
  -webkit-clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
}

#captcha::after {
  transform: translatex(
    clamp(
      calc(var(--width) * -1),
      calc((var(--width) * -1) + var(--moved)),
      calc(var(--puzzle-width))
    )
  );
  transition: 0.25s all ease-in-out;
}

#captcha:active::after {
  transition: none;
}

#captcha::before {
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: multiply;
}

#handle {
  width: calc(var(--width) + var(--puzzle-width) * 2);
  height: 30px;
  border-radius: 18px;
  background-color: #eee;
  position: absolute;
  bottom: -50px;
  left: calc(var(--puzzle-width) * 2 * -1);
  box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 0.2);
  border: 3px solid #ccc;
}

#handle span {
  display: block;
  width: var(--puzzle-width);
  height: inherit;
  border-radius: inherit;
  background-color: #fff;
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.25),
    0px 2px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  cursor: move;
  transform: translatex(
    clamp(0px, var(--moved), calc(var(--width) + var(--puzzle-width)))
  );

  transition: 0.25s all ease-in-out;
}

#captcha:active #handle span {
  transition: none;
}

#captcha.passed::before,
#captcha.passed::after,
#captcha.passed #handle {
  opacity: 0;
}
.container {
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
  margin-top: 11rem;
}

.global-nav-bottom ul li:hover,
.container .mainContent .fullter ul li:hover {
  color: #007fff;
}
.global-nav-bottom {
  background: #fff;
  color: #909090;
  z-index: 1600;
}
.global-nav-bottom-hide {
  transform: translate3d(0, -6rem, 0) !important;
}

.global-nav-bottom ul {
  display: flex;
  align-items: center;
  max-width: 1020px;
  margin: 0 auto;
}
.changeActive {
  color: #007fff !important;
}

.global-nav-bottom {
  position: fixed;
  top: 6rem;
  width: 90rem;
  border-top: 1px solid #f1f1f1;
  height: 4rem;
  line-height: 4rem;
  transition: all 0.2s;
  transform: translateZ(0);
}
/* .global-nav-bottom ul li:first-child{
    padding-left: 0;
    color: #007fff;
} */
.global-nav-bottom ul li {
  height: 100%;
  flex-shrink: 0;
  font-size: 1.36rem;
  color: #71777c;
  padding: 0 1rem;
}
@media (max-width: 1090px) {
  /* .global-nav,.mainContent{
        width: 100%;
        margin: 0 auto;
    }
    .container .mainContent .main-left{
        width: 100%;
        margin-right: 0;
    } */
  .container .mainContent .main-left {
    width: 84rem !important;
    margin: 0 auto;
  }
  .container .mainContent .main-right {
    display: none;
  }
}
@media screen and (min-width: 1090) {
  .container .mainContent .main-left {
    width: 710px;
    margin-right: 0;
  }
}

</style>
