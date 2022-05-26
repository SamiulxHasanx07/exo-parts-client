import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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
                <CustomLink to='/blog'>Blog</CustomLink>
                <CustomLink to='/myportfolio'>My Portfolio</CustomLink>
                <div className='flex justify-center'>
                    <p className={`${user ? '' : 'hidden'} text-center`}>{user?.displayName}</p>
                </div>
                {user ? '' : <CustomLink to='/login'>Login</CustomLink>}
                {user ? '' : <CustomLink to='/register'>Register</CustomLink>}
                {
                    user ? <CustomLink to='/dashboard'>Dashboard</CustomLink> : ''
                }


                {user && <button className='btn btn-secondary text-white' onClick={() => signOut(auth)}>Sign Out <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>}
            </li>

        </>
    );
};

export default Navbar;