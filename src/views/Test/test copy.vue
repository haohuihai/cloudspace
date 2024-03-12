<template>
  <div class="lazyImage" id="lazy-image">
    <img
      class="lazy-load"
      id="image-show"
      :data-src="url"
      :key="url"
      src="@/assets/imgs/imageCover.gif"
      alt="Lazy-loaded image"
      v-for="url in urls"
    />
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'

const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
function throttle(fn, delay = 200) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
const initLazyImage = () => {
  // 获取所有需要懒加载的图像
  let imageParentDOM = document.getElementById('lazy-image')
  // 监听窗口滚动事件
  imageParentDOM.addEventListener(
    'scroll',
    throttle(() => {
      lazyLoad()
    }, 1000)
  )

  // 初始化加载一次
  lazyLoad()

  function lazyLoad() {
    const imgs = document.querySelectorAll('.lazy-load')
    if (!imgs.length) return
    imgs.forEach((img) => {
      // 如果当前要展示图片距离父盒子的高度比其父盒子的高度还小,必然是要让他展示出来,否则不用展示
      let windowHeight = imageParentDOM.clientHeight
      const rect = img.getBoundingClientRect()
      if (rect.top < windowHeight) {
        img.src = img.dataset.src
        img.classList.remove('lazy-load') // 我们是通过img的lazy-load查找所有img标签的，渲染后就删除data-src可减少forEach循环的计算成本
      }
    })
  }
}
onMounted(() => {
  initLazyImage()
})
</script>
<style scoped>
.lazyImage {
  height: 600px;
  width: 600px;
  border: 1px solid #8c8c8c;
  margin: 0 auto;
  margin-top: 100px;
  overflow-y: overlay;

  #image-show {
    vertical-align: top;
    height: 400px;
    padding: 10px;
    border-bottom: 1px solid #8c8c8c;
    width: 100%;
    transition: opacity 0.3s ease-in;
  }

  .lazy-load.loaded {
    opacity: 1;
  }
}
</style>
