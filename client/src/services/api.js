import axios from 'axios';

// 根据环境确定API基础URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://whs-fullstack-blog-system.onrender.com/api' 
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;
