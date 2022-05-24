import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../fireabse.init';
import { toast } from 'react-toastify';
import SocialLogin from './SocialLogin';
const Register = () => {
    const [confirm, setConfirm] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const confirmError = data.password === data.confirm;
        if (!confirmError) {
            setConfirm('Not Match')
        } else {
            setConfirm('')
        }
        const { name, email, password } = data;
        await createUserWithEmailAndPassword(email, password)
        const userData = { name, email, phone: '', education: '', address: '', github: '', role: 'customer', photo: '' }
        setUserInfo(userData)
        await updateProfile({ displayName: name })


    };

    useEffect(() => {
        if (error) {
            toast.error(error?.code);
        }
    }, [error])

    const navigate = useNavigate()
    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }
        if (user) {
            navigate('/home')
        }
    }, [user, navigate, userInfo])
    return (
        <div>

            <div className='form-container w-1/2 mx-auto shadow-xl my-12 px-16 pb-10'>
                <h2 className="text-4xl text-center mt-20 text-primary font-bold">Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg">Your Name</span>
                        </label>
                        <input className="input input-bordered w-full" type="text" placeholder="Your Name" {...register("name", { required: true, min: 3, maxLength: 256 })} />

                        {errors.name?.type === 'required' && <span className="label text-red-500">Name Required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg">Your Email</span>
                        </label>
                        <input className="input input-bordered w-full" type="text" placeholder="Email" {...register("email", {
                            required: true, pattern: {
                                value: /^\S+@\S+$/i, message: 'Enter Valid Email'
                            }
                        })} />
                        {errors.email?.type === 'required' && <span className="label text-red-500">Email Required</span>}

                        {errors.email?.type === 'pattern' && <span className="label text-red-500">{errors.email.message}</span>}
                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg">Enter Password</span>
                        </label>
                        <input className='input input-bordered w-full' type="password" placeholder="Password" {...register("password", {
                            required: true, pattern: {
                                value: /^.{6,}$/i, message: "Enter Valid password"
                            }
                        })} />
                        {errors.password?.type === 'required' && <span className="label text-red-500">Password Required</span>}

                        {errors.pass?.type === 'pattern' && <span className="label text-red-500">{errors.pass.message}</span>}
                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg">Confirm Password</span>
                        </label>
                        <input className='input input-bordered w-full' type="password" placeholder="Password" {...register("confirm", { required: true })} />
                        {errors.confirm?.type === 'required' && <span className="label text-red-500">Required Confirm Password</span>}
                        {confirm ? <span className="label text-red-500">Not Match</span> : ''}
                    </div>
                    <div className='flex justify-start items-center'>
                        <span>Already Have an Account <Link to='/login' className='btn btn-sm btn-success mt-8'>Login</Link></span>
                    </div>
                    <div>
                        <input className='btn btn-primary mt-8 w-full' type="submit" value="Register" />
                    </div>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;