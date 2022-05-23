import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
        <>
            <Link
                className={match ? 'btn btn-secondary bg-black text-white' : ''}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </>
    );
};

export default CustomLink;