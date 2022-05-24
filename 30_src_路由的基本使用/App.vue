<template>
  <div>
    <div class="row">
      <UserBanner/>
    </div>
    <div class="row">
      <div class="col-sx-2 col-xs-offset-2">
        <div class="list-group">
          <!-- Vue中借助router-link变迁实现路由的切换 -->
          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-sx-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserBanner from './components/Banner.vue'

export default {
  name: "App",
  components:{UserBanner}
};
</script>

<style>

</style>
