import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  // حذف Content-Type — axios خودش تنظیم می‌کنه بر اساس نوع داده
});

// اینترسپتور برای اضافه‌کردن توکن به هر درخواست
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// متدهای کمکی برای لاگین و ثبت‌نام
export const signup = (userData) => API.post('/user/signup', userData);
export const login = (userData) => API.post('/user/login', userData);

export default API;
