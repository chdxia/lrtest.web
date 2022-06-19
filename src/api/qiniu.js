import request from '@/utils/request'

export function getToken(key) {
  return request({
    url: '/qiniu/upload/token',
    method: 'get',
    params: { key }
  })
}
