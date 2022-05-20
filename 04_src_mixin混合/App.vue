<template>
  <div>
    <mySchool/>
    <br>
    <myStudent/>
  </div>
</template>

<script>
import myStudent from "./components/Student.vue";
import mySchool from "./components/School.vue";

export default {
  name: "App",
  components: {
    myStudent,
    mySchool
  },
};
</script>