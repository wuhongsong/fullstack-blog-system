// 简单的API测试脚本
const https = require('https');

console.log('正在测试新部署的API...');

// 测试后端健康检查
const testUrl = 'https://blog-backend-lb7b9rs7p-wuhongsongs-projects.vercel.app/api/posts';

https.get(testUrl, (res) => {
  console.log('状态码:', res.statusCode);
  console.log('响应头:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应内容:', data);
  });
}).on('error', (err) => {
  console.log('错误:', err.message);
});
