import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import SnakeGame from '../components/SnakeGame';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPost(id);
      setPost(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };  const handleDelete = async () => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const renderContent = (content) => {
    // 检查是否包含贪吃蛇游戏标记
    if (content.includes('[SNAKE_GAME]')) {
      const parts = content.split('[SNAKE_GAME]');
      return (
        <div>
          {parts[0] && (
            <div style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
              {parts[0]}
            </div>
          )}
          <SnakeGame />
          {parts[1] && (
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
              {parts[1]}
            </div>
          )}
        </div>
      );
    }
    
    // 普通文本内容
    return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="error">{error}</div>
        <Link to="/" className="btn btn-primary">
          返回首页
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="card">
        <div className="error">文章不存在</div>
        <Link to="/" className="btn btn-primary">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <article>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          作者：{post.author} | 发布于：{formatDate(post.createdAt)}
          {post.updatedAt !== post.createdAt && (
            <> | 更新于：{formatDate(post.updatedAt)}</>
          )}
        </div>        <div className="post-content">
          {renderContent(post.content)}
        </div>
        <div className="actions">
          <Link to="/" className="btn btn-secondary">
            返回首页
          </Link>
          <Link to={`/edit/${post.id}`} className="btn btn-primary">
            编辑文章
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            删除文章
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
