# Ratel Web

## About Ratel Web

Ratel is open source general diagram editor for flowchart, UML and other diagram tpyes. It can work online or offline(without network).
Ratel Web is frontend of Ratel. There are 3 sub projects: Ratel-Web(frontend), Ratel-Server(backend) and Ratel-deployment(deployment).

Demo site: <https://ratel.ivipa.com>

## Try

### Try online demo (in progress)

Try oneline demo.

### Try all-in-one docker image locally

docker run -d --name ratel -p 3306:3306 -p 6379:6379 -p 8000:8000 -p 8080:8080 -p 8081:8081 \
    -p 9000:9000 -p 9001:9001 -v ~/works/ratel/logs:/opt/logs -v ~/works/ratel/minio:/opt/minio/data \
    topoo/ratel-allinone:0.1

### Try all-in-one build with docker image

Pleae check Ratel-Deployment

## Build & Run locally

1. Install Node, require version 20.x. Other version may fail so far.
2. Build: npm run build
3. Run: npm run start

## Build with Electron for desktop installation

1. Run: npm run electron:build
2. Enter /app and Run: npm run electron:win for windows (or npm run electron:mac for MacOS)
