# Supabase 免费数据库设置指南

## 🎯 一步步解决数据持久化问题

### 第一步：创建 Supabase 账户

1. **访问官网**
   - 打开 https://supabase.com
   - 点击 "Start your project" 或 "Sign up"

2. **注册账户**
   - 使用 GitHub 账户登录（推荐）
   - 或使用邮箱注册

### 第二步：创建项目

1. **新建项目**
   - 点击 "New project"
   - 选择组织（默认即可）

2. **项目配置**
   - **Name**: `gen-juan-blog`
   - **Database Password**: 设置一个强密码（请记住）
   - **Region**: 选择 `Northeast Asia (Tokyo)` 最近
   - **Pricing Plan**: 选择 `Free` 免费计划

3. **等待创建**
   - 创建过程需要 1-2 分钟
   - 显示 "Setting up your project..." 时请等待

### 第三步：创建数据表

1. **进入 SQL Editor**
   - 在左侧菜单点击 "SQL Editor"
   - 点击 "New query"

2. **执行建表 SQL**
   ```sql
   -- 创建博客文章表
   CREATE TABLE posts (
     id VARCHAR PRIMARY KEY,
     title VARCHAR NOT NULL,
     content TEXT NOT NULL,
     author VARCHAR NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- 创建更新时间触发器
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = NOW();
       RETURN NEW;
   END;
   $$ language 'plpgsql';

   CREATE TRIGGER update_posts_updated_at 
   BEFORE UPDATE ON posts 
   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

   -- 启用行级安全策略（RLS）
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- 允许所有操作（暂时，生产环境建议细化权限）
   CREATE POLICY "Enable all operations for posts" ON posts
   FOR ALL USING (true);
   ```

3. **运行 SQL**
   - 点击右下角 "Run" 按钮
   - 看到 "Success. No rows returned" 表示成功

### 第四步：获取连接信息

1. **进入项目设置**
   - 点击左侧菜单的 "Settings"
   - 选择 "API"

2. **复制连接信息**
   - **Project URL**: 复制 URL（类似 `https://xxx.supabase.co`）
   - **anon public key**: 复制 API Key（以 `eyJ` 开头的长字符串）

### 第五步：配置 Vercel 环境变量

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 进入你的博客项目

2. **设置环境变量**
   - 进入项目 → Settings → Environment Variables
   - 添加以下变量：

   ```
   SUPABASE_URL = https://你的项目ID.supabase.co
   SUPABASE_ANON_KEY = 你的anon_key
   ```

3. **更新部署配置**
   - 修改 `vercel.json` 使用新的服务器文件

### 第六步：部署更新

1. **更新 vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server-supabase.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "server-supabase.js"
       },
       {
         "src": "/(.*)",
         "dest": "server-supabase.js"
       }
     ]
   }
   ```

2. **重新部署**
   ```bash
   vercel --prod
   ```

### 第七步：验证配置

1. **检查健康状态**
   - 访问: `https://你的域名.vercel.app/api/health`
   - 应该看到:
   ```json
   {
     "status": "ok",
     "storage": "Supabase",
     "features": {
       "database": "✅ Supabase PostgreSQL",
       "persistence": "✅ 完全持久化"
     }
   }
   ```

2. **测试数据持久化**
   - 创建一篇新文章
   - 重新部署后检查文章是否还在

## 🎉 完成！

现在您的博客系统已经拥有：
- ✅ **完全持久化存储** - 数据永不丢失
- ✅ **免费使用** - Supabase 免费计划足够个人博客
- ✅ **高性能** - PostgreSQL 数据库
- ✅ **实时同步** - 支持多用户同时操作
- ✅ **可扩展性** - 未来可以添加用户系统、评论等

## 💡 Supabase 免费计划限制

- **数据库大小**: 500MB
- **带宽**: 5GB/月
- **API 请求**: 50,000 次/月
- **存储**: 1GB

对于个人博客来说，这些限制完全足够！

## 🔧 故障排除

### 连接错误
- 检查 SUPABASE_URL 和 SUPABASE_ANON_KEY 是否正确
- 确认数据表已创建
- 检查 RLS 策略是否启用

### 权限错误
- 确认已执行 RLS 策略 SQL
- 检查 API key 是否是 anon key（不是 service_role key）

### 部署错误
- 确认 `vercel.json` 指向正确的服务器文件
- 检查环境变量是否在 Vercel 中正确设置

## 📞 获取帮助

如果遇到问题，请：
1. 检查浏览器控制台错误信息
2. 查看 Vercel 部署日志
3. 访问 `/api/health` 检查服务状态
