<template>
  <h4>当前求和为：{{ sum }}</h4>
  <button @click="sum++">点我sum+1</button>
  <hr />
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}K</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">增长薪资</button>
</template>
<script>
import { reactive, toRefs, ref } from "vue";

export default {
  name: "UserDemo",

  setup() {
    let sum = ref(0);
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    // readonly:让一个响应式的数据变为只读的（深只读）
    // shallowreadonly:让一个响应式数据变为只读（浅只读）
    // 应用场景：不希望数据被修改时

    // person = readonly(person)
    // person = shallowReadonly
    // sum = readonly(sum)
    // sum = shallowReadonly(sum)

    return {
      person,
      ...toRefs(person),
      sum,
    };
  },
};
</script>

<style></style>
