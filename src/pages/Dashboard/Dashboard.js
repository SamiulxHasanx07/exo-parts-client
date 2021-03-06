import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomLink from '../../shared/CustomLink';
import { faHome, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import auth from '../../fireabse.init';
import useAdmin from '../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';

const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)

    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col lg:px-16 py-5 md:py-0 lg:py-0">
                    {/* <!-- Page content here --> */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mx-2">< FontAwesomeIcon className="text-3xl" icon={faBars} /></label>
                    <h2 className='text-3xl text-secondary font-bold py-10'>Dashboard</h2>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80  text-base-content bg-primary">
                        {/* <!-- Sidebar content here --> */}
                        {
                            admin !== 'admin' ? <>
                                <li><CustomLink to='/home'><FontAwesomeIcon icon={faHome} /> Goto Home</CustomLink></li>
                                <li><CustomLink to='/dashboard/orders'>My Orders</CustomLink></li>
                                <li><CustomLink to='/dashboard/addreview'>Add a Review</CustomLink></li>
                                <li><CustomLink to='/dashboard/myprofile'>My Profile</CustomLink></li>
                            </> : ''
                        }

                        {
                            admin === 'admin' && <>
                                <li><CustomLink to='/home'><FontAwesomeIcon icon={faHome} /> Goto Home</CustomLink></li>
                                <li><CustomLink to='/dashboard/addproduct'>Add A Product</CustomLink></li>
                                <li><CustomLink to='/dashboard/makeadmin'>Make A Admin</CustomLink></li>
                                <li><CustomLink to='/dashboard/manageorders'>Manage Orders</CustomLink></li>
                                <li><CustomLink to='/dashboard/manageproducts'>Manage Products</CustomLink></li>
                                <li><CustomLink to='/dashboard/myprofile'>My Profile</CustomLink></li>
                            </>
                        }
                        <li><button onClick={() => signOut(auth)} className='btn btn-ghost'><FontAwesomeIcon icon={faArrowRightFromBracket} /> Signout</button></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;