<template>
  <h1>我是App组件</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h3>工作种类：{{ job.type }}</h3>
  <h3>工作薪水：{{ job.salary }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    //数据
    let name = ref("chdxia");
    let age = ref(18);
    let job = ref({
      type: "前端工程师",
      salary: "30K",
    });

    //方法
    function changeInfo() {
      name.value = "李四";
      age.value = 48;
      job.value.type = "UI设计师";
      job.value.salary = "60K";
    }

    //返回一个对象
    return {
      name,
      age,
      changeInfo,
      job,
    };
  },
};
</script>

<style></style>
