const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 使用环境变量中的MongoDB连接字符串
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-system';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
