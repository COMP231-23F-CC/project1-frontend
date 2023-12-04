# 使用官方Node.js作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制package.json并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件
COPY . .

# 构建应用程序
RUN npm run build

# 使用nginx来部署应用
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx服务器
CMD ["nginx", "-g", "daemon off;"]
