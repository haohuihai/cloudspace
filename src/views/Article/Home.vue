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
          <ArticItem :articItem="articItem.list" @toPreview="toPreview"></ArticItem>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Nav, ArticItem } from './components'
import { getArticleList } from '@/api/article'
import { onMounted, ref, reactive } from 'vue'
let navBotList = ref([{
  articleName: '12321',
  id: '1'
},
{
  articleName: '收到罚单',
  id: '21'
},
{
  articleName: '啊手动阀打发',
  id: '31'
}])
let isHideNavBot = ref(false)
let page =1
let articItem = reactive({list: []})
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
  const res = await getArticleList({ page: 1 })
  articItem.list = res
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

  .mainContent {
    display: flex;
    justify-content: space-between;

    .main-left {
      width: 100%;
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
      padding: 1.3rem 0;
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
  }
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

.container {
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
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

.global-nav-bottom ul {
  display: flex;
  align-items: center;
  max-width: 1020px;
}

.global-nav-bottom {
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
