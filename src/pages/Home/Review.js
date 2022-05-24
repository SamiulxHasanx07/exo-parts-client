import React from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const Review = ({ singleReview }) => {
    const { name, img, review, rating } = singleReview;
    return (
        <div class="card w-full bg-base-100 shadow-xl mx-auto">
            <div class="card-body">
                <Rating
                    initialRating={rating}
                    emptySymbol={<FontAwesomeIcon icon={faStar} />}
                    fullSymbol={<FontAwesomeIcon className='text-primary' icon={faStar} />}
                    readonly
                >
                </Rating>
                <p><FontAwesomeIcon  className='text-2xl text-primary' icon={faQuoteLeft}/> <span>{review?.slice(0,150)}</span> <FontAwesomeIcon  className='text-2xl text-primary' icon={faQuoteRight}/></p>
                <div class="card-actions justify-between">
                    <h2 class="card-title">{name}</h2>
                    <div class="avatar">
                        <div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;