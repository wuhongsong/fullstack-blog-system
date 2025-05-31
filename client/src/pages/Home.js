import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService, photoService } from '../services/api';
import PostCard from '../components/PostCard';
import PhotoUpload from '../components/PhotoUpload';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [homepagePhoto, setHomepagePhoto] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchLatestPhoto();
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

  const fetchLatestPhoto = async () => {
    try {
      setPhotoLoading(true);
      const photo = await photoService.getLatestPhoto();
      setHomepagePhoto(photo);
    } catch (err) {
      console.error('获取照片失败:', err);
      // 如果服务器获取失败，尝试从localStorage获取
      const savedPhoto = localStorage.getItem('homepagePhoto');
      if (savedPhoto) {
        setHomepagePhoto({ photoData: savedPhoto, fileName: '本地照片' });
      }
    } finally {
      setPhotoLoading(false);
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

  const handlePhotoUpload = async (photoData, fileName) => {
    try {
      setPhotoLoading(true);
      
      // 先保存到localStorage作为备份
      localStorage.setItem('homepagePhoto', photoData);
      
      // 上传到服务器
      const result = await photoService.uploadPhoto(photoData, fileName);
      setHomepagePhoto(result.photo);
      
      alert('照片上传成功！现在照片已永久保存。');
    } catch (err) {
      console.error('照片上传失败:', err);
      // 如果服务器上传失败，仍然使用本地存储
      setHomepagePhoto({ photoData, fileName });
      alert('照片已保存到本地，但服务器同步失败。照片仍会显示，但可能在其他设备上无法访问。');
    } finally {
      setPhotoLoading(false);
    }
  };

  const handlePhotoRemove = async () => {
    try {
      setPhotoLoading(true);
      
      // 如果有服务器上的照片ID，删除服务器上的照片
      if (homepagePhoto && homepagePhoto.id) {
        await photoService.deletePhoto(homepagePhoto.id);
      }
      
      // 清除本地存储
      localStorage.removeItem('homepagePhoto');
      setHomepagePhoto(null);
      
      alert('照片已删除！');
    } catch (err) {
      console.error('删除照片失败:', err);
      // 即使服务器删除失败，也清除本地显示
      localStorage.removeItem('homepagePhoto');
      setHomepagePhoto(null);
      alert('照片已从本地删除。');
    } finally {
      setPhotoLoading(false);
    }
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
        
        {photoLoading && (
          <div className="photo-loading">
            <p>📸 处理照片中...</p>
          </div>
        )}
        
        {homepagePhoto && !photoLoading && (
          <div className="homepage-photo-display">
            <img 
              src={homepagePhoto.photoData || homepagePhoto} 
              alt={homepagePhoto.fileName || "重要照片"} 
              className="homepage-photo"
            />
            <div className="photo-info">
              <p>{homepagePhoto.fileName || "重要照片"}</p>
              {homepagePhoto.uploadTime && (
                <small>上传时间: {new Date(homepagePhoto.uploadTime).toLocaleString()}</small>
              )}
            </div>
            <button 
              className="remove-photo-btn"
              onClick={handlePhotoRemove}
              disabled={photoLoading}
            >
              {photoLoading ? '删除中...' : '移除照片'}
            </button>
          </div>
        )}
        
        {!homepagePhoto && !photoLoading && (
          <div className="no-photo-message">
            <p>📷 还没有上传重要照片</p>
            <p>点击上方按钮选择您的重要照片，它将永久保存！</p>
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
