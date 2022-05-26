import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Order = ({ singleOrder, index, refetch }) => {
    const { _id, product, name, email, price, address, qty, status, date, transactionId } = singleOrder;
    const deleteOrder = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `${product} this product will permanently delete!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#36d399',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://exo-parts.herokuapp.com/order/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount === 1) {
                            Swal.fire(
                                'Canelled!',
                                'Your Order has been cancelled.',
                                'success'
                            )
                            refetch();
                        }
                    })
            }
        })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td title={`${product}`}>{`${product ? product?.slice(0, 18) + '..' : ''}`}</td>
            <td>{email}</td>
            <td>{qty}</td>
            <td>${price}</td>
            <td>{date}</td>
            <td><span className={`px-2 py-1 rounded-md ${status !== 'unpaid' ? 'bg-green-500' : 'bg-yellow-300'}`}>{status}</span></td>
            <td>
                {
                    status === 'paid' ? 'TXN :' + transactionId : <>

                        <Link to={`/dashboard/payment/${_id}`} className='btn btn-sm btn-success'>Pay Now</Link>
                        <button onClick={deleteOrder} className='ml-3 btn btn-sm bg-red-400'>Cancel</button>
                    </>
                }
            </td>
        </tr>
    );
};

export default Order;