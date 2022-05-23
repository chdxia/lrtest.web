<template>
  <div class="container">
    <AdminCategory title="游戏">
      <template scope="{games}">
        <ul>
          <li v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ul>
      </template>
    </AdminCategory>

    <AdminCategory title="游戏">
      <template scope="{games}">
        <ol>
          <li v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ol>
      </template>
    </AdminCategory>

    <AdminCategory title="游戏">
      <h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
      <template scope="{games}">
        <h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
      </template>
    </AdminCategory>
  </div>
</template>

<script>
import AdminCategory from "./components/AdminCategory.vue";

export default {
  name: "App",
  components: { AdminCategory },
};
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}

video {
  width: 100%;
}

h4 {
  text-align: center;
}
</style>
