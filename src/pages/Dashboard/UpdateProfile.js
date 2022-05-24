import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../fireabse.init';
const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <div class="card w-[60%] mx-auto bg-base-100 shadow-xl  border-2 my-10">
                <h2 className='text-3xl font-bold text-secondary text-center py-8'>User Porfile</h2>
                <div class="card-body">
                    <div className='flex justify-between'>
                        <div>
                            <h3 className="text-2xl text-secondary">User Name</h3>
                            <h3 className='text-secondary'>{user?.displayName}</h3>
                            <h3 className="text-2xl text-secondary">User Email</h3>
                            <h3 className='text-secondary'>{user?.email}</h3>
                        </div>
                        <div>
                            <div className='rounded-[100px] overflow-hidden'>
                                <img src={user?.photoURL} alt="" />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-2xl text-secondary">Phone</h3>
                    <h3 className='text-secondary'>{user?.email}</h3>
                    <h3 className="text-2xl text-secondary">Education</h3>
                    <h3 className='text-secondary'>{user?.email}</h3>
                    <h3 className="text-2xl text-secondary">Address</h3>
                    <h3 className='text-secondary'>{user?.email}</h3>
                    <h3 className="text-2xl text-secondary">Github Link</h3>
                    <h3 className='text-secondary'>{user?.email}</h3>
                    <button className='btn btn-primary mt-8'>Update Info</button>
                </div>
            </div>

        </div>
    );
};

export default UpdateProfile;