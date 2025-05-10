import axios from 'axios';

// تنظیم API base URL (باید URL سرور خودتون رو قرار بدید)
const API = axios.create({
  baseURL: 'http://localhost:5001/api', // به آدرس API سرور خودتون تغییر بدید
  headers: {
    'Content-Type': 'application/json',
  },
});

// درخواست‌های مورد نیاز
export const signup = (userData) => API.post('/user/signup', userData);
export const login = (userData) => API.post('/user/login', userData);

export default API;
