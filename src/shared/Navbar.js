import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const menuItems = <>
        <li>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
        </li>

    </>
    return (
        <ul>
            {
                menuItems
            }
        </ul>
    );
};

export default Navbar;