# lettuce
利用 Api Blueprint，生成项目文档

### 功能

- 通过编辑`md`文件，能够显示接口的所有相关信息
- 默认启动一个`mock server` ，根据文档信息，模拟接口的返回信息


### 目录

```
├── Dockerfile
├── LICENSE
├── README.md
├── dist
├── docker-compose.yml
├── gulpfile.js
├── node_modules
├── package.json
├── run.sh
├── src
├── template
└── views

```

- views 放置所有文档的目录


### 安装

- 首先确定，[Docker客户端](https://download.docker.com/mac/stable/Docker.dmg) 已经安装
- 在当前项目的根目录，执行`docker-compose build`
- 镜像生成成功后，执行`docker-compose up`,进行npm包的安装,并默认启动静态文件服务器和MOCK服务器
- 访问`http:127.0.0.1:2025/ppa.html` 能够看到demo页面。
- 访问`http://127.0.0.1:2026/notes`能够看到模拟的返回数据
