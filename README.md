# lrtest-web

prod访问：http://lrtest.chdxia.com

Jenkins地址：http://jenkins.chdxia.com

接口文档地址：http://lrtest.chdxia.com/api/v1/docs

### dev run command:

```shell
npm run dev
```
### prod build command:

```shell
npm run build:prod
```
### jenkins 配置 :

- GitHub项目：https://github.com/chdxia/lrtest-web/
- Git Repositories：git@github.com:chdxia/lrtest-web.git
- 构建触发器：GitHub hook trigger for GITScm polling（在github设置钩子，将请求发送达到jenkins所在地址，GitHub-Repositories-Settings-Webhooks-PlayloadURL：http://jenkins.chdxia.com/github-webhook/）
- 构建环境：Send files or execute commands over SSH after the build runs

```shell
# Exec command
rm -rf /usr/share/nginx/lrtest-web/dist/*
```

- 构建环境：Provide Node & npm bin/ folder to PATH
- 构建：执行shell

```shell
echo $PATH
node --version
npm --version
npm install
rm -rf ./dist
npm run build:prod
```

- 构建后操作：Send build artifacts over SSH

```shell
# Source files
dist/**
# Remove prefix
dist
# Remote directory
/usr/share/nginx/lrtest-web/dist
```

