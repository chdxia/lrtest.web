//该文件用于创建vuex中最为核心啊的store

//引入Vue
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex);

//准备actions 用于准备组件中的动作
const actions = {
  /* jia(context, value) {
    context.commit("JIA", value);
  },
  jian(context, value) {
    context.commit("JIAn", value);
  }, */
  jiaOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait(context, value) {
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};
//准备mutatinos 用于操作数据（state)
const mutations = {
  JIA(state, value) {
    state.sum += value;
  },
  JIAN(state, value) {
    state.sum -= value;
  },
};
//准备state 用于存储数据
const state = {
  sum: 0,
};

//创建并暴露stroe
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
