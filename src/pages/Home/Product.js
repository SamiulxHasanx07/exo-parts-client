import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div>
            <div className="card w-full bg-base-100 border-2 mx-auto">
                <figure><img src={`${product.image}`} alt={product.name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{product?.name}</h2>
                    <div className='flex justify-between'>
                        <h4 className='text-xl font-bold'>${product.price} /pcs</h4>
                        <h4 className='text-xl'>Min Order: {product.minOrder} pcs</h4>
                    </div>
                    <p className='text-xl text-left'>Available: {product.available} pcs</p>
                    <p className=' text-left'>{product?.description.slice(0,120)} {product?.description.length>120?<span>...</span>:''}</p>
                    <div className="card-actions justify-center">
                        <Link to={`/purchase/${product._id}`} className="btn btn-primary">Place Order</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;