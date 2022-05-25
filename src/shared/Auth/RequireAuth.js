import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../fireabse.init';
import useAdmin from '../../hooks/useAdmin';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    console.log(admin);
    
    if (loading) {
        return <p>Loading</p>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
};

export default RequireAuth;