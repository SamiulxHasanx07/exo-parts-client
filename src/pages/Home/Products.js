import React from 'react';
import Product from './Product';

const Products = () => {
    const products = [
        {
            id: 1, name: 'Power Stop Caliper Covers', price: 35, available:500
        },
        {
            id: 2, name: 'Power Stop Caliper Covers', price: 35, available:500
        },
        {
            id: 3, name: 'Power Stop Caliper Covers', price: 35, available:500
        },
        {
            id: 4, name: 'Power Stop Caliper Covers', price: 35, available:500
        },
        {
            id: 5, name: 'Power Stop Caliper Covers', price: 35, available:500
        },
        {
            id: 6, name: 'Power Stop Caliper Covers', price: 35, available:500
        }
    ]
    return (
        <div className='py-28'>
            <div className='products-container container mx-auto'>
                <h2 className='text-4xl font-bold mb-16'>Exo Parts</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 '>
                    {
                        products.map(product => <Product key={product.id} product={product} />)
                    }
                </div>

            </div>
        </div>
    );
};

export default Products;