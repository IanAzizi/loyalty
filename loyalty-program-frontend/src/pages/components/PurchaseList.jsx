import React, { useEffect, useState } from 'react';
import API from '../../api';
import dayjs from "dayjs";
import jalali from "jalali-dayjs";

dayjs.extend(jalali);

const formatToJalali = (date) => {
  if (!date) return "";
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
};



const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [users, setUsers] = useState({});
  const handleDelete = async (id) => {
    if (!window.confirm('آیا مطمئن هستید که می‌خواهید این خرید را حذف کنید؟')) return;
  
    try {
      await API.delete(`/purchase/delete/${id}`);
      setPurchases(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('خطا در حذف خرید:', err);
      alert('مشکلی در حذف خرید به وجود آمد.');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/purchase');
        setPurchases(data);

        const userIds = [...new Set(
          data.map(p => typeof p.user === 'string' ? p.user : p.user?._id).filter(Boolean)
        )];

        const userResponses = await Promise.all(
          userIds.map(id => API.get(`/user/${id}`))
        );

        const userData = userResponses.reduce((acc, res) => {
          acc[res.data.userId] = res.data;
          return acc;
        }, {});

        setUsers(userData);
      } catch (err) {
        console.error('Error fetching purchases or users:', err);
      }
    };

    fetchData();
  }, []);

  const tableStyle = {
    width: '90%',
    margin: '40px auto',
    borderCollapse: 'collapse',
    fontFamily: 'Tahoma, sans-serif',
    direction: 'rtl',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'center',
  };

  const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Tahoma' }}>
        لیست خریدها
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>ردیف</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>نام کاربر</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>شماره تماس</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>فروشگاه</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>مبلغ</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>امتیاز</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>تاریخ</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>فاکتور</th>
          </tr>
        </thead>
        <tbody>
        {purchases.map((purchase, index) => {

            const userId = typeof purchase.user === 'string' ? purchase.user : purchase.user?._id;
            const user = users[userId];

            return (
              <tr key={purchase._id}>
                <td style={thTdStyle}>{index + 1}</td>
                <td style={thTdStyle}>{user?.name || 'نام موجود نیست'}</td>
                <td style={thTdStyle}>{user?.phone || 'شماره موجود نیست'}</td>
                <td style={thTdStyle}>{purchase.storeName || 'فروشگاه ندارد'}</td>
                <td style={thTdStyle}>{purchase.amount?.toLocaleString() || '۰'}</td>
                <td style={thTdStyle}>{purchase.points ?? '۰'}</td>
                <td style={thTdStyle}>{formatToJalali(purchase.createdAt)}</td>

                <td style={thTdStyle}>
  {purchase.imageUrl ? (
    <button
      style={buttonStyle}
      onClick={() => window.open(purchase.imageUrl, '_blank')}
    >
      مشاهده عکس
    </button>
  ) : '—'}

  <button
    style={{ ...buttonStyle, backgroundColor: '#dc3545', marginRight: '8px' }}
    onClick={() => handleDelete(purchase._id)}
  >
    حذف
  </button>
</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseList;
