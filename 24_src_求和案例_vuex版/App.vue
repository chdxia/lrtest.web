<template>
  <div>
    <UserCount/>
  </div>
</template>

<script>
import UserCount from "./components/UserCount.vue";

export default {
  name: "App",
  components: { UserCount },
  mounted() {
    console.log('App', this)
  },
};
</script>

<style>

</style>
