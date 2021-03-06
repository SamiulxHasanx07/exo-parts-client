import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const MakeAdmin = () => {
    const getProducts = () => {
        return axios.get('https://exo-parts.herokuapp.com/users')
    }
    const { data: userTable, refetch, isLoading } = useQuery('make-admin', getProducts)
    const makeAdmin = (email) => {
        if (email) {

            Swal.fire({
                title: 'Are you sure?',
                text: `Are you sure? Assign as admin this ${email} user?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#36d399',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Assign Admin!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `https://exo-parts.herokuapp.com/make-admin/${email}`
                    fetch(url, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {

                            if (data?.modifiedCount) {
                                Swal.fire(
                                    'Admin Added!',
                                    'Successfully Added Admin.',
                                    'success'
                                )
                            }
                            refetch()
                        })
                }
            })
        }
    }
    if (isLoading) {
        return <button className="btn btn-square bg-primary loading"></button>
    }
    const makeCustomer = (email) => {
        if (email) {
            Swal.fire({
                title: 'Are you sure?',
                text: `Are you sure remove this admin ${email} !`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#36d399',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Remove Admin!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `https://exo-parts.herokuapp.com/remove-admin/${email}`
                    fetch(url, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {

                            if (data?.modifiedCount) {
                                Swal.fire(
                                    'Admin Removed!',
                                    'Successfully Removed Admin.',
                                    'success'
                                )
                            }
                            refetch()
                        })

                }
            })

        }
    }
    return (
        <div className='px-3 md:px-0 lg:px-0'>
            <h2 className='text-3xl font-bold text-secondary'>Make a admin</h2>
            <div className="overflow-x-auto mt-8">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userTable?.data.map((singleUser, index) => <tr key={singleUser._id}>
                                <th>{index + 1}</th>
                                <td>{singleUser?.name}</td>
                                <td>{singleUser?.email}</td>
                                <td>{singleUser?.role}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-8 rounded">
                                            <img src={singleUser.photo} alt="Tailwind-CSS-Avatar-component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {
                                        singleUser.role === 'admin' ? <button onClick={() => makeCustomer(singleUser?.email)} className='btn btn-sm bg-red-400'>Remove Admin</button> : <button onClick={() => makeAdmin(singleUser?.email)} className='btn btn-sm btn-success'>Make Admin</button>
                                    }
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;