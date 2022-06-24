pipeline {
  agent {label 'master'}
  tools {nodejs '16.15.0'}
  options {
    skipStagesAfterUnstable()
    timeout(time: 1, unit: 'HOURS') 
  }
  environment {def server = ''}
  stages {
    stage('清理文件') {
      steps {
        // 初始化参数
        script {
          server = getServer()
        }
        // 在远程主机上删除项目文件
        sshCommand remote: server, command: 'rm -rf /usr/share/nginx/lrtest-web/dist'
      }
    }
    stage('本地构建') {
      steps {
        // 删除历史构建，重新在本地构建
        sh 'rm -rf ./dist && npm install && npm run build:prod'
      }
    }
    stage('远程部署') {
      steps {
        // 将构建好的文件部署到远程服务器
        sshPut remote: server, from: "dist", into: "/usr/share/nginx/lrtest-web"
      }
    }
  }
}


// 定义一个方法，返回ssh连接所需的信息
def getServer() {
    def remote = [:]
    remote.name = "ssh"
    remote.host = "chdxia.com"
    remote.port = 22
    remote.allowAnyHosts = true

    withCredentials([usernamePassword(
        credentialsId: "c4fdcaad-ba3e-4d3c-a5b5-2ce2dc804917",
        usernameVariable: "username",
        passwordVariable: "password"
    )]) {
        remote.user = "${username}"
        remote.password = "${password}"
    }
    return remote
}
