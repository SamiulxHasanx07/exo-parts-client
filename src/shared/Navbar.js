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
        <div className='bg-primary'>

            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <Link to='/' className="normal-case text-3xl text-white font-bold">Exo Parts</Link>

                    <div className="dropdown ml-[100px]">
                        <label tabindex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Navbar;