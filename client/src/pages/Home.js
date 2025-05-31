import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';
import PostCard from '../components/PostCard';
import PhotoUpload from '../components/PhotoUpload';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [homepagePhoto, setHomepagePhoto] = useState(null);

  useEffect(() => {
    fetchPosts();
    // 加载已保存的照片
    const savedPhoto = localStorage.getItem('homepagePhoto');
    if (savedPhoto) {
      setHomepagePhoto(savedPhoto);
    }
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhotoUpload = (photoData, fileName) => {
    setHomepagePhoto(photoData);
    localStorage.setItem('homepagePhoto', photoData);
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="home-page">
      {/* 重要照片展示区域 */}
      <div className="homepage-photo-section">
        <h2>✨ 我的重要照片</h2>
        <PhotoUpload onPhotoUpload={handlePhotoUpload} />
        {homepagePhoto && (
          <div className="homepage-photo-display">
            <img 
              src={homepagePhoto} 
              alt="重要照片" 
              className="homepage-photo"
            />
            <button 
              className="remove-photo-btn"
              onClick={() => {
                setHomepagePhoto(null);
                localStorage.removeItem('homepagePhoto');
              }}
            >
              移除照片
            </button>
          </div>
        )}
      </div>

      {/* 博客标题和操作区域 */}
      <div className="home-header">
        <h1>我的博客</h1>
        <Link to="/create" className="create-post-btn">
          📝 写新文章
        </Link>
      </div>

      {error && <div className="error">{error}</div>}

      {/* 文章列表 */}
      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>还没有文章，<Link to="/create">写第一篇文章</Link>吧！</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
