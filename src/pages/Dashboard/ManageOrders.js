import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../fireabse.init';
import { toast } from 'react-toastify';
const ManageOrders = () => {

    const fetchData = () => {
        return fetch('http://localhost:5000/orders', { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                Navigate('/login')
            }
            return res.json()

        })
    }

    const { data, isLoading, refetch } = useQuery('admin-orders', fetchData)
    console.log(data);

    if (isLoading) {
        return <p>loading...</p>
    }

    const deleteProduct = (name, id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: `${name} this product will permanently delete!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#36d399',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/order/${id}`, {
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
    const handleShipped = (id) => {
        const url = `http://localhost:5000/manageshipped/${id}`
        fetch(`http://localhost:5000/manageshipped/${id}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                toast.success('Shipped Product');
                refetch()
            }
        })
    }
    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary'>All Orders</h2>
            <div className="overflow-x-auto mt-8">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((order, index) =>
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td >{order?.product}</td>
                                    <td>{order?.email}</td>
                                    <td>{order?.qty}</td>
                                    <td>${order?.price}</td>
                                    <td>{order?.date}</td>
                                    <td><span className={`btn btn-sm ${order.status === 'unpaid' ? 'btn-error' : 'btn-success'}`}>{order?.status === 'paid' ? 'Pendig' : order?.status}</span></td>
                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex="0" className="btn btn-ghost m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></label>
                                            <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                {
                                                    order.status === 'paid' ? <li>
                                                        <button onClick={() => handleShipped(order._id)} className='btn btn-ghost py-2'>Shipped</button>
                                                    </li> : <li>
                                                        <button onClick={() => deleteProduct(order?.product, order._id)} className='btn btn-ghost py-2'>Cancel</button>
                                                    </li>
                                                }


                                            </ul>
                                        </div>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;