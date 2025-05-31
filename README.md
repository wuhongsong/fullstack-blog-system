# 全栈博客系统

一个使用 React + Node.js 构建的现代化博客系统，支持文章的创建、编辑、删除和查看功能。

## 项目特性

- 📝 **文章管理** - 创建、编辑、删除和查看文章
- 🎨 **现代化 UI** - 响应式设计，支持移动端
- ⚡ **快速开发** - 基于 React 和 Express 的简洁架构
- 💾 **数据持久化** - JSON 文件存储，易于扩展为数据库
- 🔄 **实时更新** - 前后端分离，API 驱动

## 技术栈

### 前端
- React 18
- React Router v6
- Axios
- CSS3

### 后端
- Node.js
- Express
- CORS
- UUID

## 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖

1. 安装后端依赖：
```bash
cd server
npm install
```

2. 安装前端依赖：
```bash
cd ../client
npm install
```

### 运行项目

1. 启动后端服务器（端口 5000）：
```bash
cd server
npm run dev
```

2. 启动前端应用（端口 3000）：
```bash
cd client
npm start
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
fullstack-react-node/
├── client/                 # React 前端应用
│   ├── public/
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── pages/          # 页面组件
│   │   ├── services/       # API 服务
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js 后端
│   ├── data/              # 数据存储目录
│   ├── server.js          # Express 服务器
│   └── package.json
└── README.md
```

## API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/posts` | 获取所有文章 |
| GET | `/api/posts/:id` | 获取单篇文章 |
| POST | `/api/posts` | 创建新文章 |
| PUT | `/api/posts/:id` | 更新文章 |
| DELETE | `/api/posts/:id` | 删除文章 |

## 功能展示

- **首页** - 显示所有文章列表，支持快速操作
- **文章详情** - 完整显示文章内容和元信息
- **创建文章** - 简洁的文章编辑器
- **编辑文章** - 修改已有文章内容
- **删除确认** - 安全的删除操作

## 部署说明

### 生产环境构建

1. 构建前端：
```bash
cd client
npm run build
```

2. 配置后端服务静态文件：
```javascript
// 在 server.js 中添加
app.use(express.static(path.join(__dirname, '../client/build')));
```

### 环境变量

可以通过环境变量配置：
- `PORT` - 后端服务器端口（默认 5000）

## 扩展功能

未来可以添加的功能：
- 用户认证和授权
- 文章分类和标签
- 评论系统
- 搜索功能
- 文件上传
- 富文本编辑器
- 数据库集成（MongoDB/PostgreSQL）

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
