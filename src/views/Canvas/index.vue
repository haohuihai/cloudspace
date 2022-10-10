<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer>
        <v-circle :config="configCircle"></v-circle>
      </v-layer>
    </v-stage>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const windowW = ref(window.innerWidth);
    const windowH = ref(window.innerHeight);

    let configKonva = reactive({
      width: windowW.value,
      height: windowH.value
    })
    let configCircle = reactive({
      x: 100,
      y: 100,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4
    })
    return {
      configKonva,
      configCircle
    }
  }
})
</script>
