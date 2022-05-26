import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import auth from '../../fireabse.init';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const location = useLocation();

    
    if (loading || adminLoading) {
        return <button className="btn btn-square bg-primary loading"></button>
    }

    if (admin==='customer') {
        signOut(auth)
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
};

export default RequireAdmin;