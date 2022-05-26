import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../fireabse.init';
import { toast } from 'react-toastify';
const UpdateProfile = () => {
    const [user] = useAuthState(auth)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [userInfo, setUserInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => setUserInfo(data));
    }, [user?.email])

    const { name, email, education, photo, github, address, phone } = userInfo;

    const onSubmit = async data => {
        const url = `http://localhost:5000/user/${email}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    toast.success('Profile Updated')
                } else {
                    toast.success('Already Up to date')
                }
            })
    };


    return (
        <div className='px-3 md:px-0 lg:px-0'>
            <h2 className='text-3xl my-3 font-bold text-secondary'>Update Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={user?.displayName} className="input input-bordered w-full mb-2" type="text" placeholder="name" disabled />

                <input defaultValue={email || user.email} disabled className="input input-bordered w-full mb-2" type="email" placeholder="email" />

                <input defaultValue={photo} className="input input-bordered w-full mb-2" type="text" placeholder="Profile Photo Url" {...register("photo", { required: true })} />
                {errors.photo?.type === "required" && <span className='text-red-600'>Required [Click Update Button Again to keep default data]</span>}

                <input defaultValue={phone} className="input input-bordered w-full mb-2" type="text" placeholder="Phone Number" {...register("phone", { required: true })} />
                {errors.phone?.type === "required" && <span className='text-red-600'>Required [Click Update Button Again to keep default data]</span>}

                <input defaultValue={education} className="input input-bordered w-full mb-2" type="text" placeholder="education" {...register("education", { required: true })} />
                {errors.education?.type === "required" && <span className='text-red-600'>Required [Click Update Button Again to keep default data]</span>}

                <input defaultValue={address} className="input input-bordered w-full mb-2" type="text" placeholder="address" {...register("address", { required: true })} />
                {errors.address?.type === "required" && <span className='text-red-600'>Required [Click Update Button Again to keep default data]</span>}

                <input defaultValue={github} className="input input-bordered w-full mb-2" type="text" placeholder="github" {...register("github", { required: true })} />
                {errors.github?.type === "required" && <span className='text-red-600'>Required [Click Update Button Again to keep default data]</span>}

                <input className='btn btn-primary w-full' type="submit" value='update' />
            </form>
        </div>

    );
};

export default UpdateProfile;