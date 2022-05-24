//引入Vue
import Vue from 'vue'
//引入vue组件App，他是所有组件的父组件
import App from './App.vue'
//引入插件
import vueResource from 'vue-resource'
//引入vuex
//import Vuex from 'vuex'
//引入store
import store from './store/index'

//关闭vue的生产提示
Vue.config.productionTip = false

//使用插件
Vue.use(vueResource)
//Vue.use(Vuex)

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    beforeCreate(){
        Vue.prototype.$bus = this
    }
})