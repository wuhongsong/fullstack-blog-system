import axios from 'axios';

// 根据环境确定API基础URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://blog-backend-31hu4t4td-wuhongsongs-projects.vercel.app/api' 
    : 'http://localhost:5000/api');

console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒超时
});

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('发送API请求:', config.method?.toUpperCase(), config.url);
    console.log('完整URL:', `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API响应成功:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API响应错误:', error);
    if (error.response) {
      console.error('错误状态码:', error.response.status);
      console.error('错误数据:', error.response.data);
    } else if (error.request) {
      console.error('网络错误，无法连接到服务器');
    } else {
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

export const postService = {
  // 获取所有文章
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error('获取文章列表失败');
    }
  },

  // 获取单篇文章
  getPost: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('文章不存在');
      }
      throw new Error('获取文章失败');
    }
  },

  // 创建文章
  createPost: async (post) => {
    try {
      const response = await api.post('/posts', post);
      return response.data;
    } catch (error) {
      throw new Error('创建文章失败');
    }
  },

  // 更新文章
  updatePost: async (id, post) => {
    try {
      const response = await api.put(`/posts/${id}`, post);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('文章不存在');
      }
      throw new Error('更新文章失败');
    }
  },

  // 删除文章
  deletePost: async (id) => {
    try {
      await api.delete(`/posts/${id}`);
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('文章不存在');
      }
      throw new Error('删除文章失败');
    }
  },
};

// 照片相关 API
export const photoService = {
  // 上传照片
  async uploadPhoto(photoData, fileName) {
    const response = await api.post('/upload-photo', {
      photoData,
      fileName
    });
    return response.data;
  },

  // 获取所有照片
  async getAllPhotos() {
    const response = await api.get('/photos');
    return response.data;
  },

  // 获取最新照片
  async getLatestPhoto() {
    const response = await api.get('/latest-photo');
    return response.data;
  },

  // 删除照片
  async deletePhoto(photoId) {
    const response = await api.delete(`/photos/${photoId}`);
    return response.data;
  }
};

export default api;
