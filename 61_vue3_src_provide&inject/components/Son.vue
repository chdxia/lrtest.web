<template>
  <div class="Son">
    <h3>我是Son组件（子）</h3>
    <ComponentSun/>
  </div>
</template>

<script>
import ComponentSun from './Sun.vue'

export default {
  name: "ComponentSon",
  components:{ComponentSun}
};
</script>

<style>
.Son {
  background-color: skyblue;
  padding: 10px;
}
</style>