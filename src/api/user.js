import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}

export function userList(query) {
  return request({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: `/users/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteUser(user_id) {
  return request({
    url: `/users/${user_id}`,
    method: 'delete'
  })
}
