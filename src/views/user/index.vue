<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.account" placeholder="账号" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.user_name" placeholder="姓名" style="width: 90px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.email" placeholder="邮箱" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.role_id" placeholder="角色" clearable class="filter-item" style="width: 90px">
        <el-option v-for="item in roleOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item" style="width: 90px">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="序号" align="center" width="60px">
        <template slot-scope="{$index}">
          <span>{{ (listQuery.page-1)*listQuery.limit + $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="90px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.role_id | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="90">
        <template slot-scope="{row}">
          <el-tag :type="getStatus(row.status) | statusFilter">
            {{ getStatus(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_time" sortable="custom" width="160px" align="center" :class-name="getSortClass('create_time')">
        <template slot-scope="{row}">
          <span>{{ row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="update_time" sortable="custom" width="160px" align="center" :class-name="getSortClass('update_time')">
        <template slot-scope="{row}">
          <span>{{ row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="!row.status" size="mini" type="success" @click="handleModifyStatus(row,true)">
            激活
          </el-button>
          <el-button v-if="row.status" size="mini" @click="handleModifyStatus(row,false)">
            停用
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row, index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="temp.user_name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="temp.role_id" class="filter-item" placeholder="请选择权限">
            <el-option v-for="item in roleOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userList, createUser, updateUser, deleteUser } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const statusOptions = [
  { label: '激活', value: true, display_name: 'success' },
  { label: '停用', value: false, display_name: 'info' }
]

const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.label] = cur.display_name
  return acc
}, {})

const roleOptions = [
  { key: 1, label: 'admin' },
  { key: 2, label: 'pm' },
  { key: 3, label: 'developer' },
  { key: 4, label: 'tester' },
  { key: 5, label: 'visitor' }
]

// arr to obj, such as { 1 : "admin", 2 : "editor" }
const roleKeyValue = roleOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.label
  return acc
}, {})

export default {
  name: 'UserTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      return statusKeyValue[status]
    },
    roleFilter(role) {
      return roleKeyValue[role]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        account: undefined,
        user_name: undefined,
        email: undefined,
        role_id: undefined,
        status: undefined,
        sort: undefined
      },
      roleOptions: [
        { key: 1, label: 'admin' },
        { key: 2, label: 'pm' },
        { key: 3, label: 'developer' },
        { key: 4, label: 'tester' },
        { key: 5, label: 'visitor' }
      ],
      statusOptions: [
        { label: '激活', value: true, display_name: 'success' },
        { label: '停用', value: false, display_name: 'info' }
      ],
      showReviewer: false,
      temp: {
        id: undefined,
        account: undefined,
        user_name: undefined,
        email: undefined,
        password: undefined,
        role_id: undefined,
        status: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改用户',
        create: '新建用户'
      },
      rules: {
        email: [{ required: true, message: '请填写邮箱', trigger: 'change' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getStatus(status) {
      if (status === true) {
        return '激活'
      } else {
        return '停用'
      }
    },
    getList() {
      this.listLoading = true
      for (const i in this.listQuery) {
        if (this.listQuery[i] === '') {
          this.listQuery[i] = undefined
        }
      }
      userList(this.listQuery).then(response => {
        this.list = response.data.users
        this.total = response.data.total

        // 模拟请求的时间，request请求成功之前，会一直转圈
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      const tempData = Object.assign({}, row)
      tempData.status = status
      updateUser(tempData).then(() => {
        row.status = status
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'create_time') {
        this.sortByCreateTime(order)
      }
      if (prop === 'update_time') {
        this.sortByUpdateTime(order)
      }
    },
    sortByCreateTime(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+create_time'
      } else {
        this.listQuery.sort = '-create_time'
      }
      this.handleFilter()
    },
    sortByUpdateTime(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+update_time'
      } else {
        this.listQuery.sort = '-update_time'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        account: undefined,
        user_name: undefined,
        email: undefined,
        password: undefined,
        role_id: undefined,
        status: true
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.rules.password[0].required = true
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => { // 发送请求,创建用户
            this.dialogFormVisible = false // 关闭新建窗口
            const listQuery = Object.assign({}, { email: this.temp.email })
            userList(listQuery).then(response => { // 根据邮箱查询用户
              const user = response.data.users[0] // 将刚刚新增的用户信息取出来（包括创建时间、修改时间）
              this.list.unshift(user) // 展示新增的用户信息,这里直接使用this.list.unshift(this.temp)无法显示创建时间以及修改时间
              this.$notify({
                title: '成功',
                message: '成功添加用户信息',
                type: 'success',
                duration: 2000
              })
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.rules.password[0].required = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateUser(this.temp).then(() => {
            this.dialogFormVisible = false
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.$notify({
              title: '成功',
              message: '成功修改用户信息',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteUser(row.id).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '成功删除用户信息',
          type: 'success',
          duration: 2000
        })
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
