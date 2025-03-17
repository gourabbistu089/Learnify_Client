
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function OpenRoute({children}) {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return <Navigate to='/dashboard/home' />;
  }
  return <>{children}</>;
}

export default OpenRoute