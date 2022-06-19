<template>
  <el-upload
    :action="uploadUrl"
    :http-request="upQiniu"
    :before-upload="beforeUpload"
    accept=".jpeg, .jpg, .png"
    drag
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text">
      将图片拖到此处，或<em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { getToken } from '@/api/qiniu'

export default {
  data() {
    return {
      uploadUrl: 'https://upload-z2.qiniup.com',
      qiniuData: {
        key: '', // 图片名字处理
        token: '', // 七牛云token
        data: {},
        bucket: ''
      }
    }
  },
  methods: {
    beforeUpload(file) {
      // 定义文件名
      this.qiniuData.key = `upload_pic_${new Date().getTime()}_${file.name}`
      // 从服务器获取token
      const _self = this
      return new Promise((resolve, reject) => {
        getToken(this.qiniuData.key).then(response => {
          _self.qiniuData.token = response.data.token
          resolve(_self.qiniuData)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    upQiniu(event) {
      var file = event.file
      const putExtra = {
        fname: this.qiniuData.key,
        params: {},
        mimeType: null
      }
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      }
      const observable = qiniu.upload(file, this.qiniuData.key, this.qiniuData.token, putExtra, config)
      observable.subscribe({
        next: result => {
          console.log(result)
        },
        error: errResult => {
          console.log(errResult)
          this.$message({
            message: '上传失败',
            type: 'error'
          })
        },
        complete: result => {
          console.log(result)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
