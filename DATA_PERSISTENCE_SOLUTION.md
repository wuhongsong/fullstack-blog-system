# 数据持久化解决方案

## 问题描述
Vercel是无服务器环境，每次部署都会重置文件系统，导致所有用户创建的文章和修改在重新部署后丢失。

## 解决方案

### 方案一：MongoDB Atlas（推荐）

**优点：**
- 完全持久化，永不丢失数据
- 免费额度足够个人博客使用
- 支持高并发访问
- 专业的数据备份和恢复

**设置步骤：**

1. **创建MongoDB Atlas账户**
   - 访问 https://cloud.mongodb.com
   - 注册免费账户
   - 创建新的集群（选择免费的M0 Sandbox）

2. **配置数据库访问**
   - 创建数据库用户
   - 设置网络访问（允许所有IP：0.0.0.0/0）
   - 获取连接字符串

3. **部署到Vercel**
   ```bash
   # 设置环境变量
   vercel env add STORAGE_MODE
   # 输入: mongodb
   
   vercel env add MONGODB_URI
   # 输入你的MongoDB连接字符串: mongodb+srv://username:password@cluster.mongodb.net/blog-system
   
   # 重新部署
   vercel --prod
   ```

4. **验证配置**
   - 访问 https://你的域名.vercel.app/api/health
   - 检查返回的storage字段是否为"mongodb"

### 方案二：GitHub作为数据存储

**特点：**
- 利用GitHub作为数据仓库
- 通过GitHub API读写数据
- 完全免费且可靠

**实施方法：**
- 创建专门的GitHub仓库存储文章数据
- 使用GitHub API进行数据操作
- 支持版本控制和历史记录

### 方案三：其他云数据库

**选择：**
- Supabase（PostgreSQL，免费额度大）
- Firebase Firestore（Google，免费额度）
- PlanetScale（MySQL，免费额度）

## 当前配置

已创建的文件：
- `server-mongodb.js` - 支持MongoDB的新服务器文件
- `models/Post.js` - MongoDB数据模型
- `config/database.js` - 数据库连接配置
- `.env.example` - 环境变量示例

## 使用说明

### 切换到MongoDB模式：
1. 将 `vercel.json` 中的入口改为 `server-mongodb.js`
2. 设置环境变量 `STORAGE_MODE=mongodb`
3. 配置 `MONGODB_URI` 环境变量

### 保持文件模式（开发测试）：
1. 保持 `vercel.json` 使用 `server.js`
2. 设置环境变量 `STORAGE_MODE=file`（或不设置）

## 注意事项

1. **数据迁移**：如果已有数据需要从文件迁移到MongoDB，需要手动导入
2. **备份**：建议定期备份MongoDB数据
3. **监控**：设置MongoDB监控和告警
4. **限制**：免费MongoDB有连接数和存储限制

## 测试建议

1. 先在开发环境测试MongoDB连接
2. 确认数据读写正常
3. 测试部署后数据持久性
4. 验证所有API功能正常
