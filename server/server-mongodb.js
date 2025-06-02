const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/database');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 5000;

// 数据存储模式：'mongodb' 或 'file'
const STORAGE_MODE = process.env.STORAGE_MODE || 'mongodb';

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
console.log('数据存储模式:', STORAGE_MODE);

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

// 连接数据库（如果使用MongoDB模式）
if (STORAGE_MODE === 'mongodb') {
  connectDB();
}

// 文件存储模式的初始化
const initializeFileStorage = () => {
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
          createdAt: "2025-05-31T10:30:00.000Z",
          updatedAt: "2025-05-31T10:30:00.000Z"
        },
        {
          id: uuidv4(),
          title: "欢迎来到根娟一起跳",
          content: "这是一篇示例文章。您可以创建、编辑和删除文章。",
          author: "博主",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
  }
};

// MongoDB模式的初始化
const initializeMongoStorage = async () => {
  try {
    const postCount = await Post.countDocuments();
    
    if (postCount === 0) {
      console.log('初始化MongoDB数据...');
      
      const initialPosts = [
        {
          id: "game-demo-001",
          title: "🎮 互动体验：博客中的贪吃蛇游戏",
          content: "欢迎来到我的互动博客！今天我想和大家分享一个特别的体验 - 直接在博客文章中玩游戏！\\n\\n这篇文章不仅仅是文字，还包含了一个完全可玩的贪吃蛇游戏。这展示了现代网页技术的强大能力，让博客不再只是静态的文字，而是可以包含各种互动元素。\\n\\n[SNAKE_GAME]\\n\\n这个贪吃蛇游戏的特点：\\n\\n🎯 **经典玩法**：使用方向键控制蛇的移动\\n🍎 **得分系统**：吃掉红色食物获得分数\\n💾 **本地存储**：最高分会保存在浏览器中\\n📱 **响应式设计**：支持桌面和移动设备\\n🎨 **现代UI**：漂亮的渐变色彩和动画效果\\n⚡ **速度控制**：5个速度等级可选择，从初学者🐌到极速⚡\\n\\n**技术实现：**\\n这个游戏是使用 React 开发的，完全嵌入在博客系统中。当你在文章内容中输入 [SNAKE_GAME] 标记时，系统会自动渲染游戏组件。\\n\\n**游戏控制：**\\n- 使用方向键（↑↓←→）控制蛇的移动\\n- 点击速度按钮调整游戏难度\\n- 游戏结束后按空格键重新开始\\n\\n这种设计模式可以扩展到其他类型的互动内容，比如：\\n- 计算器\\n- 投票系统  \\n- 数据可视化图表\\n- 在线工具\\n\\n希望这个小游戏能给你带来乐趣！如果你喜欢这种互动博客的概念，请告诉我你还想看到什么样的功能。",
          author: "互动博客创作者",
          createdAt: new Date("2025-05-31T10:30:00.000Z"),
          updatedAt: new Date("2025-05-31T10:30:00.000Z")
        },
        {
          id: uuidv4(),
          title: "欢迎来到根娟一起跳",
          content: "这是一篇示例文章。您可以创建、编辑和删除文章。",
          author: "博主",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await Post.insertMany(initialPosts);
      console.log('MongoDB初始数据创建完成');
    } else {
      console.log('MongoDB中已有数据，跳过初始化');
    }
  } catch (error) {
    console.error('MongoDB初始化失败:', error);
  }
};

// 数据操作函数
const readData = async () => {
  if (STORAGE_MODE === 'mongodb') {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return { posts };
    } catch (error) {
      console.error('MongoDB读取数据失败:', error);
      return { posts: [] };
    }
  } else {
    try {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('文件读取数据失败:', error);
      return { posts: [] };
    }
  }
};

const writeData = async (data) => {
  if (STORAGE_MODE === 'mongodb') {
    // MongoDB模式下，数据已通过模型操作保存，无需额外写入
    return true;
  } else {
    try {
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('文件写入数据失败:', error);
      return false;
    }
  }
};

// 初始化存储
if (STORAGE_MODE === 'mongodb') {
  // MongoDB初始化会在连接成功后执行
  setTimeout(initializeMongoStorage, 2000);
} else {
  initializeFileStorage();
}

// API 路由

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    storage: STORAGE_MODE,
    message: '根娟一起跳博客系统运行正常'
  });
});

// 获取所有文章
app.get('/api/posts', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.posts);
  } catch (error) {
    console.error('获取文章列表失败:', error);
    res.status(500).json({ error: '获取文章列表失败' });
  }
});

// 获取单篇文章
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (STORAGE_MODE === 'mongodb') {
      const post = await Post.findOne({ id });
      if (!post) {
        return res.status(404).json({ error: '文章不存在' });
      }
      res.json(post);
    } else {
      const data = await readData();
      const post = data.posts.find(p => p.id === id);
      if (!post) {
        return res.status(404).json({ error: '文章不存在' });
      }
      res.json(post);
    }
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
      author: author || '匿名用户',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (STORAGE_MODE === 'mongodb') {
      const post = new Post(newPost);
      await post.save();
      res.status(201).json(post);
    } else {
      const data = await readData();
      data.posts.unshift(newPost);
      await writeData(data);
      res.status(201).json(newPost);
    }
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
    
    if (STORAGE_MODE === 'mongodb') {
      const post = await Post.findOneAndUpdate(
        { id },
        {
          title,
          content,
          author: author || '匿名用户',
          updatedAt: new Date()
        },
        { new: true }
      );
      
      if (!post) {
        return res.status(404).json({ error: '文章不存在' });
      }
      
      res.json(post);
    } else {
      const data = await readData();
      const postIndex = data.posts.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        return res.status(404).json({ error: '文章不存在' });
      }
      
      data.posts[postIndex] = {
        ...data.posts[postIndex],
        title,
        content,
        author: author || data.posts[postIndex].author,
        updatedAt: new Date().toISOString()
      };
      
      await writeData(data);
      res.json(data.posts[postIndex]);
    }
  } catch (error) {
    console.error('更新文章失败:', error);
    res.status(500).json({ error: '更新文章失败' });
  }
});

// 删除文章
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (STORAGE_MODE === 'mongodb') {
      const post = await Post.findOneAndDelete({ id });
      
      if (!post) {
        return res.status(404).json({ error: '文章不存在' });
      }
      
      res.json({ message: '文章删除成功' });
    } else {
      const data = await readData();
      const postIndex = data.posts.findIndex(p => p.id === id);
      
      if (postIndex === -1) {
        return res.status(404).json({ error: '文章不存在' });
      }
      
      data.posts.splice(postIndex, 1);
      await writeData(data);
      res.json({ message: '文章删除成功' });
    }
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
    version: '2.0',
    storage: STORAGE_MODE,
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
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`存储模式: ${STORAGE_MODE}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});

// 导出应用（Vercel需要）
module.exports = app;
