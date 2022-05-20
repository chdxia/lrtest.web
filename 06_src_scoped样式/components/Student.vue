<template>
  <div class="demo">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
export default {
  name: "myStudent",
  data() {
    return {
      name: "chdxia",
      sex: "男",
    };
  },
};
</script>

<style scoped>
.demo{
    background-color:blue;
}
</style>