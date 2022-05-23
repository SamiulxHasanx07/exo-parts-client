import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../shared/CustomLink';
import { faHome, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import auth from '../../fireabse.init';

const Dashboard = () => {

    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col lg:px-16">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <h2 className='text-3xl text-secondary font-bold py-10'>Dashboard</h2>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80  text-base-content bg-primary">
                        {/* <!-- Sidebar content here --> */}
                        <li><CustomLink to='/home'><FontAwesomeIcon icon={faHome} /> Goto Home</CustomLink></li>
                        <li><CustomLink to='/dashboard/orders'>My Orders</CustomLink></li>
                        <li><CustomLink to='/dashboard/addreview'>Add a Review</CustomLink></li>
                        <li><CustomLink to='/dashboard/updateprofile'>My Profile</CustomLink></li>
                        <li><button onClick={() => signOut(auth)} className='btn btn-ghost'><FontAwesomeIcon icon={faArrowRightFromBracket} /> Signout</button></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;