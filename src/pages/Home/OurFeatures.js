import React from 'react';
import { faWrench, faBuilding, faClock, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OurFeatures = () => {
    return (
        <div className='py-20 bg-yellow-50'>
            <div className="container mx-auto px-6 md:px-0 lg:px-0">
                <h2 className='text-3xl font-bold text-secondary'>Our Features</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-10'>
                    <div>
                        <div class="card w-full bg-base-100 shadow-xl">
                            <div className='flex items-center justify-center pb-6'>
                                <div className='rounded-b-full bg-primary p-8'>
                                    <FontAwesomeIcon className='text-3xl text-secondary' icon={faWrench} />
                                </div>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    After Seles Servise
                                </h2>
                                <p>We provide the best after seles service</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card w-full bg-base-100 shadow-xl">
                            <div className='flex items-center justify-center pb-6'>
                                <div className='rounded-b-full bg-primary p-8'>
                                    <FontAwesomeIcon className='text-3xl text-secondary' icon={faBuilding} />
                                </div>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    World Wide Dealer
                                </h2>
                                <p>We provide the best after seles service</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card w-full bg-base-100 shadow-xl">
                            <div className='flex items-center justify-center pb-6'>
                                <div className='rounded-b-full bg-primary p-8'>
                                    <FontAwesomeIcon className='text-3xl text-secondary' icon={faClock} />
                                </div>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    Durablity
                                </h2>
                                <p>We provide the best after seles service</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card w-full bg-base-100 shadow-xl">
                            <div className='flex items-center justify-center pb-6'>
                                <div className='rounded-b-full bg-primary p-8'>
                                    <FontAwesomeIcon className='text-3xl text-secondary' icon={faIndustry} />
                                </div>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">
                                    Best car parts Manufacturer
                                </h2>
                                <p>We provide the best after seles service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurFeatures;