<template>
  <div class="app">
    <h1>{{msg}}</h1>
    <AdminSchool/>
    <AdminStudent/>
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
};
</script>

<style>
.app{
  background-color: gray;
  padding: 5px;
}
</style>