import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../fireabse.init';

const AddReview = () => {
    const [user] = useAuthState(auth)

    const reviewSubmit = (e) => {
        e.preventDefault();
        const name = user?.displayName;
        const email = user?.email;
        const review = e.target.review.value;
        const rating = e.target.rating.value;
        const img =  user?.photoURL;

        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, img, email, review, rating })
        })
            .then(res => res.json())
            .then(data => console.log(data))

        e.target.reset();

    }
    return (
        <div>
            <h2 className='text-secondary text-3xl font-bold'>Add Review</h2>

            <div className='w-[50%] mt-6'>
                <form onSubmit={reviewSubmit}>
                    <label>Write Your Reivew</label> <br />
                    <textarea required name='review' rows="5" class="w-full textarea textarea-bordered" placeholder="Writer Your Review Here"></textarea>

                    <div className='flex items-center'>
                        <input required name='rating' min={1} max={5} type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
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