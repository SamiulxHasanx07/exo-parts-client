import React from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {

    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    const location = useLocation();
    const pathValidate = location.pathname.includes('/dashboard');
    return (
        <>
            <Link
                className={`${match ? 'btn btn-secondary bg-black text-white' : 'btn btn-ghost'} ${pathValidate?'mt-3':''}` }
                to={to}
                {...props}
            >
                {children}
            </Link>
        </>
    );
};

export default CustomLink;