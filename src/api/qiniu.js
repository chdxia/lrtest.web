import request from '@/utils/request'

export function getToken(key) {
  return request({
    url: '/qiniu/upload/token',
    method: 'get',
    params: { key }
  })
}

export function fileList() {
  return request({
    url: '/qiniu/files',
    method: 'get'
  })
}

export function deleteFiles(data) {
  return request({
    url: '/qiniu/files',
    method: 'delete',
    data
  })
}
