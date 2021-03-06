import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ManageProduct from './ManageProduct'
const ManageProducts = () => {
    const getProducts = () => {
        return axios.get('https://exo-parts.herokuapp.com/products')
    }
    const { data: products, isLoading, refetch } = useQuery('admin-product', getProducts)
    if(isLoading){
        return <button className="btn btn-square bg-primary loading"></button>
    }
    return (
        <div className='px-3 md:px-0 lg:px-0'>
            <h2 className='text-3xl font-bold'>Manage All Products</h2>
            <div className="mt-8 overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Min Order</th>
                            <th>Available</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.data?.map((product, index)=><ManageProduct key={product._id} product={product} index={index} refetch={refetch}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;