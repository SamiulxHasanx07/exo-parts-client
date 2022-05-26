import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../fireabse.init';

const AddReview = () => {
    const [user] = useAuthState(auth)
    const [userInfo, setUserInfo] = useState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => setUserInfo(data));
    }, [user?.email])

    const reviewSubmit = (e) => {
        e.preventDefault();
        const name = user?.displayName;
        const email = user?.email;
        const review = e.target.review.value;
        const rating = e.target.rating.value;
        const img = user?.photoURL || userInfo?.photo;

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ name, img, email, review, rating })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('review added successfully')
                }
            })

        e.target.reset();

    }
    return (
        <div>

            <div className='w-[95%] lg:w-[50%] mx-auto mt-6'>
            <h2 className='text-secondary text-3xl font-bold'>Add Review</h2>
                <form onSubmit={reviewSubmit}>
                    <label>Write Your Reivew</label> <br />
                    <textarea required name='review' rows="5" className="w-full textarea textarea-bordered" placeholder="Writer Your Review Here"></textarea>

                    <div className='flex items-center'>
                        <input required name='rating' min={1} max={5} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <h3 className='ml-4'>Out Of 5</h3>
                    </div>
                    <div className='mt-3'>
                        <input className='btn btn-primary w-full' type="submit" value="Rating" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;