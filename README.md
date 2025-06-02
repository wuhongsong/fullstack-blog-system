# 根娟一起跳 - 全栈博客系统

一个使用 React + Node.js 构建的现代化博客系统，支持文章管理、照片上传、互动游戏等功能。

## 🌐 在线访问

### 生产环境
- **前端网站**: https://fullstack-blog-system.vercel.app
- **后端API**: https://blog-backend-31hu4t4td-wuhongsongs-projects.vercel.app
- **API健康检查**: https://blog-backend-31hu4t4td-wuhongsongs-projects.vercel.app/api/health

### 部署平台
- **前端**: Vercel (自动部署)
- **后端**: Vercel (API部署)
- **代码仓库**: GitHub (自动同步)

## 项目特性

- 📝 **文章管理** - 创建、编辑、删除和查看文章
- 📸 **照片上传** - 支持重要照片上传和永久存储
- 🎮 **互动游戏** - 内置贪吃蛇游戏体验
- 🎨 **现代化 UI** - 响应式设计，支持移动端
- ⚡ **快速部署** - 基于 Vercel 的云端部署
- 💾 **数据持久化** - 服务器端JSON存储 + localStorage备份
- 🔄 **跨设备同步** - 数据在不同设备间自动同步
- 🛡️ **双重保障** - 服务器存储 + 本地备份策略

## 技术栈

### 前端
- React 18
- React Router v6
- Axios
- CSS3

### 后端
- Node.js + Express
- CORS (跨域支持)
- UUID (唯一标识符)
- Vercel Serverless Functions

## 🚀 在线体验

**立即访问**: https://fullstack-blog-system.vercel.app

### 主要功能
1. **📝 写文章** - 点击"写新文章"创建内容
2. **📸 上传照片** - 首页拖拽上传重要照片
3. **🎮 玩游戏** - 体验内置贪吃蛇游戏
4. **📱 响应式** - 支持手机、平板、电脑访问

## 🛠️ 本地开发

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 一键启动
```bash
# 克隆项目
git clone https://github.com/your-username/fullstack-react-node.git
cd fullstack-react-node

# 运行启动脚本
./start-blog.bat  # Windows
# 或
./start.sh       # Linux/Mac
```

### 手动启动

### 安装依赖

1. 安装后端依赖：
```bash
cd server
npm install
```

2. 安装前端依赖：
```bash
cd client
npm install
```

### 运行项目

1. 启动后端服务器（端口 5000）：
```bash
cd server
node server.js
```

2. 启动前端应用（端口 3000）：
```bash
cd client
npm start
```

访问 http://localhost:3000 查看应用。

## 📊 API 接口

### 文章相关
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/posts` | 获取所有文章 |
| GET | `/api/posts/:id` | 获取单篇文章 |
| POST | `/api/posts` | 创建新文章 |
| PUT | `/api/posts/:id` | 更新文章 |
| DELETE | `/api/posts/:id` | 删除文章 |

### 照片相关
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/upload-photo` | 上传照片 |
| GET | `/api/photos` | 获取所有照片 |
| GET | `/api/latest-photo` | 获取最新照片 |
| DELETE | `/api/photos/:id` | 删除照片 |

### 系统相关
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/` | 服务器信息 |

## 📁 项目结构

```
fullstack-react-node/
├── client/                 # React 前端应用
│   ├── public/
│   │   └── index.html     # 页面模板
│   ├── src/
│   │   ├── components/    # React 组件
│   │   │   ├── Header.js  # 导航栏
│   │   │   ├── PhotoUpload.js # 照片上传
│   │   │   ├── PostCard.js    # 文章卡片
│   │   │   └── SnakeGame.js   # 贪吃蛇游戏
│   │   ├── pages/         # 页面组件
│   │   │   ├── Home.js    # 首页
│   │   │   ├── CreatePost.js  # 创建文章
│   │   │   ├── EditPost.js    # 编辑文章
│   │   │   └── PostDetail.js  # 文章详情
│   │   ├── services/
│   │   │   └── api.js     # API服务
│   │   ├── App.js         # 主应用
│   │   ├── index.js       # 入口文件
│   │   └── index.css      # 全局样式
│   ├── package.json
│   └── vercel.json        # Vercel配置
├── server/                # Node.js 后端
│   ├── data/             # 数据存储
│   │   └── posts.json    # 文章和照片数据
│   ├── server.js         # Express 服务器
│   ├── package.json
│   └── vercel.json       # Vercel配置
├── README.md
└── 各种部署脚本和文档...
```

## 🎯 功能展示

### 📝 文章功能
- **首页** - 显示所有文章列表，支持快速操作
- **文章详情** - 完整显示文章内容和元信息  
- **创建文章** - 支持标题、内容、作者编辑
- **编辑文章** - 修改已有文章内容
- **删除确认** - 安全的删除操作
- **游戏集成** - 文章中可插入 `[SNAKE_GAME]` 标记显示游戏

### 📸 照片功能
- **拖拽上传** - 直接拖拽照片到上传区域
- **服务器存储** - 照片永久保存在云端
- **跨设备同步** - 在任何设备都能看到上传的照片
- **智能管理** - 自动保留最新5张照片
- **离线备份** - localStorage提供离线访问

### 🎮 游戏功能
- **贪吃蛇游戏** - 经典怀旧游戏体验
- **得分系统** - 记录和显示最高分
- **响应式控制** - 支持键盘和触屏操作
- **文章嵌入** - 游戏可以嵌入到文章内容中

## 🌐 部署架构

### 前端部署 (Vercel)
```
GitHub Repository
      ↓ (自动触发)
   Vercel Build
      ↓
React Build Process
      ↓
Static Site Deployment
      ↓
https://fullstack-blog-system.vercel.app
```

### 后端部署 (Vercel Serverless)
```
server/ 目录
      ↓
Vercel Serverless Functions
      ↓
Express API Deployment  
      ↓
https://blog-backend-31hu4t4td-wuhongsongs-projects.vercel.app
```

### 数据流
```
用户操作 → 前端React → API调用 → 后端Express → JSON存储 → 响应返回
```

## 🚀 部署说明

### 自动部署
项目已配置自动部署：
1. **代码推送** - 推送到GitHub main分支
2. **自动构建** - Vercel自动检测并构建
3. **立即上线** - 构建完成后自动部署

### 手动部署
```bash
# 前端部署
cd client
npx vercel --prod

# 后端部署  
cd server
npx vercel --prod
```

### 环境变量
- `NODE_ENV` - 环境标识 (production/development)
- `ALLOWED_ORIGINS` - 允许的跨域源
- `REACT_APP_API_URL` - 前端API地址配置

## 🔧 扩展功能

### 已实现功能 ✅
- ✅ 文章的CRUD操作
- ✅ 照片上传和存储
- ✅ 贪吃蛇游戏集成
- ✅ 响应式设计
- ✅ 跨设备数据同步
- ✅ 双重数据备份
- ✅ 云端自动部署
- ✅ API健康监控

### 未来可添加功能 🚀
- 🔐 用户认证和授权
- 🏷️ 文章分类和标签
- 💬 评论系统
- 🔍 文章搜索功能
- 📁 文件管理系统
- ✨ 富文本编辑器
- 📊 数据分析面板
- 🎨 主题切换功能
- 📧 邮件通知
- 🗃️ 数据库集成（MongoDB/PostgreSQL）

## 📞 技术支持

### 在线访问
- **网站**: https://fullstack-blog-system.vercel.app
- **API文档**: https://blog-backend-31hu4t4td-wuhongsongs-projects.vercel.app/

### 问题反馈
- 创建GitHub Issue
- 通过网站联系表单
- 邮件联系开发者

### 开发环境
- Node.js 20.11.0
- React 18
- Express 4.x
- Vercel CLI

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范
- 使用有意义的变量名和函数名
- 添加必要的注释
- 保持代码整洁和可读性
- 遵循React和Node.js最佳实践

## 📄 更新日志

### v2.0.0 - 2025年5月31日
- ✅ 重构博客名称为"根娟一起跳"
- ✅ 修复文章保存和刷新丢失问题
- ✅ 实现照片服务器端永久存储
- ✅ 添加双重数据备份策略
- ✅ 完善API接口文档
- ✅ 优化部署流程

### v1.0.0 - 初始版本
- ✅ 基础文章CRUD功能
- ✅ 照片上传功能
- ✅ 贪吃蛇游戏集成
- ✅ 响应式UI设计

## 📜 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**开发者**: GitHub Copilot  
**最后更新**: 2025年5月31日  
**版本**: v2.0.0
