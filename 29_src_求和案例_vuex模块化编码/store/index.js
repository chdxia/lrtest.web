//该文件用于创建vuex中最为核心啊的store

import axios from 'axios'
import { nanoid } from 'nanoid';
//引入Vue
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex);

//求和功能相关的配置
const countOptions = {
  namespaced: true,
  actions: {
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
  },
  mutations: {
    JIA(state, value) {
      state.sum += value;
    },
    JIAN(state, value) {
      state.sum -= value;
    },
  },
  state: {
    sum: 0,
    school: "重庆理工大学",
    subjecct: "前端",
  },
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};

//人员管理相关配置
const personOptions = {
  namespaced: true,
  actions: {
    addPersonXia(context, value) {
      if (value.name.indexOf("夏") === 0) {
        context.commit("ADD_PERSON", value);
      } else {
        alert("添加的人必须姓夏！");
      }
    },
    addPersonServer(context){
      axios.get('https://api.uixsj.cn/hitokoto/get?tupe=social').then(
        response =>{
          context.commit('ADD_PERSON', {id:nanoid(), name:response.data})
        },
        error => {
          alert(error.message)
        }
      )
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personList.unshift(value);
    },
  },
  state: {
    personList: [{ id: "001", name: "chdxia" }],
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name;
    },
  },
};

//创建并暴露stroe
export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions,
  },
});
