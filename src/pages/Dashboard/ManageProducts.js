import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ManageProduct from './ManageProduct'
const ManageProducts = () => {

    const getProducts = () => {
        return axios.get('http://localhost:5000/products')
    }

    const { data: products, isLoading, refetch } = useQuery('admin-product', getProducts)

    return (
        <div>
            <div className="overflow-x-auto mt-8">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.data.map((product, index)=><ManageProduct key={product._id} product={product} index={index}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;