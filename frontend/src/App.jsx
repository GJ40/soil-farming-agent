import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import Soils from './pages/Soils';
import Distributors from './pages/Distributors';
import ProtectedRoute from './utils/ProtectedRoute';
import SoilForm from './components/SoilForm';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import DistributorForm from './components/DistributorForm';
import AdminDashboard from './pages/AdminDashboard';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/soils"
              element={
                <ProtectedRoute>
                  <Soils />
                </ProtectedRoute>
              }
            />
            <Route path="/distributors" element={<ProtectedRoute><Distributors /></ProtectedRoute>} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/soilform" element={<AdminProtectedRoute><SoilForm /></AdminProtectedRoute>} />
          <Route path="/admin/distform" element={<AdminProtectedRoute><DistributorForm /></AdminProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
