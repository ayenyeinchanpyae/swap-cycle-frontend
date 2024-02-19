import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ currentUserId }) => {
  const userId = Cookies.get('userId');
  console.log('ProtectedRoute', userId);
  if (userId === null || userId === 'null') {
    // If currentUserId is not set, redirect to the login page
    return <Navigate to="/signin" replace />;
  }

  // If currentUserId is set, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
