<template>
  <div class="Sun">
    <h3>我是Sun组件（孙） . {{ car.name }}---{{ car.price }}</h3>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "ComponentSun",
  setup() {
    let car = inject("car");
    return { car };
  },
};
</script>

<style>
.Sun {
  background-color: orange;
  padding: 10px;
}
</style>
