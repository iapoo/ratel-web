# Ratel Web

[中文](README-CN.md), [English](README.md)

## 关于 Ratel Web

Ratel是一个开源通用的图形编辑器，可以用于创作流程图、UML等. 可以在线使用也可以离线使用. Ratel Web是Ratel的前端项目. 总共3个子项目: Ratel-Web(frontend), Ratel-Server(backend) and Ratel-deployment(deployment).

网站: <https://ratel.ivipa.com>

## 主要功能

- 支持基本图形、流程图、UML、原型图、泳道、源代码编辑图形等等.
- 支持在线或离线工作模式，大部分功能可以离线工作.
- 支持浏览器访问或者本地桌面应用模式访问，本地应用支持Windows, Linux及MacOS系统
- 支持导出到PNG/JPG格式或者SVG格式，也支持PNG/JPG及SVG图形导入
- 支持保存图形文件到本地环境并从本地环境加载，也支持在线保存加载
- 支持语法高亮度图形组件
- 支持个人库特征，可以将选中图形保存为个人图形库， 也支持导入PNG/JPG及SVG到个人图形库(需网络).
- 支持共享功能、团队管理(需网络)
- 支持本地部署(包括桌面应用端和服务器端）

## 使用

### 在线网站

网站: <https://ratel.ivipa.com>

### 使用本地Docke镜像版本

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
 topoo/ratel-allinone:0.1.0

### 构建本地Docker镜像版本

更多信息可访问Ratel Deployment项目

## 构建和调试

1. 安装Node, 需要Node版本20.x. 其他版本可能会有问题.
2. 构建: npm run build
3. 运行: npm run start

## 使用Electron构建桌面安装版本

1. 运行命令: npm run electron:build
2. 进入目录 /app 并运行: npm run electron:win 用于Windows版本 (也可以运行 npm run electron:mac 用于Mac版本)
