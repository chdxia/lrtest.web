<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给福传递数据 -->
    <AdminSchool :getSchoolName="getSchoolName"/>
    
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给福传递数据(第一种写法。使用@或者v-on) -->
    <AdminStudent @agg="getStudentName" @demo="m1"/>
    
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法。使用ref) -->
    <!-- <AdminStudent ref="getStudentName"/> -->
  </div>
</template>

<script>
import AdminSchool from './components/School.vue';
import AdminStudent from './components/Student.vue'
export default {
  name: "App",
  components: {
    AdminStudent,
    AdminSchool
  },
  data(){
    return{
      msg:'你好啊！！！'
    }
  },
  methods: {
    getSchoolName(name){
      console.log('app收到了学校名:', name)
    },
    getStudentName(name){
      console.log('app收到了学生名', name)
    },
    m1(){
      console.log('demo事件被触发了')
    },
    unbind(){
      this.$off('agg')
    }
  },
  mounted() {
    // this.$refs.student.$on('agg', this.getStudentName) //绑定自定义事件
    // this.$refs.student.$once('agg', this.getStudentName) //绑定自定义事件（一次性）
  },
};
</script>

<style>
.app{
  background-color: gray;
  padding: 5px;
}
</style>