<template>
  <div class="container">
    <AdminCategory title="美食">
      <img slot="center" src="https://i1.hdslb.com/bfs/archive/b69958d0d6970dcfcacdf83a05d2dcc00c0a6c73.jpg@672w_378h_1c.webp" alt="">
      <a slot="footer" href="http://www.bing.com">更多美食</a>
    </AdminCategory>

    <AdminCategory title="游戏">
      <ul slot="center">
        <li v-for="(g,index) in games" :key="index">{{g}}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="https://www.bing.com">单机游戏</a>
        <a href="https://www.bing.com">网络游戏</a>
      </div>
    </AdminCategory>

    <AdminCategory title="电影">
      <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
      <template v-slot:footer>
        <div class="foot">
          <a href="https://www.bing.com">经典</a>
          <a href="https://www.bing.com">热门</a>
          <a href="https://www.bing.com">推荐</a>
        </div>
        <h4>欢迎前来观影</h4>
      </template>
    </AdminCategory>
  </div>
</template>

<script>
import AdminCategory from "./components/AdminCategory.vue";

export default {
  name: "App",
  components: { AdminCategory },
  data(){
    return{
      foods:['火锅', '烧烤', '小龙虾', '牛排'],
      games:['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
      films:['《教父》', '《拆弹专家》', '《你好，李焕英》', '《光环》']
    }
  }
}
</script>

<style>
.container, .foot{
  display: flex;
  justify-content: space-around;
}

video{
  width: 100%;
}

h4{
  text-align: center;
}
</style>