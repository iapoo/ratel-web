# 环境准备

## 环境要求如下

### ratel-web

Node 20.x或以上

### ratel-server

JDK21、Spring Boot 3.3.X和Maven 3.9.X

### ratel-deployment

Docker环境

## 本地开发构建

### ratel-web

调试运行：npm run start

构建桌面程序命令：

- 运行：npm run electron:build

- 在/app子目录运行： npm run electron:win (Windows版本桌面程序)

- 在/app子目录运行： npm run electron:mac (MacOS版本桌面程序)

- 在/app子目录运行： npm run electron:linux (Linux/Unbuntu版本桌面程序)

### ratel-server

构建：mvn package -DskipTests

调试运行需要配置MySQL, Redis和Minio

#### 基于Docker准备Mysql

docker run --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

#### 基于Docker准备Redis

docker run --name redis -p 6380:6379 -d redis

#### 基于Docker准备Minio

docker run -p 9000:9000 -p 9090:9090 --name minio -v ~/data/minio:/data \
 -e "MINIO_ROOT_USER=root" \
 -e "MINIO_ROOT_PASSWORD=password" \
 quay.io/minio/minio server /data --console-address ":9090"

#### 启动命令

    java -jar ratel-system-server/target/ratel-system-server-0.1.0.jar

### ratel-deployment

#### 准备

当前支持Linux和MacOS环境构建

检出代码、要求ratel-web、ratel-server和ratel-deployment在相同目录下. 运行脚本 ./prepare.sh

#### 构建Docker镜像

#### 首先构建基础镜像

docker build -t ratel-basic:1.0.0 -f Dockerfile-basic .

#### 构建all-in-one镜像

docker build -t ratel-allinone:0.1.0 -f Dockerfile-allinone --build-arg RATEL_VERSION=0.1.0 .

#### 调试运行镜像容器

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 ratel-allinone:0.1.0

#### 调试运行镜像容器（挂载本地日志及Minio数据）

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
 ratel-allinone:0.1.0

#### 调试运行镜像容器（挂载本地日志、Mysql及Minio数据，可能失败）

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
 -v ~/works/ratel/mysql:/var/lib/mysql ratel-allinone:0.1.0

#### Docker调试诊断

docker exec -it ratel sh
