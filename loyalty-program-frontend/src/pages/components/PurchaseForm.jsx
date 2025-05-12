import React, { useState } from 'react';
import API from '../../api';

const PurchaseForm = () => {
  const [storeName, setStoreName] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !image) {
      alert('لطفاً همه فیلدها را پر کنید');
      return;
    }

    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('amount', amount);
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await API.post('/purchase/create', formData);
      alert('خرید با موفقیت ارسال شد');
      setAmount('');
      setImage(null);
    } catch (error) {
      console.error('❌ خطا در ارسال خرید:', error?.response?.data || error.message);
      alert('ارسال خرید با خطا مواجه شد. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="purchase-form">
        <h2>ارسال خرید</h2>
        <input
  type="text"
  placeholder="نام فروشگاه"
  value={storeName}
  onChange={(e) => setStoreName(e.target.value)}
  className="input-field"
  required
/>

        <input
          type="number"
          placeholder="مبلغ خرید (تومان)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="input-field"
          required
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'در حال ارسال...' : 'ارسال'}
        </button>
      </form>

      <style>{`
        .purchase-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        .purchase-form h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          font-size: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default PurchaseForm;
