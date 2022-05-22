<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "AdminSchool",
  props:['getSchoolName'],
  data() {
    return {
      name: "重庆理工大学",
      address: "重庆花溪",
    };
  },
};
</script>

<style scoped>
.school{
  background-color: skyblue;
  padding: 5px;
}
</style>