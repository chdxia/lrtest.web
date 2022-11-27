import Cookies from 'js-cookie'
// 将token以X-Token字段存入Cookie，并设置过期时间（默认当前会话结束时过期）
const TokenKey = 'X-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
