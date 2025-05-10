import React, { useState } from 'react';
import API from "../../api"; // به جای "../api"

const PurchaseForm = () => {
  const [shopName, setShopName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('amount', shopName); // اگر shopName به amount مربوط است
    formData.append('image', image);

    try {
      await API.post('/purchase/create', formData);
      alert('خرید با موفقیت ارسال شد');
    } catch (err) {
      alert('ارسال خرید با مشکل مواجه شد');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="purchase-form">
        <h2>ارسال خرید</h2>
        <input
          type="text"
          placeholder="نام فروشگاه"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="input-field"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="input-field"
        />
        <button type="submit" className="submit-btn">ارسال</button>
      </form>

      <style>{`
        /* استایل برای فرم خرید */
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

        .submit-btn:active {
          background-color: #3e8e41;
        }
      `}</style>
    </>
  );
};

export default PurchaseForm;
