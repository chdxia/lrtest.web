//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import UserAbout from "../pages/About.vue";
import UserHome from "../pages/Home.vue";
import UserNews from "../pages/News.vue";
import UserMessage from "../pages/Message.vue";
import UserDetail from "../pages/Detail.vue";

//创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: "guanyu",
      path: "/about",
      component: UserAbout,
      meta: { isAuth: true, title: "关于" },
    },
    {
      name: "zhuye",
      path: "/home",
      component: UserHome,
      mata: { title: "主页" },
      children: [
        {
          name: "xinwen",
          path: "news",
          component: UserNews,
          meta: { isAuth: true, title: "新闻" },
          /* beforeEnter: (to, from, next) => {
            console.log(to, from);
            if (to.meta.isAuth) {
              //判断是否需要鉴权
              if (localStorage.getItem("school") === "agg") {
                next();
              } else {
                alert("学校名不对，无权限查看");
              }
            } else {
              next();
            }
          }, */
        },
        {
          name: "xiaoxi",
          path: "message",
          component: UserMessage,
          mata: { isAuth: true, title: "消息" },
          children: [
            {
              name: "xiangqing",
              path: "detail/:id/:title",
              component: UserDetail,
              mata: { title: "详情" },
              //props的第一种写法，值为对象
              //props:{a:1, b:'hello'},

              //props的第二种写法，值为布尔值
              //props:true,

              //props的第三种写法，值为函数
              props($route) {
                return { id: $route.query.id, title: $route.query.title };
              },
            },
          ],
        },
      ],
    },
  ],
});

//全局前置路由守卫-初始化的时候被调用，每次路由切换之前被调用
/* router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.isAuth) {
    //判断是否需要鉴权
    if (localStorage.getItem("school") === "agg") {
      next();
    } else {
      alert("学校名不对，无权限查看");
    }
  } else {
    next();
  }
}); */

//全局后置路由守卫，初始化的时候被调用，每车次路由切换之后被调用
router.afterEach((to, from) => {
  console.log("后置路由守卫", to, from);
  document.title = to.meta.title || "lrtest";
});

export default router;
