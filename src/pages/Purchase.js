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
    const [minQty, setMinQty] = useState(0);
    const [inputValueError, setInputValueError] = useState('')
    const { id } = useParams();

    const singleProduct = () => {
        return axios.get(`https://exo-parts.herokuapp.com/product/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    }
    const { data, isLoading, refetch } = useQuery('single product', singleProduct)
    console.log(minQty);

    useEffect(() => {

        setMinQty(data?.data.minOrder)
    }, [data?.data.minOrder])


    useEffect(() => {
        if (minQty > 0) {
            const minValidation = minQty < data?.data.minOrder || minQty > data?.data.available;
            if (minValidation) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }


        if (minQty === '' || minQty < 1) {
            setInputValueError(true)
        } else {

            setInputValueError(false)
        }
    }, [minQty])

    if (isLoading) {
        return <button className="btn btn-square loading"></button>
    }
    const userInput = (e) => {
        setInputValue(e.target.value)
        const userData = parseInt(e.target.value);
        const minOrder = parseInt(data?.data.minOrder)
        setMinQty(e.target.value)
        if (userData > 0) {
            const minValidation = userData < minOrder || userData < data?.data.available;
            if (minValidation) {
                setDisabled(true)
                // setInputValueError(true)
            } else {
                setDisabled(false)
                // setInputValueError(false)
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

            fetch('https://exo-parts.herokuapp.com/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ product: data?.data.name, name: user?.displayName, email, price, address, phone, qty, status: 'unpaid', date: today, })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        e.target.reset();
                        toast.success('Thanks for order, please proced to payment')
                    }
                })

            const updateAvailable = data?.data.available - qty;

            fetch(`https://exo-parts.herokuapp.com/product/${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
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


    const descreaseNumber = () => {
        setMinQty(parseInt(minQty) - 1)
    }
    const increaseNumber = () => {
        setMinQty(parseInt(minQty) + 1)
    }

    return (
        <div className='container mx-auto'>
            <div className="card lg:card-side bg-base-100 shadow-xl px-2 md:px-0 lg:px-0 lg:p-16 p-0 my-10">
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
                            <div className='d-flex '>
                                <span onClick={descreaseNumber} className='btn btn-success'>-</span>
                                <input name='qty' onChange={userInput} type="text" defaultValue={minQty} placeholder="Enter Quantity" className="input input-bordered  mt-10" />
                                <span onClick={increaseNumber} className='btn btn-success'>+</span>
                            </div>
                            {
                                inputValueError ? <span className='text-red-700 block'>Please Enter Valid Number</span> : ''
                            }
                            {disabled && <span className='text-red-700'>Minimum Qty: {data?.data.minOrder}  {data?.data.available > data?.data.minOrder ? `& Maximum Qty: ${data?.data.available}` : ''}</span>}

                            <input required type="text" name='phone' placeholder='Phone Number' className="input input-bordered w-full  mt-10" />
                            <input disabled type="text" className="input input-bordered w-full  mt-10" value={user && user.displayName} />
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