import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../fireabse.init';
const MyProfile = () => {
    const [user] = useAuthState(auth)
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setUserInfo(data))
    }, [user])

    const { name, phone, education, address, github, photo } = userInfo;
    return (
        <div>
            <div className="card w-[95%] md:w-[90%] lg:w-[60%] mx-auto bg-base-100 shadow-xl  border-2 my-10">
                <h2 className='text-3xl font-bold text-secondary text-center py-8'>User Porfile</h2>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <div>
                            <h3 className="text-2xl text-secondary">User Name</h3>
                            <h3 className='text-secondary'>{name}</h3>
                            <h3 className="text-2xl text-secondary">User Email</h3>
                            <h3 className='text-secondary'>{user?.email}</h3>
                        </div>
                        <div>
                            <div className='rounded-[100px] overflow-hidden'>
                                <img className='w-[100px]' src={photo ? photo : user?.photoURL} alt="" />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-2xl text-secondary">Phone</h3>
                    <h3 className='text-secondary'>{phone ? phone : 'Not Available'}</h3>
                    <h3 className="text-2xl text-secondary">Education</h3>
                    <h3 className='text-secondary'>{education ? education : 'Not Available'}</h3>
                    <h3 className="text-2xl text-secondary">Address</h3>
                    <h3 className='text-secondary'>{address ? address : 'Not Available'}</h3>
                    <h3 className="text-2xl text-secondary">Github Link</h3>
                    <h3 className='text-secondary'>{github ? github : 'Not Available'}</h3>
                    <Link to='/dashboard/updateprofile' className='btn btn-primary mt-8'>Update Info</Link>
                </div>
            </div>

        </div>
    );
};

export default MyProfile;