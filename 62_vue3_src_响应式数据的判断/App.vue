<template>
    <h3>我是App组件</h3>
</template>

<script>
import { ref, reactive, toRefs, readonly, isProxy, isReactive, isRef, isReadonly } from "vue";

export default {
  name: "App",
  setup() {
    let car = reactive({ name: "奔驰", price: "40W" });
    let sum = ref(0)
    let car2 = readonly(car)

    console.log(isRef(sum))
    console.log(isReactive(car))
    console.log(isReadonly(car2))
    console.log(isProxy(car))
    console.log(isProxy(car2))
    // isRef：检查一个值是否为一个ref对象
    // isReactive：检查一个对象是否是由reactive 创建的响应式代理
    // isReadonly：检查一个对象是否是由readonly 创建的只读代理
    // isProxy：：检查一个对象是否是由reactive 或者readonly方法创建的代理

    return { ...toRefs(car) };
  },
};
</script>

<style>
.app {
  background-color: gray;
  padding: 10px;
}
</style>
