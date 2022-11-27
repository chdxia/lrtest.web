import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    account: '',
    user_name: '',
    email: '',
    roles: [],
    tasks: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_USER_NAME: (state, user_name) => {
    state.user_name = user_name
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TASKS: (state, tasks) => {
    state.tasks = tasks
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('获取用户信息失败，请重新登录')
        }

        const { account, user_name, email, roles, tasks } = data

        if (!roles || roles.length <= 0) {
          reject('获取用户信息时，roles必须是非空数组')
        }
        commit('SET_ACCOUNT', account)
        commit('SET_USER_NAME', user_name)
        commit('SET_EMAIL', email)
        commit('SET_ROLES', roles)
        commit('SET_TASKS', tasks)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // 必须优先移除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token，重置用户信息
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须优先移除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

