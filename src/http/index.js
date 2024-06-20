// http-common.js
import axios from 'axios';
import i18n from 'i18next';

const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'content-language': `${i18n.language}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('client-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
