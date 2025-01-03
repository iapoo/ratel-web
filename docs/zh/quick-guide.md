# 快速上手

## 直接访问在线版本

在线访问：[https://ratel.ivipa.com](https://ratel.ivipa.com).

## 本地Docker运行

运行如下Docker命令:

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \  
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \  
 topoo/ratel-allinone:0.2.0

_基于本地环境相应调整本地路径_
