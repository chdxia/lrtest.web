<template>
  <div>
    <myStudent></myStudent>
    <myStudent></myStudent>
    <myStudent name="lisi" sex="nv" :age="17"/>
  </div>
</template>

<script>
import myStudent from './components/Student.vue'

export default {
  name:'App',
  components:{
    myStudent
  },
}
</script>