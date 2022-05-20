<template>
  <div>
    <mySchool/>
    <br>
    <myStudent/>
  </div>
</template>

<script>
import mySchool from "./components/School.vue";
import myStudent from "./components/Student.vue";

export default {
  name: "App",
  components: {
    myStudent,
    mySchool
  },
};
</script>