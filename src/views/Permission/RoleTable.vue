<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="getList">
        刷新
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="handleCreate">
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
    >
      <el-table-column label="序号" align="center" width="60px">
        <template slot-scope="{$index}">
          <span>{{ (listQuery.page-1)*listQuery.limit + $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="danger" size="mini" @click="handleDelete(row, $index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="新建角色" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色" prop="role">
          <el-input v-model="temp.role_name" maxlength="30" placeholder="请输入角色" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, addRole, deleteRole } from '@/api/role'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'RoleTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        role_name: undefined
      },
      dialogFormVisible: false,
      rules: {
        role_name: [{ required: true, message: '请输入角色', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getRoles(this.listQuery).then(response => {
        this.list = response.data.roles
        this.total = response.data.total

        // 模拟请求的时间，request请求成功之前，会一直转圈
        setTimeout(() => {
          this.listLoading = false
        }, 0.3 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        role_name: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addRole(this.temp).then(() => {
            this.dialogFormVisible = false
            this.list.unshift(this.temp)
            this.$notify({
              title: '成功',
              message: '成功添加角色信息',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm(`删除角色"${row.role_name}"，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(() => {
          this.list.splice(index, 1)
          this.$message({
            message: `成功删除角色"${row.role_name}"`,
            type: 'success'
          })
        })
      })
    }
  }
}
</script>
