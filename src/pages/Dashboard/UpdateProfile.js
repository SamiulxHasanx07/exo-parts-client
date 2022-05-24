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
        fetch(`http://localhost:5000/user/${user?.email}`)
            .then(response => response.json())
            .then(data => setUserInfo(data));
    }, [user?.email])

    const { name, email, education, photo, github, address } = userInfo;

    const onSubmit = async data => {
        console.log(data)

        const url = `http://localhost:5000/user/${email}`;
        console.log(url);

        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    toast.success('Profile Updated')
                }
            })
    };


    return (
        <div className=''>
            <h2 className='text-3xl my-3 font-bold text-secondary'>Update Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={email} disabled className="input input-bordered w-full mb-2" type="email" placeholder="email" />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="Profile Photo Url" {...register("photo", { required: true })} />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="Phone Number" {...register("phone", { required: true })} />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="name" {...register("name", { required: true, min: 3 })} />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="education" {...register("education", { required: true })} />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="address" {...register("address", { required: true })} />
                <input className="input input-bordered w-full mb-2" type="text" placeholder="github" {...register("github", { required: true })} />
                <input className='btn btn-primary w-full' type="submit" value='update' />
            </form>
        </div>

    );
};

export default UpdateProfile;