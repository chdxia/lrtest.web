<template>
  <h1>我是App组件</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>性别：{{ sex }}</h2>
  <button @click="sayHello">说话(Vue3所配置的sayHello)</button>
  <br />
  <br />
  <button @click="sayWelcome">说话(Vue2所配置的sayWelcome)</button>
  <br />
  <br />
  <button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
  <br />
  <br />
  <button @click="test1">测试一下在Vue3的配置中去读取Vue2中的数据、方法,重名Vue3优先</button>
</template>

<script>
//import { h } from "vue";

export default {
  name: "App",

  data() {
    return {
      sex: "男",
    };
  },
  methods: {
    sayWelcome() {
      alert("欢迎你！！！");
    },
    test1() {
      console.log(this.sex, this.name, this.age, this.sayHello);
    },
  },

  //此处只是测试一下setup，暂时不考虑响应式的问题
  setup() {
    //数据
    let name = "chdxia";
    let age = 18;

    //方法
    function sayHello() {
      alert(`我是${name}，我${age}岁了，你好啊！`);
    }
    function test2() {
      console.log(name, age, this.sex, this.sayWelcome);
    }

    return {
      name,
      age,
      sayHello,
      test2,
    };

    //返回一个函数（渲染函数）
    //return ()=>{return h('h1', 'chdxia')}
  },
};
</script>

<style></style>
