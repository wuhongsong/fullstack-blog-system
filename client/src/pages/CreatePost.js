import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/api';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const insertSnakeGame = () => {
    const gameTemplate = `欢迎来到我的互动博客！今天我想和大家分享一个有趣的贪吃蛇游戏。

这是一个经典的贪吃蛇游戏，使用方向键来控制蛇的移动，吃掉红色的食物来得分，但要小心不要撞墙或撞到自己！

[SNAKE_GAME]

怎么样，是不是很有趣？这个游戏完全嵌入在博客文章中，你可以直接在这里游玩。

游戏特点：
- 使用方向键控制
- 经典的贪吃蛇玩法
- 实时得分统计
- 响应式设计，支持各种设备

希望大家玩得开心！如果你有任何建议或想法，欢迎在评论区留言。`;

    setFormData({
      ...formData,
      title: '🎮 互动博客：贪吃蛇游戏',
      content: gameTemplate,
      author: formData.author || '游戏达人'
    });
  };
  const insertNumberGame = () => {
    const gameTemplate = `🔢 数字认知游戏 - 让学习数字变得有趣！

欢迎来到专为4岁小朋友设计的数字认知乐园！这个游戏将帮助孩子们在玩耍中学习数字，培养数量概念和数字识别能力。

游戏包含两种模式：
🧮 **数数模式**：看看有多少个可爱的物品，然后点击对应的数字
🔢 **数字模式**：看到数字后，点击相同的数字

[NUMBER_GAME]

这个数字认知游戏的教育价值：

🎯 **学习目标**: 培养数字识别和数量概念
📊 **难度渐进**: 从1-3开始，逐步增加到1-10
🎨 **视觉友好**: 使用可爱的表情符号作为计数物品
🏆 **成就系统**: 连续答对可以升级解锁更大数字
🎉 **正面反馈**: 每次成功都有鼓励和庆祝动画

学习效果：
- 提高数字识别能力
- 建立数量和数字的对应关系
- 增强计数技能
- 培养逻辑思维能力
- 建立学习自信心

快来和小朋友一起探索数字的奇妙世界吧！`;

    setFormData({
      ...formData,
      title: '🔢 儿童数字认知游戏 - 在游戏中学习数字',
      content: gameTemplate,
      author: formData.author || '数学启蒙老师'
    });
  };
  const insertColorMatchGame = () => {
    const gameTemplate = `🌈 欢迎来到儿童互动学习乐园！

今天我要为4岁的小朋友们分享一个超级有趣的颜色认知游戏！这个游戏专门为幼儿设计，帮助小朋友们学习和认识各种颜色。

游戏很简单：
👀 看看上面显示的目标颜色
👆 点击下面相同的颜色
🎉 答对了会有超棒的庆祝动画！

[COLOR_MATCH_GAME]

这个颜色配对游戏的特色：

🎨 **适合年龄**: 专为4岁儿童设计
🎯 **教育价值**: 培养颜色认知能力  
🎉 **互动反馈**: 每次成功都有鼓励动画
📱 **友好操作**: 大按钮设计，小手也能轻松点击
🎵 **音效支持**: 成功时播放愉快的音效
📈 **渐进难度**: 随着等级提升，颜色种类会增加

家长朋友们，这个游戏不仅能让孩子们娱乐，还能：
- 提高手眼协调能力
- 增强颜色识别能力
- 培养专注力和观察力
- 建立成就感和自信心

快来和小朋友一起体验这个有趣的颜色世界吧！`;

    setFormData({
      ...formData,
      title: '🌈 儿童颜色认知游戏 - 专为4岁小朋友设计',
      content: gameTemplate,
      author: formData.author || '儿童教育专家'
    });
  };

  return (
    <div className="card">      <h1>写新文章</h1>
      {error && <div className="error">{error}</div>}
        <div className="template-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>🎮 快速模板</h3>
        <p style={{ margin: '0 0 15px 0', color: '#6c757d', fontSize: '14px' }}>
          使用预设模板快速创建包含游戏的互动文章
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            onClick={insertSnakeGame}
            className="btn btn-outline-primary"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            🐍 插入贪吃蛇游戏模板
          </button>
          <button 
            type="button" 
            onClick={insertColorMatchGame}
            className="btn btn-outline-success"
            style={{ fontSize: '14px', padding: '8px 16px' }}
          >
            🌈 插入儿童颜色游戏模板
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">标题 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="请输入文章标题"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">作者</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="请输入作者姓名（可选）"
          />
        </div>        <div className="form-group">
          <label htmlFor="content">内容 *</label>
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6c757d' }}>
            💡 提示：在内容中输入 [SNAKE_GAME] 可以插入贪吃蛇游戏，输入 [COLOR_MATCH_GAME] 可以插入儿童颜色游戏
          </div>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="请输入文章内容"
            required
            style={{ minHeight: '300px' }}
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '发布中...' : '发布文章'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="btn btn-secondary"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
