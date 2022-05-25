<template>
  <h4>当前求和为：{{ sum }}</h4>
  <button @click="sum++">点我sum+1</button>
  <hr />
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>薪资：{{ job.j1.salary }}K</h2>
  <h2 v-show="person.car">座驾信息：{{ person.car }}</h2>
  <button @click="name += '~'">修改姓名</button>
  <button @click="age++">增长年龄</button>
  <button @click="job.j1.salary++">增长薪资</button>
  <br>
  <button @click="showRawPerson">输出最原始的person</button>
  <br>
  <button @click="addCar">给人添加一台车</button>
  <button @click="person.car.name+='!'">换车名</button>
  <button @click="person.car.price++">加价</button>
</template>
<script>
import { reactive, toRefs, ref, toRaw } from "vue";

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

    //toRaw
    //作用：将一个reactive生成对的响应式对象转为普通对象
    //使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新

    //markRaw
    //作用：标记一个对象，使其永远不会再成为响应式对象
    //应用场景1：有些值不应该被设置为响应式的，例如复杂的第三方类库
    //应用场景2：当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

    function showRawPerson() {
      const p = toRaw(person)
      console.log(p)
    }

    function  addCar(){
      let car = {name:'奔驰', price:40}
      person.car = car
      // person.car = markRaw(car)  这个car永远不会成为响应式数据
    }

    return {
      person,
      ...toRefs(person),//只拆最原始的数据，新加的数据不管
      sum,
      showRawPerson,
      addCar,
    };
  },
};
</script>

<style></style>
