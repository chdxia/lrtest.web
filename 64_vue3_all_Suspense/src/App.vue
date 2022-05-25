<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <ComponentSon />
      </template>
      <template v-slot:fallback>
        <h3>加载中......</h3>
      </template>
    </Suspense>
    
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
// import ComponentSon from "./components/Son.vue"; //静态引入
const ComponentSon = defineAsyncComponent(()=>import('./components/Son.vue')) //动态引入、异步引入

export default {
  name: "App",
  components: { ComponentSon },
};
</script>

<style>
.app {
  background-color: gray;
  padding: 10px;
}
</style>
