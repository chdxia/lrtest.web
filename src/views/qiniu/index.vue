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
    <div class="delete">
      <el-button type="danger" @click="handleDelete()">批量删除</el-button>
    </div>
    <div v-loading="listLoading" class="image-list">
      <span v-for="item in fileList" :key="item.src" v-loading="listLoading" class="image-button">
        <el-image
          :src="item.src"
          :alt="item.src"
          :lazy="true"
          :preview-src-list="srcList"
          fit="cover"
          class="image"
        />
        <el-checkbox v-model="item.check" />
      </span>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { getToken, fileList, deleteFiles } from '@/api/qiniu'

export default {
  name: 'Qiniu',
  data() {
    return {
      uploadUrl: 'https://upload-z2.qiniup.com',
      key: '',
      qiniuToken: '',
      listLoading: true,
      fileList: [],
      srcList: [],
      checkList: [],
      dialogVisible: false
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
    handleDelete() {
      this.checkList = []
      this.fileList.map((item) => {
        if (item.check === true) {
          this.checkList.push(item.src)
        }
      })
      if (this.checkList.length > 0) {
        this.$confirm('此操作将永久删除文件，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFiles(this.checkList).then(response => {
            this.$message({
              message: '成功删除所选图片',
              type: 'success'
            })
            this.getList()
          })
        })
      } else {
        this.$message({
          message: '请选择图片',
          type: 'warning'
        })
      }
    },
    getList() {
      this.listLoading = true
      fileList().then(response => {
        this.fileList = response.data.map((item) => {
          return Object.assign({}, { src: item, check: false })
        })
        this.srcList = this.fileList.map((item) => {
          return item.src
        })
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    }
  }
}
</script>

<style>
.image-button {
  width: 200px;
  height: 200px;
}

.image {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  margin-bottom: 20px
}
</style>
