import React from 'react';
import Product from './Product';
import { useQuery } from 'react-query';
import axios from 'axios';

const Products = () => {
    const getProducts = () =>{
        return axios.get('http://localhost:5000/products')
    }

    const {data:products, isLoading, refetch} =  useQuery('products', getProducts )

    return (
        <div className='py-28'>
            <div className='products-container container mx-auto'>
                <h2 className='text-4xl font-bold mb-16 text-center'>Exo Parts</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 '>
                    {
                        products?.data.map(product => <Product key={product._id} product={product} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default Products;