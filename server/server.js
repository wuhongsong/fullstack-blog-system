const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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
    console.log('允许的源列表:', allowedOrigins);
    
    // 临时允许所有请求来调试CORS问题
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// 数据文件路径
const dataFile = path.join(__dirname, 'data', 'posts.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 初始化数据文件
if (!fs.existsSync(dataFile)) {  const initialData = {
    posts: [
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

// 读取数据
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return { posts: [] };
  }
};

// 写入数据
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
  }
};

// API 路由

// 获取所有文章
app.get('/api/posts', (req, res) => {
  const data = readData();
  res.json(data.posts);
});

// 获取单篇文章
app.get('/api/posts/:id', (req, res) => {
  const data = readData();
  const post = data.posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ message: '文章未找到' });
  }
  
  res.json(post);
});

// 创建新文章
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: '标题和内容不能为空' });
  }
  
  const data = readData();
  const newPost = {
    id: uuidv4(),
    title,
    content,
    author: author || '匿名',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  data.posts.unshift(newPost); // 新文章放在最前面
  writeData(data);
  
  res.status(201).json(newPost);
});

// 更新文章
app.put('/api/posts/:id', (req, res) => {
  const { title, content, author } = req.body;
  const data = readData();
  const postIndex = data.posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: '文章未找到' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ message: '标题和内容不能为空' });
  }
  
  data.posts[postIndex] = {
    ...data.posts[postIndex],
    title,
    content,
    author: author || data.posts[postIndex].author,
    updatedAt: new Date().toISOString()
  };
  
  writeData(data);
  res.json(data.posts[postIndex]);
});

// 删除文章
app.delete('/api/posts/:id', (req, res) => {
  const data = readData();
  const postIndex = data.posts.findIndex(p => p.id === req.params.id);
  
  if (postIndex === -1) {
    return res.status(404).json({ message: '文章未找到' });
  }
  
  data.posts.splice(postIndex, 1);
  writeData(data);
  
  res.json({ message: '文章已删除' });
});

// 照片相关 API

// 上传照片
app.post('/api/upload-photo', (req, res) => {
  try {
    const { photoData, fileName } = req.body;
    
    if (!photoData) {
      return res.status(400).json({ message: '照片数据不能为空' });
    }
    
    const data = readData();
    
    // 确保photos数组存在
    if (!data.photos) {
      data.photos = [];
    }
    
    // 添加新照片（保留最近的5张）
    const newPhoto = {
      id: uuidv4(),
      fileName: fileName || '重要照片',
      photoData,
      uploadTime: new Date().toISOString()
    };
    
    data.photos.unshift(newPhoto);
    
    // 只保留最近的5张照片
    if (data.photos.length > 5) {
      data.photos = data.photos.slice(0, 5);
    }
    
    writeData(data);
    
    res.json({
      message: '照片上传成功',
      photo: newPhoto
    });
  } catch (error) {
    console.error('照片上传错误:', error);
    res.status(500).json({ message: '照片上传失败' });
  }
});

// 获取所有照片
app.get('/api/photos', (req, res) => {
  try {
    const data = readData();
    res.json(data.photos || []);
  } catch (error) {
    console.error('获取照片错误:', error);
    res.status(500).json({ message: '获取照片失败' });
  }
});

// 获取最新照片（用于首页显示）
app.get('/api/latest-photo', (req, res) => {
  try {
    const data = readData();
    const latestPhoto = data.photos && data.photos.length > 0 ? data.photos[0] : null;
    res.json(latestPhoto);
  } catch (error) {
    console.error('获取最新照片错误:', error);
    res.status(500).json({ message: '获取最新照片失败' });
  }
});

// 删除照片
app.delete('/api/photos/:id', (req, res) => {
  try {
    const data = readData();
    
    if (!data.photos) {
      return res.status(404).json({ message: '照片未找到' });
    }
    
    const photoIndex = data.photos.findIndex(p => p.id === req.params.id);
    
    if (photoIndex === -1) {
      return res.status(404).json({ message: '照片未找到' });
    }
    
    data.photos.splice(photoIndex, 1);
    writeData(data);
    
    res.json({ message: '照片已删除' });
  } catch (error) {
    console.error('删除照片错误:', error);
    res.status(500).json({ message: '删除照片失败' });
  }
});

// 根路径
app.get('/', (req, res) => {
  res.json({ 
    message: '博客系统API服务器',
    version: '1.0.0',
    endpoints: [
      'GET /api/posts - 获取所有文章',
      'GET /api/posts/:id - 获取单篇文章',
      'POST /api/posts - 创建新文章',
      'PUT /api/posts/:id - 更新文章',
      'DELETE /api/posts/:id - 删除文章',
      'GET /api/health - 健康检查'
    ]
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '博客API服务正常运行',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`允许的源: ${process.env.ALLOWED_ORIGINS || 'http://localhost:3000'}`);
});
