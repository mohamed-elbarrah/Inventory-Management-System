import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './features/auth/AuthPage';
import ManagerDashboard from './features/manager/ManagerDashboard';
import CustomerDashboard from './features/customer/CustomerDashboard';
import RoleBasedRoute from './components/RoleBasedRoute'; 
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => (
  // 1. Wrap the app with the Redux Provider
  <Provider store={store}>
    <AuthPage />
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={<AuthPage />} />

        {/* PROTECTED ROUTES - MANAGER ONLY */}
        {/* RoleBasedRoute acts as the parent layout/guard */}
        <Route element={<RoleBasedRoute allowedRoles={['manager']} />}>
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        </Route>

        {/* PROTECTED ROUTES - CUSTOMER ONLY */}
        <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Route>

        {/* 404 CATCH-ALL */}
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>404 - Page Not Found</h1>} />
        
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;