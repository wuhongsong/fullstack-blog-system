## 🚨 Node.js 安装必需

看起来您的系统中Node.js没有正确安装或配置。

### 📥 立即安装Node.js

**方法一：官网下载（最简单）**
1. 访问：https://nodejs.org/
2. 点击左侧绿色的 "LTS" 版本下载
3. 运行下载的 .msi 安装文件
4. 安装时确保勾选 "Add to PATH" 选项
5. 安装完成后**重启命令行**

**方法二：使用包管理器**
```powershell
# 如果有winget
winget install OpenJS.NodeJS

# 如果有Chocolatey  
choco install nodejs
```

### ✅ 验证安装

安装完成后，在新的PowerShell窗口中运行：
```powershell
node --version
npm --version
```

如果看到版本号，说明安装成功！

### 🚀 安装成功后启动博客

1. **安装依赖**：
   ```powershell
   # 后端依赖
   cd server
   npm install
   
   # 前端依赖
   cd ../client
   npm install
   ```

2. **启动服务器**：
   ```powershell
   # 启动后端（新窗口）
   cd server
   npm start
   
   # 启动前端（另一个新窗口）
   cd client
   npm start
   ```

3. **访问应用**：http://localhost:3000

### 🔧 如果遇到问题

1. **确保重启了命令行** - 这是最常见的问题
2. **检查PATH环境变量** - Node.js应该在系统PATH中
3. **以管理员身份运行** - 某些情况下需要管理员权限

---

**当前状态**：❌ Node.js 未检测到
**下一步**：按上述方法安装Node.js
