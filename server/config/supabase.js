const { createClient } = require('@supabase/supabase-js');

// Supabase配置
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

const initSupabase = () => {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase 连接初始化成功');
    return true;
  } else {
    console.log('Supabase 环境变量未配置，使用文件存储');
    return false;
  }
};

// 创建posts表的SQL（需要在Supabase控制台执行）
const createTableSQL = `
CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE
    ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

// 数据操作函数
const supabaseOperations = {
  // 获取所有文章
  async getAllPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 获取单篇文章
  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 创建文章
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
    
    if (error) throw error;
    return data;
  },

  // 更新文章
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
    
    if (error) throw error;
    return data;
  },

  // 删除文章
  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // 初始化默认数据
  async initializeDefaultData() {
    try {
      const existingPosts = await this.getAllPosts();
      
      if (existingPosts.length === 0) {
        console.log('初始化Supabase默认数据...');
        
        const defaultPosts = [
          {
            id: "game-demo-001",
            title: "🎮 互动体验：博客中的贪吃蛇游戏",
            content: "欢迎来到我的互动博客！今天我想和大家分享一个特别的体验 - 直接在博客文章中玩游戏！\\n\\n这篇文章不仅仅是文字，还包含了一个完全可玩的贪吃蛇游戏。这展示了现代网页技术的强大能力，让博客不再只是静态的文字，而是可以包含各种互动元素。\\n\\n[SNAKE_GAME]\\n\\n这个贪吃蛇游戏的特点：\\n\\n🎯 **经典玩法**：使用方向键控制蛇的移动\\n🍎 **得分系统**：吃掉红色食物获得分数\\n💾 **本地存储**：最高分会保存在浏览器中\\n📱 **响应式设计**：支持桌面和移动设备\\n🎨 **现代UI**：漂亮的渐变色彩和动画效果\\n⚡ **速度控制**：5个速度等级可选择，从初学者🐌到极速⚡\\n\\n**技术实现：**\\n这个游戏是使用 React 开发的，完全嵌入在博客系统中。当你在文章内容中输入 [SNAKE_GAME] 标记时，系统会自动渲染游戏组件。\\n\\n**游戏控制：**\\n- 使用方向键（↑↓←→）控制蛇的移动\\n- 点击速度按钮调整游戏难度\\n- 游戏结束后按空格键重新开始\\n\\n这种设计模式可以扩展到其他类型的互动内容，比如：\\n- 计算器\\n- 投票系统  \\n- 数据可视化图表\\n- 在线工具\\n\\n希望这个小游戏能给你带来乐趣！如果你喜欢这种互动博客的概念，请告诉我你还想看到什么样的功能。",
            author: "互动博客创作者"
          },
          {
            id: require('uuid').v4(),
            title: "欢迎来到根娟一起跳",
            content: "这是一篇示例文章。您可以创建、编辑和删除文章。",
            author: "博主"
          }
        ];
        
        for (const post of defaultPosts) {
          await this.createPost(post);
        }
        
        console.log('Supabase默认数据初始化完成');
      }
    } catch (error) {
      console.error('Supabase初始化数据失败:', error);
    }
  }
};

module.exports = {
  initSupabase,
  supabase,
  supabaseOperations,
  createTableSQL
};
