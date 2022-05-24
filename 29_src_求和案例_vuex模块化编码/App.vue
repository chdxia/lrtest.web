<template>
  <div>
    <UserCount/>
    <hr>
    <ListPerson/>
  </div>
</template>

<script>
import UserCount from "./components/UserCount.vue";
import ListPerson from "./components/ListPerson.vue";

export default {
  name: "App",
  components: { UserCount, ListPerson },
  mounted() {
    // console.log('App', this)
  },
};
</script>

<style>

</style>
