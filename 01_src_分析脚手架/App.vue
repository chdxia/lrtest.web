<template>
  <div>
    <mySchool></mySchool>
    <myStudent></myStudent>
  </div>
</template>

<script>
import mySchool from './components/School.vue'
import myStudent from './components/Student.vue'

export default {
  name:'App',
  components:{
    mySchool,
    myStudent
  }
}
</script>