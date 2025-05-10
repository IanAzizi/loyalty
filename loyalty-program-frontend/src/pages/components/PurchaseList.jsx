import React, { useEffect, useState } from 'react';
import API from '../api';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/purchase/user');
        setPurchases(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Your Purchases</h2>
      <ul>
        {purchases.map((item) => (
          <li key={item._id}>
            <p>Shop: {item.amount}</p>
            <img src={`http://localhost:5001/uploads/${item.image}`} alt="Uploaded" width={100} />
            <p>{new Date(item.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;