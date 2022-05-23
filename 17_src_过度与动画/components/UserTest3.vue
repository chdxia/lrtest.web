<template>
  <div>
      <button @click="isShow = !isShow">显示/隐藏</button>
      <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__jello"
        leave-active-class="animate__rotateOut"
      >
        <h1 v-show="!isShow" key="1">你好啊！</h1>
        <h1 v-show="isShow" key="2">chdxia</h1>
      </transition-group>
  </div>
</template>

<script>
import 'animate.css'

export default {
    name: 'userTest3',
    data() {
        return {
            isShow: true
        }
    },
}
</script>

<style scoped>
h1{
    background-color: orange;
}
</style>