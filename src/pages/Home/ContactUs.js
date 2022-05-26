import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        toast.success('thanks for submit')
    };
    return (
        <div className='py-20'>
            <div className="container mx-auto">
                <h2 className='text-3xl text-center text-secondary font-bold'>Contact Us</h2>
                <div className='w-[90%] lg:w-[50%] md:w-[50%] mx-auto'>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='mt-3' >Name</p>
                        <input className='input input-bordered w-full' type="text" placeholder="Name" {...register("Name", { required: true })} />
                        <p className='mt-3' >Email</p>
                        <input className='input input-bordered w-full' type="email" placeholder="Email" {...register("Email", { required: true })} />
                        <p className='mt-3' >Subject</p>
                        <input className='input input-bordered w-full  mt-3' type="text" placeholder="Subject" {...register("Subject", { required: true })} />
                        <p className='mt-3' >Message</p>
                        <textarea placeholder='Your Massage' className='input input-bordered w-full  mt-3'  {...register("Message", { required: true })} />

                        <input className='btn btn-primary w-full' type="submit" value={'Send'} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;