# Environment Setup

## Prepare Environment

### ratel-web

Node 20.x or newer

### ratel-server

JDK21、Spring Boot 3.3.X and Maven 3.9.X

### ratel-deployment

Docker environment

## Local building

### ratel-web build

Debug & Run：npm run start

Build desktop commands：

- Run：npm run electron:build

- Enter to /app and run： npm run electron:win (Windows版本桌面程序)

- Enter to /app and run： npm run electron:mac (MacOS版本桌面程序)

- Enter to /app and run： npm run electron:linux (Linux/Unbuntu版本桌面程序)

### ratel-server build

Build：mvn package -DskipTests

Debug/RUn requires MySQL, Redis and Minio

#### Use Docker for Mysql

docker run --name mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

#### Use Docker for Redis

docker run --name redis -p 6380:6379 -d redis

#### Use Docker for Minio

docker run -p 9000:9000 -p 9090:9090 --name minio -v ~/data/minio:/data \
 -e "MINIO_ROOT_USER=root" \
 -e "MINIO_ROOT_PASSWORD=password" \
 quay.io/minio/minio server /data --console-address ":9090"

#### Start

    java -jar ratel-system-server/target/ratel-system-server-0.1.0.jar

### ratel-deployment

#### Prepare

Support build for Linux or Macos

Checkout code, It is assumed that ratel-web、ratel-server和ratel-deployment are checked out to same folder.

Run script ./prepare.sh

#### Build docker image

#### Build basic image

docker build -t ratel-basic:1.0.0 -f Dockerfile-basic .

#### Build all-in-one image

docker build -t ratel-allinone:0.1.0 -f Dockerfile-allinone --build-arg RATEL_VERSION=0.1.0 .

#### Debug & run docker image

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 ratel-allinone:0.1.0

#### Debug & run docker image (with local logs & Minio)

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
 ratel-allinone:0.1.0

#### Debug & run docker image(with local logs & Minio & Mysql, Mysql may fail)

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
 -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
 -v ~/works/ratel/mysql:/var/lib/mysql ratel-allinone:0.1.0

#### Docker Debug

docker exec -it ratel sh
