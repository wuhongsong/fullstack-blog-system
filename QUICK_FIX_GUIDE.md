# 🚀 5分钟解决数据持久化问题

## 问题
每次部署后，用户创建的文章都会丢失，恢复到初始状态。

## 解决方案
使用 **Supabase 免费数据库** - 5分钟设置，永久解决！

---

## ⚡ 快速设置步骤

### 1️⃣ 创建 Supabase 项目（2分钟）
1. 访问 https://supabase.com → 用 GitHub 登录
2. 点击 "New project" 
3. 填写：
   - **Name**: `gen-juan-blog`
   - **Password**: 设置密码（记住）
   - **Region**: `Northeast Asia (Tokyo)`
   - **Plan**: `Free`
4. 等待项目创建完成

### 2️⃣ 创建数据表（1分钟）
1. 左侧菜单 → "SQL Editor" → "New query"
2. 复制粘贴以下 SQL 并点击 "Run"：

```sql
CREATE TABLE posts (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all operations for posts" ON posts FOR ALL USING (true);
```

### 3️⃣ 获取连接信息（30秒）
1. 左侧菜单 → "Settings" → "API"
2. 复制两个值：
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJ...` (长字符串)

### 4️⃣ 配置 Vercel 环境变量（1分钟）
1. 访问 https://vercel.com → 进入你的项目
2. Settings → Environment Variables → 添加：

```
SUPABASE_URL = 你的Project URL
SUPABASE_ANON_KEY = 你的anon public key
```

### 5️⃣ 部署更新（1分钟）
在服务器目录运行：
```bash
deploy-supabase.bat
```

---

## ✅ 验证成功

访问 `https://你的域名.vercel.app/api/health`

看到这个说明成功：
```json
{
  "storage": "Supabase",
  "features": {
    "persistence": "✅ 完全持久化"
  }
}
```

## 🎉 完成！

现在您的博客拥有：
- ✅ **永久数据存储** - 再也不会丢失文章
- ✅ **完全免费** - Supabase 免费额度足够使用
- ✅ **高性能** - 专业的 PostgreSQL 数据库
- ✅ **实时同步** - 多用户可同时操作

## 📋 检查清单

- [ ] Supabase 项目创建成功
- [ ] 数据表创建完成
- [ ] Vercel 环境变量设置
- [ ] 部署成功
- [ ] /api/health 显示 Supabase
- [ ] 创建测试文章
- [ ] 重新部署后文章仍存在

---

**遇到问题？** 查看完整指南：`SUPABASE_SETUP_GUIDE.md`
