<template>
  <div class="student">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
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
};
</script>

<style scoped>
.student{
    background-color:pink;
    padding: 5px;
    margin-top: 30px;
}
</style>