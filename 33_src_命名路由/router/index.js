//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import UserAbout from "../pages/About.vue";
import UserHome from "../pages/Home.vue";
import UserNews from "../pages/News.vue";
import UserMessage from "../pages/Message.vue";
import UserDetail from "../pages/Detail.vue";

//创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      name: "guanyu",
      path: "/about",
      component: UserAbout,
    },
    {
      path: "/home",
      component: UserHome,
      children: [
        {
          path: "news",
          component: UserNews,
        },
        {
          path: "message",
          component: UserMessage,
          children: [
            {
              name: "xiangqing",
              path: "detail",
              component: UserDetail,
            },
          ],
        },
      ],
    },
  ],
});
