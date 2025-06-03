import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';


function UserProfile({children}) {
    const {id} = useParams();
    const user = useSelector((state) => state.auth.user);
    if (user?._id !== id) {
        return <>{children}</>;
    }
    return <Navigate to="/dashboard/profile" />
}

export default UserProfile