import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../fireabse.init';
// import useGetData from '../hooks/useGetData';

const Purchase = () => {
    const [user] = useAuthState(auth)
    const [disabled, setDisabled] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputValueError, setInputValueError] = useState('')
    const { id } = useParams();

    const singleProduct = () => {
        return axios.get(`http://localhost:5000/product/${id}`)
    }
    const { data, isLoading, refetch } = useQuery('single product', singleProduct)

    // const url =  `http://localhost:5000/product/${id}`;
    // const { data, isLoading, refetch } = useGetData(url, 'single data')


    console.log(user);


    if (isLoading) {
        return <p>Loading...</p>
    }

    const userInput = (e) => {
        setInputValue(e.target.value)
        const minOrder = parseInt(data?.data.minOrder)
        const userData = parseInt(e.target.value);
        if (userData > 0) {
            const minValidation = userData < minOrder || userData > data?.data.available;
            if (minValidation) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }

        if (userData === '' || userData < 1) {
            setInputValueError(true)
        } else {

            setInputValueError(false)
        }
    }

    const placeOrder = (e) => {
        e.preventDefault();
        const email = user?.email;
        const address = e.target.shipping.value;
        const phone = e.target.phone.value;
        const qty = e.target.qty.value;
        console.log(data?.data.available >= data?.data.minOrder);
        
        if (parseInt(data?.data.available) >= data?.data.minOrder) {
            const date = new Date();
            const today = date.getFullYear() + '-' + (date.getMonth()) + '-' + (date.getDate());

            const price = qty * data?.data.price;

            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ product:data?.data.name, name: user?.displayName, email, price, address, phone, qty, status: 'unpaid', date: today })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        e.target.reset();
                        toast.success('Thanks for order, please proced to payment')
                    }
                })

            const updateAvailable = data?.data.available - qty;

            fetch(`http://localhost:5000/product/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ available: updateAvailable })
            })
                .then(res => res.json())
                .then(data => {
                    refetch()
                })
        } else {
            toast.error('stock out')
        }
    }


    return (
        <div className='container mx-auto'>
            <div className="card lg:card-side bg-base-100 shadow-xl p-16 my-10">
                <figure>
                    <img src={`${data?.data.image}`} className='w-[400px]' alt="Album" />
                </figure>

                <div className='px-2 lg:px-20'>
                    <h2 className='text-center text-4xl font-bold text-secondary py-5'>{data?.data.name}</h2>
                    <p>{data?.data.description}</p>
                    <div className='md:flex justify-between mt-8'>
                        <h3 className='text-secondary text-4xl font-bold py-4'>${data?.data.price} /per pcs</h3>
                        <h3 className='text-secondary text-4xl font-bold py-4'>Available: {data?.data.available}</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <tbody>
                                <tr>
                                    <th>Total Available:</th>
                                    <td>{data?.data.available}</td>
                                </tr>
                                <tr>
                                    <th>Minimum Order:</th>
                                    <td>{data?.data.minOrder}</td>
                                </tr>
                                <tr>
                                    <th>Maximum Order: </th>
                                    <td>{data?.data.available}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="">
                        <form onSubmit={placeOrder}>
                            <input name='qty' onChange={userInput} type="number" defaultValue={data?.data.minOrder} placeholder="Enter Quantity" className="input input-bordered w-full  mt-10" />
                            {
                                inputValueError ? <label className='text-red-700 block'>Please Enter Valid Number</label> : ''
                            }
                            {disabled && <label className='text-red-700'>Minimum Qty: {data?.data.minOrder}  {data?.data.available > data?.data.minOrder ? `& Maximum Qty: ${data?.data.available}` : ''}</label>}
                            <input required type="text" name='phone' placeholder='Phone Number' className="input input-bordered w-full  mt-10" />
                            <input disabled type="text" className="input input-bordered w-full  mt-10" value={user && user.email} />
                            <textarea required name='shipping' type="text" className="input input-bordered w-full mt-10" placeholder='Enter Your Shipping Address' />

                            <input type='submit' disabled={disabled} className="mt-5 btn btn-primary w-full text-white" value='PlaceOrder' />

                        </form>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Purchase;