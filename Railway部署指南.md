# 🚀 Railway 后端部署指南

## 第一步：注册Railway账号

1. **访问Railway官网：** https://railway.app
2. **点击 "Start a New Project"**
3. **选择 "Login with GitHub"** 使用您的GitHub账号登录
4. **授权Railway访问您的GitHub仓库**

## 第二步：创建新项目

1. **登录后，点击 "New Project"**
2. **选择 "Deploy from GitHub repo"**
3. **找到并选择：** `wuhongsong/fullstack-blog-system`
4. **点击 "Deploy Now"**

## 第三步：配置环境变量

1. **在Railway项目页面，点击您的服务**
2. **点击 "Variables" 标签页**
3. **添加以下环境变量：**

```
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=*
```

## 第四步：配置部署设置

1. **点击 "Settings" 标签页**
2. **在 "Build & Deploy" 部分：**
   - Root Directory: `/` (保持默认)
   - Build Command: `cd server && npm install`
   - Start Command: `node server/server.js`

## 第五步：等待部署完成

1. **部署通常需要2-5分钟**
2. **在 "Deployments" 标签页可以查看部署进度**
3. **部署成功后，您会看到一个绿色的 ✅ 状态**

## 第六步：获取API地址

1. **部署完成后，点击 "Settings" 标签页**
2. **在 "Domains" 部分，您会看到自动生成的域名**
3. **复制这个域名，格式类似：** `https://your-app-name.up.railway.app`

## 🎯 重要说明

- **免费用户每月有500小时的运行时间**
- **应用会自动休眠，访问时会唤醒（可能需要几秒钟）**
- **支持自定义域名（付费功能）**

## 🔧 故障排除

如果部署失败：

1. **检查 "Deployments" 页面的日志**
2. **确保package.json中的dependencies正确**
3. **确认Node.js版本兼容性**

## ✅ 部署完成检查

部署成功后，您的API地址应该是：
`https://your-app-name.up.railway.app/api/posts`

访问这个地址应该能看到博客文章列表。

---

**下一步：** 部署前端到Vercel，并配置API地址指向Railway。
