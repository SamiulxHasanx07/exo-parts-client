import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../fireabse.init';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onSubmit = async (data) => {
        const { email, password } = data;
        console.log(email, password);

        signInWithEmailAndPassword(email, password)

    };

    useEffect(() => {
        if (error) {
            toast.error(error?.code);
        }
    }, [error])



    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/home";
    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, navigate, from])
    return (
        <div>

            <div className='form-container w-1/2 mx-auto shadow-xl my-12 px-16 pb-10'>
                <h2 className="text-4xl text-center mt-20 text-primary font-bold">Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
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
                                value: /^.{6,}$/i, message: "Password Minimum 6 character"
                            }
                        })} />
                        {errors.password?.type === 'required' && <span className="label text-red-500">Password Required</span>}

                        {errors?.password?.type === 'pattern' && <span className="label text-red-500">{errors?.password.message}</span>}
                    </div>


                    <div className='flex flex-col justify-start items-start'>
                        <span>Don't have an account <Link to='/register' className='btn btn-sm btn-success mt-5'>Create Account</Link></span>
                        <span>Forgot Password? <Link to='/resetpass' className='btn btn-sm btn-error mt-5'>Reset password</Link></span>
                    </div>
                    <div>
                        <input className='btn btn-primary mt-8 w-full' type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;