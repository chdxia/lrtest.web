<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <ul>
        <keep-alive include="UserNews">
        <router-view></router-view>
        </keep-alive>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHome",
  beforeDestroy() {
    console.log("Home组件即将被销毁了");
  },
  mounted() {
    console.log("Home组件挂载完毕了");
  },
};
</script>

<style></style>
