<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <button @click="sendStudentName">吧学生名给Scheool组件</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
  name: "AdminStudent",
  data() {
    return {
      name: "chdxia",
      sex: "男",
    };
  },
  mounted(){

  },
  methods:{
    sendStudentName(){
      pubsub.publish('hello', 666)
    }
  }
};
</script>

<style scoped>
.student{
    background-color:pink;
    padding: 5px;
    margin-top: 30px;
}
</style>