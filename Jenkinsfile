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
        script {
          server = getServer()
        }
        sshCommand remote: server, command: "rm -rf /usr/share/nginx/lrtest-web/dist"
      }
    }
    stage('构建') {
      steps {
        script {
          echo "hello word"
        }
      }
    }
    stage('远程部署') {
      steps {
        script {
          echo "hello word"
        }
      }
    }
  }
}


def getServer() {
    def remote = [:]
    remote.name = "ssh"
    remote.host = "ssh.chdxia.com"
    remote.port = 22
    remote.allowAnyHosts = true

    withCredentials([usernamePassword(
        credentialsId: 'a477bfd8-880b-4d82-ae37-eecaa6e0133d',
        usernameVariable: 'username',
        passwordVariable: 'password'
    )]) {
        remote.user = "${username}"
        remote.password = "${password}"
    }
    return remote
}
