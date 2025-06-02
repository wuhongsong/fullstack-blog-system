const { spawn } = require('child_process');
const path = require('path');

console.log('正在启动博客系统...');

// 启动后端服务器
const serverPath = path.join(__dirname, 'server', 'server.js');
const nodePath = path.join(__dirname, 'node-v20.11.0-win-x64', 'node.exe');

console.log('启动后端服务器...');
const backend = spawn(nodePath, [serverPath], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit'
});

backend.on('error', (err) => {
  console.error('后端启动失败:', err);
});

// 等待后端启动后启动前端
setTimeout(() => {
  console.log('启动前端应用...');
  const npmPath = path.join(__dirname, 'node-v20.11.0-win-x64', 'npm.cmd');
  const frontend = spawn(npmPath, ['start'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit'
  });

  frontend.on('error', (err) => {
    console.error('前端启动失败:', err);
  });
}, 3000);

console.log('博客系统启动完成！');
console.log('前端地址: http://localhost:3000');
console.log('后端API: http://localhost:5000');
