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
    // const onSubmit = data => {
    //     // console.log(data);
    // };
    // console.log(name);

    const imageStorageKey = '44daf0d61697611a00d9c6e302ea0d17';

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
                if(result.modifiedCount){
                    toast.success('Profile Updated')
                }
            })

        // const image = data.image[0];
        // const formData = new FormData();
        // formData.append('image', image);

        // const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(res => res.json())
        // .then(result => {
        //     if (result.success) {
        //         const img = result.data.url;
        //         const userData = {
        //             name: data.name,
        //             email: data.email,
        //         }
        // send to database
        // fetch('http://localhost:5000/doctor', {
        //     method: 'PATCH',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(userData)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             toast.success('Doctor Added Successfully');
        //             reset()
        //         } else {
        //             toast.error('Failed to add doctor')
        //         }
        //     })


        // }
        // console.log('imgbb result', result)
        // })


    };




    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="input input-bordered w-full mb-2" type="text" placeholder="Profile Photo Url" {...register("photo", { required: true })} />
            <input className="input input-bordered w-full mb-2" type="text" placeholder="Phone Number" {...register("phone", { required: true })} />
            <input className="input input-bordered w-full mb-2" type="text" placeholder="name" {...register("name", { required: true, min: 3 })} />
            <p className='py-3'>Email: {email}</p>
            {/* <input disabled className="input input-bordered w-full mb-2" type="email" placeholder="email" {...register("email")} /> */}
            <input className="input input-bordered w-full mb-2" type="text" placeholder="education" {...register("education", { required: true })} />
            <input className="input input-bordered w-full mb-2" type="text" placeholder="address" {...register("address", { required: true })} />
            <input className="input input-bordered w-full mb-2" type="text" placeholder="github" {...register("github", { required: true })} />
            <input className='btn btn-primary w-full' type="submit" value='update' />
        </form>
    );
};

export default UpdateProfile;