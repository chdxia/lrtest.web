<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <el-card shadow="never">
      <el-skeleton :loading="loading" animated>
        <el-row :gutter="20" justify="space-between">
          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div class="flex items-center">
              <div>
                <div style="font-size: 20px">
                  下午好，{{ user_name }}，祝你开心每一天！
                </div>
                <div style="margin-top: 10px; font-size: 14px; color: rgb(107, 114, 128)">
                  今日晴，20℃ - 32℃！
                </div>
              </div>
            </div>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <div style="height: 8px; place-items: center; justify-content: flex-end;">
              <div style="text-align: right;">
                <div style="margin-bottom: 20px; font-size: 14px; color: rgb(107, 114, 128)">任务数</div>
                <div style="font-size: 20px;">20</div>
              </div>
              <el-divider direction="vertical" />
              <div style="text-align: right;">
                <div style="margin-bottom: 20px; font-size: 14px; color: rgb(107, 114, 128)">待办</div>
                <div style="font-size: 20px;">20</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner
  },
  computed: {
    ...mapGetters([
      'user_name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }
}
</style>
