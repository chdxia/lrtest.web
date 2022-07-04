<template>
  <div class="image-container">
    <div class="image-upload">
      <el-upload
        :action="uploadUrl"
        :http-request="uploadFile"
        :before-upload="beforeUpload"
        :show-file-list="false"
        :drag="true"
        :multiple="true"
        accept=".jpeg, .jpg, .png, .gif, .svg"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将图片拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <div v-loading="listLoading" class="image-list">
      <el-image
        v-for="src in srcList"
        :key="src"
        :src="src"
        :alt="src"
        fit="contain"
        :lazy="true"
        :preview-src-list="srcList"
        style="width: 100px; height: 100px"
      />
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { getToken, fileList } from '@/api/qiniu'

export default {
  data() {
    return {
      uploadUrl: 'https://upload-z2.qiniup.com',
      key: '',
      qiniuToken: '',
      listLoading: true,
      srcList: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    beforeUpload() {
      // 定义文件名
      // this.qiniuData.key = `upload_pic_${new Date().getTime()}_${file.name}`
      // 已修改，不再使用自定义文件名，转而使用七牛默认的etag作为文件名
      // 当文件hash值相同时，文件名也相同，外链地址也相同，七牛云自带文件去重的同时，也能满足文件名、外链去重
      return new Promise((resolve, reject) => {
        // 从服务器获取token，修改后，获取token中不再包含key值
        getToken().then(response => {
          this.qiniuToken = response.data.token
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    uploadFile(event) {
      const file = event.file
      const putExtra = {
        fname: file.name,
        params: {},
        mimeType: null
      }
      const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
      }
      // key值为null
      const observable = qiniu.upload(file, null, this.qiniuToken, putExtra, config)
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
          this.getList()
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
    },
    getList() {
      this.listLoading = true
      fileList().then(response => {
        this.srcList = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    }
  }
}
</script>
