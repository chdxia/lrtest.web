<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <button @click="test">测试触发一下Demo组件的Hello事件</button>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "UserDemo",
  props: ["msg", "school"],
  emits: ["hello"],
  /* beforeCreate() {
    console.log("---beforeCreate---");
  }, */
  setup(props, context) {
    // console.log("---setup---", props);
    console.log("---setup---", context);
    // console.log("---setup---", context.attrs); //相当于vue2中的$attrs
    // console.log("---setup---", context.emit); //触发自定义事件的
    console.log("---setup---", context.slots); //插槽
    let person = reactive({
      name: "chdxia",
      age: 18,
    });

    function test() {
      context.emit("hello", 666);
    }

    return {
      person,
      test,
    };
  },
};
</script>

<style></style>
