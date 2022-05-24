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
  ADD_PERSON(state, value) {
    state.personList.unshift(value);
  },
};
//准备state 用于存储数据
const state = {
  sum: 0,
  school: "重庆理工大学",
  subjecct: "前端",
  personList: [{ id: "001", name: "chdxia" }],
};
//准备getters用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

//创建并暴露stroe
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
