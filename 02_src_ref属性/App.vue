<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDOM">点我输出上方的DOM元素</button>
    <mySchool></mySchool>
    <myStudent></myStudent>
  </div>
</template>

<script>
import mySchool from './components/School.vue'
import myStudent from './components/Student.vue'

export default {
  name:'App',
  data(){
    return{
      msg:'欢迎欢迎'
    }
  },
  components:{
    mySchool,
    myStudent
  },
  methods: {
    showDOM(){
      console.log(this.$refs.titles)
    }
  },
}
</script>