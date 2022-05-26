import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data?.acknowledged){
                    toast.success('New Product Added')
                    reset()
                }
            })
    };
    return (
        <div className='px-3 md:px-0 lg:px-0'>
            <h2 className='text-3xl text-secondary font-bold mb-3'>Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='input input-bordered w-full mt-3' type="text" placeholder="Product Name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && <span className='text-red-600'>Name Required</span>}
                <input className='input input-bordered w-full mt-3' type="number" placeholder="Product Price" {...register("price", { required: true, min: 0 })} />
                {errors.price?.type === "required" && <span className='text-red-600'>Price Required Min Value 0</span>}
                <input className='input input-bordered w-full mt-3' type="number" placeholder="Minimum Order" {...register("minOrder", { required: true })} />
                {errors.minOrder?.type === "required" && <span className='text-red-600'>Minnimum Order Required</span>}

                <input className='input input-bordered w-full mt-3' type="number" placeholder="Total Available Product" {...register("available", { required: true })} />
                {errors.available?.type === "required" && <span className='text-red-600'>Available ProductRequired</span>}

                <input className='input input-bordered w-full mt-3' type="text" placeholder="Product Image" {...register("image", { required: true })} />
                {errors.image?.type === "required" && <span className='text-red-600'>Image Link Required</span>}

                <textarea placeholder='Product Desciption' className='input input-bordered w-full mt-3' {...register("description", { required: true })} />
                {errors.description?.type === "required" && <span className='text-red-600'>Description Required</span>}

                <input className='btn btn-success w-full mt-3' type="submit" value='Add Product' />
            </form>
        </div>
    );
};

export default AddProduct;