import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setFetching(true);
      const post = await postService.getPost(id);
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author
      });
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  };

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
      await postService.updatePost(id, formData);
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="card">
      <h1>编辑文章</h1>
      {error && <div className="error">{error}</div>}
      
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
            placeholder="请输入作者姓名"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">内容 *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="请输入文章内容"
            required
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '保存中...' : '保存修改'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/post/${id}`)} 
            className="btn btn-secondary"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
