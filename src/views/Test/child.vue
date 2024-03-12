<template>
  <div id="container">
    <video controls ref="videoRef" width="450">
      <source
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
      />
      <a href="/media/cc0-videos/flower.mp4">MP4</a>
      video.
    </video>
  </div>
</template>
<script>
  import { defineComponent, onMounted, ref } from 'vue';

  export default defineComponent({
    setup() {
    const videoRef = ref(null)
      onMounted(() => {
        const condom = document.getElementById('container');
        console.log('condom', condom);
        console.log('this.refs.videoRef', videoRef.value);
      });
    },
  });
</script>
