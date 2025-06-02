# 环境设置指南

## 安装 Node.js

在运行博客系统之前，您需要先安装 Node.js：

### 方法 1：从官网下载
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本（推荐）
3. 运行安装程序，按默认选项安装

### 方法 2：使用包管理器（推荐）
如果您使用 Windows，可以使用以下方法：

#### 使用 Chocolatey
```powershell
# 首先安装 Chocolatey（如果还没有）
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 安装 Node.js
choco install nodejs
```

#### 使用 winget
```powershell
winget install OpenJS.NodeJS
```

## 验证安装

安装完成后，重新打开终端并运行：
```bash
node --version
npm --version
```

如果显示版本号，说明安装成功。

## 启动项目

安装 Node.js 后，您可以：

### 方法 1：使用 VS Code 任务
1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Tasks: Run Task"
3. 选择要运行的任务：
   - "安装后端依赖" - 安装服务器依赖
   - "安装前端依赖" - 安装客户端依赖
   - "启动博客系统" - 同时启动前后端

### 方法 2：手动运行
1. 安装依赖：
```bash
# 安装后端依赖
cd server
npm install

# 安装前端依赖
cd ../client
npm install
```

2. 启动服务：
```bash
# 启动后端（端口 5000）
cd server
npm start

# 新开一个终端，启动前端（端口 3000）
cd client
npm start
```

## 访问应用

启动成功后：
- 前端应用：http://localhost:3000
- 后端 API：http://localhost:5000/api

## 故障排除

如果遇到问题：
1. 确保 Node.js 版本 >= 16
2. 检查端口 3000 和 5000 是否被占用
3. 删除 node_modules 文件夹后重新安装依赖
4. 查看终端中的错误信息
