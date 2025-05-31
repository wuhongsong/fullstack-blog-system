import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      onDelete(post.id);
    }
  };

  return (
    <article className="post-item">
      <h2 className="post-title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <div className="post-meta">
        作者：{post.author} | 发布于：{formatDate(post.createdAt)}
        {post.updatedAt !== post.createdAt && (
          <> | 更新于：{formatDate(post.updatedAt)}</>
        )}
      </div>
      <div className="post-content">
        {truncateContent(post.content)}
      </div>
      <div className="actions">
        <Link to={`/post/${post.id}`} className="btn btn-primary">
          阅读全文
        </Link>
        <Link to={`/edit/${post.id}`} className="btn btn-secondary">
          编辑
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          删除
        </button>
      </div>
    </article>
  );
};

export default PostCard;
