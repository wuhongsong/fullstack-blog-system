// Render.com 入口文件
// 这个文件将请求转发到实际的服务器文件

const path = require('path');

console.log('启动博客API服务器...');
console.log('当前工作目录:', process.cwd());
console.log('入口文件位置:', __filename);
console.log('环境变量PORT:', process.env.PORT);

// 设置正确的工作目录
process.chdir(__dirname);

// 加载实际的服务器
require('./server/server.js');
