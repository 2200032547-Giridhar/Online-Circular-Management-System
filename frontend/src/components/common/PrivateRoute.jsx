import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but not authorized
    return <Navigate to="/not-found" replace />;
  }

  // User is authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
