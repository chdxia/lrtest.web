<template>
  <div class="app">
    <h3>我是App组件</h3>
    <ComponentSon />
  </div>
</template>

<script>
import ComponentSon from "./components/Son.vue";

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
