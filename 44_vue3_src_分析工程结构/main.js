//引入的不再是Vue构造函数了，引入对的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象--app（类似于之前Vue2中的vm，但app比vm更“轻”）,以及挂载
createApp(App).mount('#app')
/* new Vue({
    el: "#app",
    render: (h) => h(App),
  }); */
/* const vm= new Vue({
    render:h => h(App)
})
vm.$mount('#app') */
