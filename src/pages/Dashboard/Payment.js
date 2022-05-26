// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
// import {
//     CardElement,
//     Elements,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';


// const stripePromise = loadStripe('pk_test_51L0VrqIhFMxmfhvTxZfbtWVblrpI6lWhiGFbTXXeXrBolGMs5Q3QtJmBdTEG3vT0uOIuzTHuOzuU9AZhLY2f2Wn100kExFrrQe');

// const Payment = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState([])

//     useEffect(() => {
//         const url = `http://localhost:5000/order/${id}`;
//         fetch(url, {
//             headers: {
//                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
//             }
//         })
//             .then(res => res.json())
//             .then(data => setOrder(data))
//     }, [id])



//     return (
//         <div>
//             <h2 className='text-3xl font-bold text-secondary'>Payment for</h2>
//             <div class="overflow-x-auto py-3">
//                 <table class="table w-full">
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Product</th>
//                             <th>Total Price</th>
//                             <th>Quantity</th>
//                             <th>Email</th>
//                             <th>Order Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th>1</th>
//                             <td>{order?.product}</td>
//                             <td>{order?.price}</td>
//                             <td>{order?.qty}</td>
//                             <td>{order?.email}</td>
//                             <td>{order?.date}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             <div>

//                 <div class="card w-96 bg-base-100 shadow-xl">
//                     <div class="card-body">
//                         <Elements stripe={stripePromise}>
//                             <CheckoutForm order={order} />
//                         </Elements>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Payment;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0VrqIhFMxmfhvTxZfbtWVblrpI6lWhiGFbTXXeXrBolGMs5Q3QtJmBdTEG3vT0uOIuzTHuOzuU9AZhLY2f2Wn100kExFrrQe');

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/order/${id}`;

    const { data: order, isLoading } = useQuery(['order', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div class="overflow-x-auto py-3">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Total Price</th>
                            <th>Quantity</th>
                            <th>Email</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>{order?.product}</td>
                            <td>{order?.price}</td>
                            <td>{order?.qty}</td>
                            <td>{order?.email}</td>
                            <td>{order?.date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;