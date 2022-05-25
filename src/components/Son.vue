<template>
  <div class="Son">
    <h3>我是Son组件</h3>
    {{ sum }}
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ComponentSon",
  async setup() { //async必须要Suspense和异步组件的配合
    let sum = ref(0);
    let p = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sum });
      }, 3000);
    });
    return await p;
  },
};
</script>

<style>
.Son {
  background-color: skyblue;
  padding: 10px;
}
</style>
