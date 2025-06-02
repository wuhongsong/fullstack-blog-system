import React, { useState, useRef } from 'react';
import './PhotoUpload.css';

const PhotoUpload = ({ onPhotoUpload, currentPhoto }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件！');
      return;
    }

    // 检查文件大小 (5MB限制)
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB！');
      return;
    }

    setUploading(true);

    try {
      // 转换为Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        // 保存到localStorage
        localStorage.setItem('homepagePhoto', base64);
        localStorage.setItem('homepagePhotoName', file.name);
        
        // 通知父组件
        onPhotoUpload(base64, file.name);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('上传失败:', error);
      alert('上传失败，请重试！');
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('homepagePhoto');
    localStorage.removeItem('homepagePhotoName');
    onPhotoUpload(null, null);
  };

  return (
    <div className="photo-upload-container">
      {currentPhoto ? (
        <div className="photo-display">
          <div className="photo-wrapper">
            <img src={currentPhoto} alt="重要照片" className="homepage-photo" />
            <div className="photo-overlay">
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={handleButtonClick}
                disabled={uploading}
              >
                更换照片
              </button>
              <button 
                className="btn btn-danger btn-sm" 
                onClick={handleRemovePhoto}
              >
                删除照片
              </button>
            </div>
          </div>
          <p className="photo-name">{localStorage.getItem('homepagePhotoName')}</p>
        </div>
      ) : (
        <div 
          className={`photo-upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="upload-content">
            {uploading ? (
              <div className="uploading">
                <div className="spinner"></div>
                <p>上传中...</p>
              </div>
            ) : (
              <>
                <div className="upload-icon">📸</div>
                <h3>上传重要照片</h3>
                <p>点击此处或拖拽照片到这里</p>
                <p className="upload-hint">支持 JPG、PNG、GIF 格式，最大5MB</p>
              </>
            )}
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PhotoUpload;
