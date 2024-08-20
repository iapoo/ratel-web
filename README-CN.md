# Ratel Web

English: [README.MD](README.md), 中文 [README-CN.MD](README.md)

## 关于 Ratel Web

Ratel是一个通用的图形编辑器，可以用于创作流程图、UML等. 可以在线使用也可以离线使用.
Ratel Web是Ratel的前端项目. 总共3个子项目: Ratel-Web(frontend), Ratel-Server(backend) and Ratel-deployment(deployment).

演示网站: <https://ratel.ivipa.com>

## 使用

### 在线演示

演示网站: <https://ratel.ivipa.com>

### 使用本地Docke镜像版本

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
    -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
    topoo/ratel-allinone:0.1

### 构建本地Docker镜像版本

更多信息可访问Ratel Deployment项目

## 构建和调试

1. 安装Node, 需要Node版本20.x. 其他版本可能会有问题.
2. 构建: npm run build
3. 运行: npm run start

## 使用Electron构建桌面安装版本

1. 运行命令: npm run electron:build
2. 进入目录 /app 并运行: npm run electron:win 用于Windows版本 (也可以运行 npm run electron:mac 用于Mac版本)
