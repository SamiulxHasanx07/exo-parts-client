import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../fireabse.init';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
const Navbar = () => {
    const [user] = useAuthState(auth)
    return (
        <>
            <li>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <p className={`${user?'':'hidden'}`}>{user?.displayName}</p>
                {user ?'':  <Link to='/login'>Login</Link>}
                {user && <button className='btn btn-secondary text-white' onClick={() => signOut(auth)}>Sign Out <FontAwesomeIcon icon={faArrowRightFromBracket} /></button>}
            </li>

        </>
    );
};

export default Navbar;