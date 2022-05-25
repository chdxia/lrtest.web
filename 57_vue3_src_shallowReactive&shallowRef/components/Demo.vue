<template>
<h4>当前的x值是：{{x}}</h4>
<button @click="x++">点我x+1</button>
<hr>
  <h4>{{ person }}</h4>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">增长薪资</button>
</template>
<script>
import { ref, reactive, toRefs } from "vue";

export default {
  name: "UserDemo",

  setup() {
    //shallowReactive：浅层次的reactive，只考虑第一层数据的响应式
    // let person = shallowReactive({
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    //shallowRef只处理基本数据类型的响应式，不去处理对象类型的响应式
    /* let x = shallowRef({
      y:0
    }); */
    let x = ref(0);

    //如果有一个对象数据，就够比较深，但变化时只是外层属性变化 ===> shallowReactive
    //如果有一个对象数据，后续功能不会需修改对象中的属性，而是生成新的对象来替换 ===> shallowRef

    return {
      person,
      ...toRefs(person),
      x,
    };
  },
};
</script>

<style></style>
