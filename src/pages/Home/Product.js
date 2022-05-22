import React from 'react';

const Product = ({ product }) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 border-2 mx-auto">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{product?.name}</h2>
                    <div className='flex justify-between'>
                        <h4 className='text-xl font-bold'>${product.price} /unit</h4>
                        <h4 className='text-xl'>Min Order: 50 pcs</h4>
                    </div>
                    <p className='text-xl text-left'>Available: {product.available} pcs</p>
                    <p className=' text-left'>This is great quality product Best for new startup business</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;