# Quick Start

## Visit online

Visit：[https://ratel.ivipa.com](https://ratel.ivipa.com).

## Run with docker

Run docker command:

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \  
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \  
 topoo/ratel-allinone:0.2.0

_Please modify path as local environment_
