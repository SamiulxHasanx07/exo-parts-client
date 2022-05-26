import React from 'react';
import { useQuery } from 'react-query';
import Review from './Review';

const Reviews = () => {
    const fetchData = () => {
        return fetch('http://localhost:5000/reviews').then(res => res.json())
    }
    const { data: reviews, isLoading, refetch } = useQuery('reviews', fetchData)
    if (isLoading) {
        return <p>Loading ...</p>
    }
    return (
        <div className='py-28 bg-yellow-50'>
            <div className='container mx-auto'>
                <h2 className='text-3xl font-bold text-center text-secondary mb-10'>All Users Reviews</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8 px-2 md:px-0 lg:px-0'>
                    {
                        reviews.map(review => <Review key={review._id} singleReview={review} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Reviews;