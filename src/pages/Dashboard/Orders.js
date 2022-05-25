import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../fireabse.init';
import Order from './Order';

const Orders = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const fetchData = () => {
        return fetch(`http://localhost:5000/orders/${user?.email}`, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                navigate('/login')
            }
            return res.json()

        })
    }

    const { data: orders, isLoading, refetch } = useQuery('user-orders', fetchData)

    if (isLoading) {
        return <p>Loading....</p>
    }
    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary'>My Orders</h2>
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
                            orders?.map((order, index) => <Order key={order._id} singleOrder={order} index={index} refetch={refetch} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;