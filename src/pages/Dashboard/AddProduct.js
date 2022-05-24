import React from 'react';
import { useForm } from 'react-hook-form';


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5000/products',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    };
    console.log(errors);
    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='input input-bordered w-full mt-3' type="text" placeholder="Product Name" {...register("name", { required: true })} />
                <input className='input input-bordered w-full mt-3' type="number" placeholder="Product Price" {...register("price", { required: true, min: 0})} />
                <input className='input input-bordered w-full mt-3' type="number" placeholder="Minimum Order" {...register("minOrder", { required: true })} />
                <input className='input input-bordered w-full mt-3' type="number" placeholder="Total Available Product" {...register("available", { required: true })} />
                <input className='input input-bordered w-full mt-3' type="text" placeholder="Product Image" {...register("image", { required: true })} />
                <textarea placeholder='Product Desciption' className='input input-bordered w-full mt-3' {...register("description", {})} />

                <input className='btn btn-success w-full mt-3' type="submit" value='Add Product'/>
            </form>
        </div>
    );
};

export default AddProduct;