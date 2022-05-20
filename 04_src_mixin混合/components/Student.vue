<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
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
  methods: {
    shouName() {
      alert(this.name);
    },
  },
};
</script>
