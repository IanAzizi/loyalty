import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../styles.css';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^09\d{9}$/.test(phone)) {
      alert('شماره تلفن نامعتبر است. لطفاً با 09 شروع و 11 رقم باشد.');
      return;
    }

    if (isSignup && !name.trim()) {
      alert('لطفاً نام را وارد کنید.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isSignup ? '/user/signup' : '/user/login';
      const payload = isSignup ? { name, phone } : { phone };

      const { data } = await API.post(endpoint, payload);

      if (!data?.token) {
        throw new Error('توکن دریافت نشد.');
      }

      localStorage.setItem('token', data.token);

      const role = data.role;
      if (role === 'manager') {
        navigate('/club');
      } else {
        navigate('/purchase');
      }

      alert(isSignup ? 'ثبت‌نام موفق بود' : 'ورود موفق بود');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (isSignup ? 'ثبت‌نام ناموفق بود.' : 'ورود ناموفق بود.');
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="card">
        <h2 className="card-title">{isSignup ? 'ثبت‌نام' : 'ورود'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <input
                type="text"
                placeholder="نام کامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}
          <div className="input-group">
            <input
              type="tel"
              placeholder="شماره تلفن همراه"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'در حال ارسال...' : isSignup ? 'ثبت‌نام' : 'ورود'}
          </button>
        </form>
        <p className="switch-mode">
          {isSignup ? 'قبلاً ثبت‌نام کرده‌اید؟' : 'حساب کاربری ندارید؟'}{' '}
          <span onClick={() => setIsSignup(!isSignup)} className="switch-link">
            {isSignup ? 'ورود' : 'ثبت‌نام'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
