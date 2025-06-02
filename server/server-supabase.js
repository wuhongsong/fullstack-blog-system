const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
let useSupabase = false;

// 初始化 Supabase
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  useSupabase = true;
  console.log('✅ Supabase 连接已初始化');
} else {
  console.log('⚠️  Supabase 环境变量未配置，使用文件存储模式');
}

// CORS配置 - 支持部署环境
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
    'http://localhost:3000',
    'https://fullstack-blog-system.vercel.app',
    'https://fullstack-blog-system-git-main-wuhongsongs-projects.vercel.app',
    'https://fullstack-blog-system-wuhongsongs-projects.vercel.app',
    // 添加更多可能的Vercel域名模式
    'https://fullstack-blog-system-git-main.vercel.app',
    'https://fullstack-blog-system-one.vercel.app',
    'https://fullstack-blog-system-beta.vercel.app',
    'https://fullstack-blog-system-alpha.vercel.app'
  ];

console.log('配置的允许源:', allowedOrigins);
console.log('数据存储模式:', useSupabase ? 'Supabase' : '文件存储');

// 中间件
app.use(cors({
  origin: function (origin, callback) {
    console.log('请求来源:', origin);
    
    // 允许没有origin的请求（比如移动应用、Postman等）
    if (!origin) return callback(null, true);
    
    // 开发环境允许所有源
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // 生产环境 - 宽松检查以便调试
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin === '*') return true;
      // 更宽松的域名匹配
      if (origin && origin.includes('vercel.app')) return true;
      if (origin && origin.includes('localhost')) return true;
      return allowedOrigin === origin;
    });
    
    console.log('CORS检查结果:', isAllowed ? '允许' : '拒绝', '来源:', origin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      // 在生产环境中临时允许所有vercel.app域名进行调试
      if (origin && origin.includes('vercel.app')) {
        console.log('临时允许Vercel域名:', origin);
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true
}));

app.use(express.json());

// 数据文件路径（文件存储模式使用）
const dataFile = path.join(__dirname, 'data', 'posts.json');

// 文件存储操作函数
const fileOperations = {
  readData() {
    try {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('文件读取数据失败:', error);
      return { posts: [] };
    }
  },

  writeData(data) {
    try {
      // 确保数据目录存在
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }
      
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('文件写入数据失败:', error);
      return false;
    }
  },

  initializeData() {
    // 确保数据目录存在
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // 初始化数据文件
    if (!fs.existsSync(dataFile)) {
      const initialData = {
        posts: [
          {
            id: "game-demo-001",
            title: "🎮 互动体验：博客中的贪吃蛇游戏",
            content: "欢迎来到我的互动博客！今天我想和大家分享一个特别的体验 - 直接在博客文章中玩游戏！\\n\\n这篇文章不仅仅是文字，还包含了一个完全可玩的贪吃蛇游戏。这展示了现代网页技术的强大能力，让博客不再只是静态的文字，而是可以包含各种互动元素。\\n\\n[SNAKE_GAME]\\n\\n这个贪吃蛇游戏的特点：\\n\\n🎯 **经典玩法**：使用方向键控制蛇的移动\\n🍎 **得分系统**：吃掉红色食物获得分数\\n💾 **本地存储**：最高分会保存在浏览器中\\n📱 **响应式设计**：支持桌面和移动设备\\n🎨 **现代UI**：漂亮的渐变色彩和动画效果\\n⚡ **速度控制**：5个速度等级可选择，从初学者🐌到极速⚡\\n\\n**技术实现：**\\n这个游戏是使用 React 开发的，完全嵌入在博客系统中。当你在文章内容中输入 [SNAKE_GAME] 标记时，系统会自动渲染游戏组件。\\n\\n**游戏控制：**\\n- 使用方向键（↑↓←→）控制蛇的移动\\n- 点击速度按钮调整游戏难度\\n- 游戏结束后按空格键重新开始\\n\\n这种设计模式可以扩展到其他类型的互动内容，比如：\\n- 计算器\\n- 投票系统  \\n- 数据可视化图表\\n- 在线工具\\n\\n希望这个小游戏能给你带来乐趣！如果你喜欢这种互动博客的概念，请告诉我你还想看到什么样的功能。",
            author: "互动博客创作者",
            created_at: "2025-05-31T10:30:00.000Z",
            updated_at: "2025-05-31T10:30:00.000Z"
          },
          {
            id: uuidv4(),
            title: "欢迎来到根娟一起跳",
            content: "这是一篇示例文章。您可以创建、编辑和删除文章。",
            author: "博主",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
      };
      this.writeData(initialData);
    }
  }
};

// Supabase 操作函数
const supabaseOperations = {
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase 获取文章失败:', error);
      throw error;
    }
    return data || [];
  },

  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Supabase 获取文章详情失败:', error);
      throw error;
    }
    return data;
  },

  async createPost(post) {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase 创建文章失败:', error);
      throw error;
    }
    return data;
  },

  async updatePost(id, updates) {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: updates.title,
        content: updates.content,
        author: updates.author,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase 更新文章失败:', error);
      throw error;
    }
    return data;
  },

  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase 删除文章失败:', error);
      throw error;
    }
    return true;
  },

  async initializeData() {
    try {
      const existingPosts = await this.getAllPosts();
      
      if (existingPosts.length === 0) {
        console.log('🔄 初始化 Supabase 默认数据...');
        
        const defaultPosts = [
          {
            id: "game-demo-001",
            title: "🎮 互动体验：博客中的贪吃蛇游戏",
            content: "欢迎来到我的互动博客！今天我想和大家分享一个特别的体验 - 直接在博客文章中玩游戏！\\n\\n这篇文章不仅仅是文字，还包含了一个完全可玩的贪吃蛇游戏。这展示了现代网页技术的强大能力，让博客不再只是静态的文字，而是可以包含各种互动元素。\\n\\n[SNAKE_GAME]\\n\\n这个贪吃蛇游戏的特点：\\n\\n🎯 **经典玩法**：使用方向键控制蛇的移动\\n🍎 **得分系统**：吃掉红色食物获得分数\\n💾 **本地存储**：最高分会保存在浏览器中\\n📱 **响应式设计**：支持桌面和移动设备\\n🎨 **现代UI**：漂亮的渐变色彩和动画效果\\n⚡ **速度控制**：5个速度等级可选择，从初学者🐌到极速⚡\\n\\n**技术实现：**\\n这个游戏是使用 React 开发的，完全嵌入在博客系统中。当你在文章内容中输入 [SNAKE_GAME] 标记时，系统会自动渲染游戏组件。\\n\\n**游戏控制：**\\n- 使用方向键（↑↓←→）控制蛇的移动\\n- 点击速度按钮调整游戏难度\\n- 游戏结束后按空格键重新开始\\n\\n这种设计模式可以扩展到其他类型的互动内容，比如：\\n- 计算器\\n- 投票系统  \\n- 数据可视化图表\\n- 在线工具\\n\\n希望这个小游戏能给你带来乐趣！如果你喜欢这种互动博客的概念，请告诉我你还想看到什么样的功能。",
            author: "互动博客创作者"
          },
          {
            id: uuidv4(),
            title: "欢迎来到根娟一起跳",
            content: "这是一篇示例文章。您可以创建、编辑和删除文章。",
            author: "博主"
          }
        ];
        
        for (const post of defaultPosts) {
          await this.createPost(post);
        }
        
        console.log('✅ Supabase 默认数据初始化完成');
      } else {
        console.log('💾 Supabase 中已有数据，跳过初始化');
      }
    } catch (error) {
      console.error('❌ Supabase 初始化数据失败:', error);
    }
  }
};

// 统一的数据操作接口
const dataOperations = {
  async getAllPosts() {
    if (useSupabase) {
      return await supabaseOperations.getAllPosts();
    } else {
      const data = fileOperations.readData();
      return data.posts;
    }
  },

  async getPostById(id) {
    if (useSupabase) {
      return await supabaseOperations.getPostById(id);
    } else {
      const data = fileOperations.readData();
      return data.posts.find(p => p.id === id);
    }
  },

  async createPost(post) {
    if (useSupabase) {
      return await supabaseOperations.createPost(post);
    } else {
      const data = fileOperations.readData();
      const newPost = {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      data.posts.unshift(newPost);
      fileOperations.writeData(data);
      return newPost;
    }
  },

  async updatePost(id, updates) {
    if (useSupabase) {
      return await supabaseOperations.updatePost(id, updates);
    } else {
      const data = fileOperations.readData();
      const postIndex = data.posts.findIndex(p => p.id === id);
      if (postIndex === -1) return null;
      
      data.posts[postIndex] = {
        ...data.posts[postIndex],
        ...updates,
        updated_at: new Date().toISOString()
      };
      fileOperations.writeData(data);
      return data.posts[postIndex];
    }
  },

  async deletePost(id) {
    if (useSupabase) {
      return await supabaseOperations.deletePost(id);
    } else {
      const data = fileOperations.readData();
      const postIndex = data.posts.findIndex(p => p.id === id);
      if (postIndex === -1) return false;
      
      data.posts.splice(postIndex, 1);
      fileOperations.writeData(data);
      return true;
    }
  }
};

// 初始化数据
if (useSupabase) {
  // 延迟初始化，确保连接稳定
  setTimeout(() => {
    supabaseOperations.initializeData();
  }, 2000);
} else {
  fileOperations.initializeData();
}

// API 路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    storage: useSupabase ? 'Supabase' : '文件存储',
    message: '根娟一起跳博客系统运行正常',
    features: {
      database: useSupabase ? '✅ Supabase PostgreSQL' : '⚠️ 本地文件存储',
      persistence: useSupabase ? '✅ 完全持久化' : '❌ 部署时重置'
    }
  });
});

// 获取所有文章
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await dataOperations.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('获取文章列表失败:', error);
    res.status(500).json({ error: '获取文章列表失败' });
  }
});

// 获取单篇文章
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await dataOperations.getPostById(id);
    
    if (!post) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('获取文章详情失败:', error);
    res.status(500).json({ error: '获取文章详情失败' });
  }
});

// 创建新文章
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' });
    }
    
    const newPost = {
      id: uuidv4(),
      title,
      content,
      author: author || '匿名用户'
    };
    
    const createdPost = await dataOperations.createPost(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('创建文章失败:', error);
    res.status(500).json({ error: '创建文章失败' });
  }
});

// 更新文章
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' });
    }
    
    const updates = {
      title,
      content,
      author: author || '匿名用户'
    };
    
    const updatedPost = await dataOperations.updatePost(id, updates);
    
    if (!updatedPost) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error('更新文章失败:', error);
    res.status(500).json({ error: '更新文章失败' });
  }
});

// 删除文章
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await dataOperations.deletePost(id);
    
    if (!success) {
      return res.status(404).json({ error: '文章不存在' });
    }
    
    res.json({ message: '文章删除成功' });
  } catch (error) {
    console.error('删除文章失败:', error);
    res.status(500).json({ error: '删除文章失败' });
  }
});

// 上传图片 endpoint（保留原有功能）
app.post('/api/upload', (req, res) => {
  // 模拟上传成功
  const mockImageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
  res.json({ 
    success: true, 
    url: mockImageUrl,
    message: '图片上传成功'
  });
});

// 默认路由
app.get('/', (req, res) => {
  res.json({ 
    message: '欢迎来到根娟一起跳博客系统 API',
    version: '2.1',
    storage: useSupabase ? 'Supabase' : '文件存储',
    features: {
      persistence: useSupabase ? '完全持久化' : '部署时重置',
      realtime: useSupabase ? '支持实时更新' : '不支持',
      scalability: useSupabase ? '高可扩展' : '有限制'
    },
    endpoints: {
      health: '/api/health',
      posts: '/api/posts',
      upload: '/api/upload'
    }
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在端口 ${PORT}`);
  console.log(`📊 存储模式: ${useSupabase ? 'Supabase' : '文件存储'}`);
  console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
  
  if (!useSupabase) {
    console.log('⚠️  注意: 当前使用文件存储，部署时数据会重置');
    console.log('💡 建议: 配置 Supabase 环境变量以启用持久化存储');
  }
});

// 导出应用（Vercel需要）
module.exports = app;
