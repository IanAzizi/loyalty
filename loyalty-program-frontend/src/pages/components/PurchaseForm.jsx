import React, { useState } from 'react';
import API from '../../api';
import '../../list.css';

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
      await API.post('/purchase/create', formData);
      alert('✅ خرید با موفقیت ثبت شد');
      setStoreName('');
      setAmount('');
      setImage(null);
    } catch (err) {
      console.error('❌ خطا:', err?.response?.data || err.message);
      alert('ارسال خرید با خطا مواجه شد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="card-stack">
        {/* فرم ثبت خرید */}
        <div className="card glassy">
          <h2 className="card-title">ثبت اطلاعات خرید</h2>
          <p className="card-subtitle">جهت شرکت در قرعه‌کشی</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="🛒 نام فروشگاه"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="💰 مبلغ خرید (به تومان)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="input-group">
              <label className="upload-label">
                ⬆️ آپلود رسید پرداختی
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  disabled={loading}
                  required
                  hidden
                />
              </label>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ در حال ارسال...' : 'ثبت نام در قرعه‌کشی'}
            </button>
          </form>
        </div>

        {/* اسپانسرها */}
        <div className="card glassy">
          <h3 className="section-title">فروشگاه‌های اسپانسر 🎯</h3>
          <div className="sponsors-logos">
            <div className="sponsor">
              <img src="/images/logo.png" alt="Sponsor 1" />
              <span>۲۰٪ تخفیف</span>
            </div>
            <div className="sponsor">
              <img src="/images/logo.png" alt="Sponsor 2" />
              <span>۱۵٪ تخفیف</span>
            </div>
          </div>
        </div>

        {/* قوانین و مقررات */}
        <div className="card glassy">
          <h3 className="section-title">قوانین و مقررات ⚖️</h3>
          <ul className="rules-list">
            <li>✅ فقط رسید خرید از فروشگاه‌های اسپانسر معتبر است.</li>
            <li>✅ تصویر رسید باید واضح و خوانا باشد.</li>
            <li>❌ ارسال فاکتور جعلی باعث حذف از قرعه‌کشی خواهد شد.</li>
            <li>❗ عدم رعایت قوانین به معنی حذف خودکار از قرعه‌کشی است.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
