import React from 'react';
import PurchaseForm from '../components/PurchaseForm';
import PurchaseList from '../components/PurchaseList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <PurchaseForm />
      <PurchaseList />
    </div>
  );
};

export default Dashboard;