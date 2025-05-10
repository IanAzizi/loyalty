import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate برای هدایت
import API from '../api';
import '../styles.css';  // فایل استایل‌ها

const LoginPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate(); // برای هدایت به صفحات مختلف

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/user/login', { name, phone });
      localStorage.setItem('token', data.token);
      const role = data.role;

      // اگر نقش "manager" باشد، به صفحه باشگاه هدایت کن
      if (role === 'manager') {
        navigate('/club'); // به صفحه باشگاه هدایت می‌شود
      } else {
        navigate('/purchase'); // یا می‌توانید به صفحه‌ای دیگر هدایت کنید
      }
      
      alert('ورود با موفقیت انجام شد');
    } catch (err) {
      alert('ورود ناموفق بود');
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2 className="title">ورود یا ثبت‌نام</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="شماره تلفن"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
