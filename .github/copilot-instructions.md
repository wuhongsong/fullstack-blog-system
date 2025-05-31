<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 博客系统项目说明

这是一个全栈博客系统项目，包含：

## 技术栈
- 前端：React 18 + React Router + Axios
- 后端：Node.js + Express
- 数据存储：JSON 文件（可扩展为数据库）

## 项目结构
- `/client` - React 前端应用
- `/server` - Node.js 后端 API

## 功能特性
- 文章列表展示
- 文章详情查看
- 创建新文章
- 编辑已有文章
- 删除文章
- 响应式设计

## 开发指南
- 前端运行在端口 3000
- 后端 API 运行在端口 5000
- 使用 proxy 配置实现前后端通信
- 数据存储在 `/server/data/posts.json` 文件中

## API 接口
- GET /api/posts - 获取所有文章
- GET /api/posts/:id - 获取单篇文章
- POST /api/posts - 创建新文章
- PUT /api/posts/:id - 更新文章
- DELETE /api/posts/:id - 删除文章
