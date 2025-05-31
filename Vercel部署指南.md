# 🚀 Vercel 前端部署指南（完全免费）

## 第一步：注册Vercel账号

1. **访问：** https://vercel.com
2. **点击 "Start Deploying"**
3. **选择 "Continue with GitHub"** 
4. **授权Vercel访问您的GitHub仓库**

## 第二步：导入项目

1. **登录后，点击 "Add New..." → "Project"**
2. **在GitHub仓库列表中找到：** `fullstack-blog-system`
3. **点击 "Import"**

## 第三步：配置项目设置

### 基本配置：
- **Project Name:** `fullstack-blog-frontend`
- **Framework Preset:** `Create React App`
- **Root Directory:** `client` ⭐ **重要：选择client目录**

### 构建设置：
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### 环境变量：
点击 "Environment Variables" 添加：

```
Name: REACT_APP_API_URL
Value: https://whs-fullstack-blog-system.onrender.com
```

## 第四步：部署

1. **检查所有配置无误**
2. **点击 "Deploy"**
3. **等待部署完成（通常1-3分钟）**

## 第五步：获取前端地址

部署成功后，您会获得一个免费域名：
```
https://your-project-name.vercel.app
```

## ✅ 测试完整系统

1. **访问前端网站**
2. **测试文章列表**
3. **测试创建新文章**
4. **测试贪吃蛇游戏**

## 🎯 重要说明

- **完全免费，无限制**
- **自动SSL证书**
- **全球CDN加速**
- **自动从GitHub部署**
- **支持自定义域名**

## 🔧 故障排除

如果部署失败：

1. **确保选择了 `client` 作为根目录**
2. **检查环境变量是否正确设置**
3. **查看构建日志了解具体错误**

---

**最终结果：** 您的博客系统将完全运行在云端，全世界都可以访问！
