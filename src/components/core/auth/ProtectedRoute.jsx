import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const user = useSelector((state) => state.auth.user);
    if (user) {
        return <>{children}</>;
    }
    return <Navigate to="/login" />
}

export default ProtectedRoute