import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // مسیر درست صفحه لاگین
import PurchaseForm from './pages/components/PurchaseForm'; // صفحه فرم خرید
import PurchaseList from './pages/components/PurchaseList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/purchase" element={<PurchaseForm />} /> {/* صفحه فرم خرید */}
        <Route path="/club" element={<PurchaseList />} /> 
        {/* بقیه مسیرها */}
      </Routes>
    </Router>
  );
}

export default App;
