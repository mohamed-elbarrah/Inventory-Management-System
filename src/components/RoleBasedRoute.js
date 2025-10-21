import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentRole } from '../features/auth/authSlice'; 

const RoleBasedRoute = ({ allowedRoles }) => {
  const userRole = useSelector(selectCurrentRole);
  
  // 1. Check if the user is logged in AND has an allowed role
  if (userRole && allowedRoles.includes(userRole)) {
    return <Outlet />; 
  }

  // 2. Redirect based on the unauthorized user's current status
  if (userRole === 'customer') {
    // Logged-in customer trying to access manager page
    return <Navigate to="/customer-dashboard" replace />;
  }
  
  if (userRole === 'manager') {
    // Logged-in manager trying to access a customer-only page (less common here)
    return <Navigate to="/manager-dashboard" replace />;
  }

  // 3. Not logged in (no role), redirect to the login page
  return <Navigate to="/" replace />;
};

export default RoleBasedRoute;