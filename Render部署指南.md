# 🚀 Render.com 后端部署指南（完全免费）

## 第一步：注册Render账号

1. **访问：** https://render.com
2. **点击 "Get Started for Free"**
3. **选择 "Sign up with GitHub"** 
4. **授权Render访问您的GitHub仓库**

## 第二步：创建Web Service

1. **登录后，点击 "New +"**
2. **选择 "Web Service"**
3. **在右侧找到您的仓库：** `wuhongsong/fullstack-blog-system`
4. **点击 "Connect"**

## 第三步：配置服务设置

填写以下配置信息：

### 基本设置
- **Name:** `fullstack-blog-backend`
- **Region:** `Oregon (US West)` 或 `Frankfurt (EU Central)`
- **Branch:** `main`
- **Root Directory:** 留空（使用根目录）

### 构建和部署设置
- **Runtime:** `Node`
- **Build Command:** 
  ```
  cd server && npm install
  ```
- **Start Command:**
  ```
  node server/server.js
  ```

### 环境变量
点击 "Advanced" 展开高级选项，添加环境变量：

```
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=*
```

### 计划选择
- **选择 "Free"** （$0/月）

## 第四步：部署

1. **检查所有配置无误**
2. **点击 "Create Web Service"**
3. **等待部署完成（通常2-5分钟）**

## 第五步：获取API地址

部署成功后，您会获得一个免费域名：
```
https://your-service-name.onrender.com
```

## ✅ 测试部署

访问以下地址测试API：
```
https://your-service-name.onrender.com/api/posts
```

应该能看到博客文章列表JSON数据。

## 🔧 故障排除

如果部署失败：

1. **查看 "Logs" 标签页的错误信息**
2. **确保 server/package.json 包含所有依赖**
3. **检查 Node.js 版本兼容性**

## 🎯 重要说明

- **完全免费，无时间限制**
- **闲置15分钟后自动休眠**
- **首次访问可能需要30-60秒唤醒**
- **支持自定义域名**
- **自动SSL证书**

---

**下一步：** 部署前端到Vercel，并配置API地址。
