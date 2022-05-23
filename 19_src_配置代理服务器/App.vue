<template>
  <div>
    <button @click="getUsers">获取用户信息</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  methods: {
    getUsers(){
      axios.get('http://localhost:8080/users/1/items').then(
        response => {
          console.log('请求成功了', response.data)
        },
        error => {
          console.log('请求失败了', error.message)
        }
      )
    }
  },
};
</script>

<style>
</style>