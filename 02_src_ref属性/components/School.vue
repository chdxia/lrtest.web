<template>
  <div class="demo">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
  name:'mySchool',
  data(){
    return{
      name:'重庆理工大学',
      address:'重庆花溪'
    }
  },
  methods: {
    showName(){
      alert(this.name)
    }
  },
}
</script>

<style>
  .demo{
    background-color: gray;
  }
</style>