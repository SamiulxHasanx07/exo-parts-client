import React from 'react';
import { faShop, faDollarSign, faAward, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountUp from 'react-countup';
const Summary = () => {

    return (
        <div style={{ backgroundImage: `url('https://raw.githubusercontent.com/SamiulxHasanx07/exo-parts-images/main/banner/banner-bg.png')` }} className='py-32'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-0 lg:gap-0">
                    <div>
                        <h2 className='text-5xl font-bold text-center text-primary'><CountUp start={0} end={350}/>+</h2>
                        <h3 className='text-white text-3xl  text-center'><FontAwesomeIcon icon={faShop} /> Total Dealer</h3>
                    </div>
                    <div>
                        <h2 className='text-5xl font-bold text-center text-primary'><CountUp start={0} end={150}/>M+</h2>
                        <h3 className='text-white text-3xl  text-center'><FontAwesomeIcon icon={faDollarSign} /> Annual revenue</h3>
                    </div>
                    <div>
                        <h2 className='text-5xl font-bold text-center text-primary'><CountUp start={0} end={40}/>+</h2>
                        <h3 className='text-white text-3xl  text-center'><FontAwesomeIcon icon={faAward} /> Winning Award</h3>
                    </div>
                    <div>
                        <h2 className='text-5xl font-bold text-center text-primary'><CountUp start={0} end={800}/>+</h2>
                        <h3 className='text-white text-3xl  text-center'><FontAwesomeIcon icon={faGear} /> Total Parts</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Summary;