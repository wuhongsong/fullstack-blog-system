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

  return (
    <div className="card">      <h1>写新文章</h1>
      {error && <div className="error">{error}</div>}
      
      <div className="template-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>🎮 快速模板</h3>
        <p style={{ margin: '0 0 15px 0', color: '#6c757d', fontSize: '14px' }}>
          使用预设模板快速创建包含游戏的互动文章
        </p>
        <button 
          type="button" 
          onClick={insertSnakeGame}
          className="btn btn-outline-primary"
          style={{ fontSize: '14px', padding: '8px 16px' }}
        >
          🐍 插入贪吃蛇游戏模板
        </button>
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
            💡 提示：在内容中输入 [SNAKE_GAME] 可以插入贪吃蛇游戏
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
