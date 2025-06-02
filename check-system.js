// 测试博客系统各个组件
const fs = require('fs');
const path = require('path');

console.log('🔍 检查博客系统组件...\n');

// 检查后端文件
const serverFiles = [
    'server/server.js',
    'server/package.json', 
    'server/data/posts.json'
];

// 检查前端文件  
const clientFiles = [
    'client/package.json',
    'client/src/App.js',
    'client/src/index.js',
    'client/public/index.html'
];

console.log('📂 后端文件检查:');
serverFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log('\n📂 前端文件检查:');
clientFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// 检查数据
console.log('\n📄 数据检查:');
try {
    const data = JSON.parse(fs.readFileSync('server/data/posts.json', 'utf8'));
    console.log(`✅ 数据文件有效，包含 ${data.posts.length} 篇文章`);
    if (data.posts.length > 0) {
        console.log(`   示例文章: "${data.posts[0].title}"`);
    }
} catch (error) {
    console.log('❌ 数据文件错误:', error.message);
}

console.log('\n🚀 启动提示:');
console.log('1. 后端: cd server && npm start');
console.log('2. 前端: cd client && npm start');
console.log('3. 访问: http://localhost:3000');

console.log('\n✨ 博客系统检查完成!');
