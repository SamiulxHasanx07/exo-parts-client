import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../fireabse.init';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import CustomLink from './CustomLink';
const Navbar = () => {
    const [user] = useAuthState(auth)
    return (
        <>
            <li>
                <CustomLink to='/'>Home</CustomLink>
                <CustomLink to='/about'>About</CustomLink>
                <p className={`${user?'':'hidden'}`}>{user?.displayName}</p>
                {user ?'':  <CustomLink to='/login'>Login</CustomLink>}
                {user ?'':  <CustomLink to='/register'>Register</CustomLink>}
                {
                    user?<CustomLink to='/dashboard'>Dashboard</CustomLink>:''
                }
                {user && <button className='btn btn-secondary text-white' onClick={() => signOut(auth)}>Sign Out <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>}
            </li>

        </>
    );
};

export default Navbar;