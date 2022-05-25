import React from 'react';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
const ManageProduct = ({ product, index, refetch }) => {
    const { _id, name, price, minOrder, available, description } = product;

    const deleteProduct = () => {
        console.log('delete product');
        console.log(`http://localhost:5000/product/${_id}`);

        fetch(`http://localhost:5000/product/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success('Successfully deleted!!');
                    refetch();
                }
            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td title={name}>{name.slice(0, 25)}..</td>
            <td>${price}</td>
            <td>{minOrder}</td>
            <td>{available}</td>
            <td title={description}>{description.slice(0, 25)}</td>
            <td>
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></label>
                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link className='btn btn-ghost' to={`/dashboard/editproducts/${_id}`}>Edit Product</Link>
                        </li>
                        <li><button onClick={deleteProduct} className='btn btn-ghost py-2'>Delete</button></li>
                    </ul>
                </div>


            </td>
        </tr>
    );
};

export default ManageProduct;