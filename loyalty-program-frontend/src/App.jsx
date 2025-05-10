import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // مسیر درست صفحه لاگین
import PurchaseForm from './pages/components/PurchaseForm'; // صفحه فرم خرید

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/purchase" element={<PurchaseForm />} /> {/* صفحه فرم خرید */}
        {/* بقیه مسیرها */}
      </Routes>
    </Router>
  );
}

export default App;
