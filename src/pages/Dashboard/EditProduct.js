import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const EditProduct = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [id])
    const { name, price, minOrder, available, image, description } = product;
    const onSubmit = data => {
        const url = `http://localhost:5000/pd/${id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success('Edit Done')
                }
            })
    };

    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary'>Edit Product</h2>
            <Link className='btn btn-warning my-3' to='/dashboard/manageproducts'><FontAwesomeIcon icon={faArrowLeft} /><span className='ml-3'>Go to Manage Product</span></Link>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={name} className='input input-bordered w-full mt-3' type="text" placeholder="name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <input defaultValue={price} className='input input-bordered w-full mt-3' type="number" placeholder="price" {...register("price", { min: 0, required: true })} />
                {errors.price?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <input defaultValue={minOrder} className='input input-bordered w-full mt-3' type="number" placeholder="minOrder" {...register("minOrder", { required: true })} />
                {errors.minOrder?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <input defaultValue={available} className='input input-bordered w-full mt-3' type="number" placeholder="available" {...register("available", { required: true })} />
                {errors.available?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <input defaultValue={image} className='input input-bordered w-full mt-3' type="text" placeholder="image" {...register("image", { required: true })} />
                {errors.image?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <textarea defaultValue={description} className='input input-bordered w-full mt-3'  {...register("description", { required: true })} />
                {errors.description?.type === "required" && <span className='text-red-600'>Required [Click Edit Button Again to keep default data]</span>}
                <input className='btn btn-success w-full mt-3' type="submit" value='Edit' />
            </form>
        </div>
    );
};

export default EditProduct;