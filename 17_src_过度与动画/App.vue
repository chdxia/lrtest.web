<template>
  <div>
    <userTest/>
    <userTest2/>
    <userTest3/>
  </div>
</template>

<script>
import userTest from "./components/UserTest.vue";
import userTest2 from "./components/UserTest2.vue";
import userTest3 from "./components/UserTest3.vue";

export default {
  name: "App",
  components: { userTest, userTest2, userTest3 },

};
</script>

<style>

</style>