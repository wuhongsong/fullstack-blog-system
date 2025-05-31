# 🔧 修复API调用问题的步骤

## 问题分析
前端可以打开但显示"获取文章列表失败"，通常是以下原因：

1. **API路径配置错误** ✅ 已修复
2. **CORS跨域问题** 🔧 需要修复
3. **环境变量未正确设置** 🔧 需要修复

## 🚀 立即执行的修复步骤

### 第一步：更新Render环境变量

1. **登录Render控制台：** https://render.com
2. **进入您的后端服务项目页面**
3. **点击 "Environment" 标签页**
4. **更新环境变量：**

```
NODE_ENV=production
PORT=10000
ALLOWED_ORIGINS=*,https://vercel.app,https://*.vercel.app,https://your-project.vercel.app
```

**重要：** 将 `your-project` 替换为您实际的Vercel项目名称

### 第二步：更新Vercel环境变量

1. **登录Vercel控制台**
2. **进入您的前端项目**
3. **点击 "Settings" → "Environment Variables"**
4. **添加/更新：**

```
Name: REACT_APP_API_URL
Value: https://whs-fullstack-blog-system.onrender.com/api
Environment: Production
```

### 第三步：重新部署

1. **在Render：** 点击 "Manual Deploy" 重新部署后端
2. **在Vercel：** 点击 "Deployments" → "Redeploy" 重新部署前端

## 🧪 测试步骤

1. **等待两个服务都重新部署完成**
2. **访问您的前端网站**
3. **打开浏览器开发者工具（F12）**
4. **查看 Network 标签页，检查API请求状态**

### 期望结果：
- ✅ API请求返回200状态码
- ✅ 能看到文章列表
- ✅ 所有功能正常工作

## 🔍 如果仍有问题

请告诉我：
1. 浏览器控制台的具体错误信息
2. Network标签页中API请求的状态码
3. 您的Vercel项目完整URL

---

**请按照以上步骤执行，然后告诉我结果！** 🎯
