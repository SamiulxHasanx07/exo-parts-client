import React from 'react';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const Review = ({ singleReview }) => {
    const { name, img, review, rating } = singleReview;
    return (
        <div className="card w-full bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
                <div className="card-actions justify-between">
                    <div>
                        <h2 className="card-title">{name}</h2>

                        <Rating
                            initialRating={rating}
                            emptySymbol={<FontAwesomeIcon icon={faStar} />}
                            fullSymbol={<FontAwesomeIcon className='text-primary' icon={faStar} />}
                            readonly
                        >
                        </Rating>
                    </div>
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                </div>
                <p><FontAwesomeIcon className='text-2xl text-primary' icon={faQuoteLeft} /> <span>{review?.slice(0, 150)}</span> <FontAwesomeIcon className='text-2xl text-primary' icon={faQuoteRight} /></p>
            </div>
        </div>
    );
};

export default Review;