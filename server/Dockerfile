# 使用Node.js 18作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制应用源码
COPY . .

# 创建数据目录
RUN mkdir -p data

# 暴露端口
EXPOSE 5000

# 启动命令
CMD ["node", "server.js"]
