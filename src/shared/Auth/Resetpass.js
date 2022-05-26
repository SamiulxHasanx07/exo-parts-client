import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../fireabse.init';
const Resetpass = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    useEffect(() => {
        if (error) {
            toast.error(`${error}`)
        }
        if (sending) {
            toast.success('sending')
        }
    }, [error, sending])

    const handleResetPass = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        await sendPasswordResetEmail(email);
        e.target.reset();
    }
    return (
        <div className='py-20' style={{minHeight:'70vh'}}>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-secondary text-center py-8">Reset Password</h2>
                <div className='w-[50%] mx-auto'>
                    <form onSubmit={handleResetPass}>
                        <input type="email" name="email" placeholder='Enter Your Email' className='input input-bordered w-full mb-3' />
                        <input className='btn btn-primary w-full' type="submit" value='Reset Password' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Resetpass;