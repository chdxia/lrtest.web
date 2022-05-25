<template>
  <div class="Sun">
    <h3>我是Sun组件</h3>
    <MyDialog/>
  </div>
</template>

<script>
import MyDialog from "./Dialog.vue";

export default {
  name: "ComponentSun",
  components:{MyDialog},
};
</script>

<style>
.Sun {
  background-color: orange;
  padding: 10px;
}
</style>
