<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{number}}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">把学生名给app</button>
    <button @click="unbind">解绑agg事件</button>
    <button @click="death">销毁当前Student组件的实例对象</button>
  </div>
</template>

<script>
export default {
  name: "AdminStudent",
  data() {
    return {
      name: "chdxia",
      sex: "男",
    };
  },
  methods: {
    add(){
      console.log('add回调被调用了')
      this.number++
    },
    sendStudentName(){
      // 触发Student组件实例身上的agg事件
      this.$emit('agg', this.name, 666,888,999)
      this.$emit('demo')
    },
    unbind(){
      // this.$off('agg') //解绑一个自定义事件
      // this.$off(['agg', 'demo']) //解绑多个自定义事件
      this.$off() //解绑所有的自定义事件
    },
    death(){
      this.$destroy() //销毁当前student组件的实例，销毁后所有Student实例的自定义事件全都不奏效了
    }
  },
};
</script>

<style scoped>
.student{
    background-color:pink;
    padding: 5px;
    margin-top: 30px;
}
</style>