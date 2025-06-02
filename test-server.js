const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <head><title>博客系统测试</title></head>
      <body>
        <h1>🎉 博客系统后端正在运行！</h1>
        <p>端口: 5000</p>
        <p>时间: ${new Date().toLocaleString('zh-CN')}</p>
        <a href="http://localhost:3000">访问前端应用</a>
      </body>
    </html>
  `);
});

server.listen(5000, () => {
  console.log('测试服务器运行在 http://localhost:5000');
});
