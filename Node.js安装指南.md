# Node.js 安装指南 🚀

## 当前状态
❌ Node.js 未安装
❌ npm 不可用

## 安装步骤

### 方法一：官网下载（推荐）

1. **访问 Node.js 官网**
   - 网址：https://nodejs.org/
   - 选择 LTS 版本（长期支持版本）

2. **下载安装程序**
   - 点击 "Download for Windows" 
   - 下载 .msi 安装文件

3. **运行安装程序**
   - 双击下载的 .msi 文件
   - 按照安装向导完成安装
   - 确保勾选 "Add to PATH" 选项

4. **验证安装**
   - 重新打开命令行
   - 运行：`node --version`
   - 运行：`npm --version`

### 方法二：使用 Chocolatey

如果您有 Chocolatey 包管理器：
```powershell
choco install nodejs
```

### 方法三：使用 winget

如果您有 winget：
```powershell
winget install OpenJS.NodeJS
```

## 安装后操作

1. **重启命令行**
   - 关闭当前命令行窗口
   - 重新打开 PowerShell 或命令提示符

2. **验证安装**
   ```bash
   node --version
   npm --version
   ```

3. **安装项目依赖**
   ```bash
   # 进入项目目录
   cd c:\Users\wojia\fullstack-react-node
   
   # 安装后端依赖
   cd server
   npm install
   
   # 安装前端依赖  
   cd ../client
   npm install
   ```

4. **启动项目**
   ```bash
   # 启动后端（新建一个命令行窗口）
   cd c:\Users\wojia\fullstack-react-node\server
   npm start
   
   # 启动前端（新建另一个命令行窗口）
   cd c:\Users\wojia\fullstack-react-node\client
   npm start
   ```

## 推荐的 Node.js 版本

- **LTS 版本**：18.x 或 20.x
- **最低要求**：16.x

## 故障排除

### 如果安装后仍然提示 "npm 无法识别"：

1. **检查环境变量**
   - 打开"系统属性" > "高级" > "环境变量"
   - 确认 PATH 中包含 Node.js 安装路径

2. **重启计算机**
   - 有时需要重启以刷新环境变量

3. **手动添加 PATH**
   - Node.js 默认安装路径：`C:\Program Files\nodejs\`
   - 添加到系统 PATH 环境变量

## 安装完成后

访问 http://localhost:3000 查看您的博客系统！

---

**需要帮助？** 
- Node.js 官方文档：https://nodejs.org/en/docs/
- 安装问题：https://docs.npmjs.com/troubleshooting
