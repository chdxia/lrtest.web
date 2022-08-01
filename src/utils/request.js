import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '@/router/index'

// 实例化对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时
})

// 请求拦截，请求前置处理
service.interceptors.request.use(
  config => {
    if (getToken()) {
      // 如果有token，则请求头中带上token值
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 请求发生错误时执行
    Message.error('发送请求失败')
    return Promise.reject(error)
  }
)

// 响应拦截，请求后置处理
service.interceptors.response.use(
  // 请求成功（status_code=200、201···）
  response => {
    const res = response.data
    return res
  },
  // 请求报错（status_code=400、401、404、422···）
  error => {
    const res = error.response.data
    if (res.message === 'X-Token header invalid') {
      // token校验未通过，跳转登录页面
      Message.error('身份校验错误，请重新登录')
      router.push({ path: `/login?redirect=${router.history.current.fullPath}` })
    } else {
      // 提示错误消息
      Message.error(res.message)
    }
    return Promise.reject(error)
  }
)

export default service
