import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-[90vh]" style={{backgroundImage:`url('https://raw.githubusercontent.com/SamiulxHasanx07/exo-parts-images/main/banner/banner-bg.png')`}}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://raw.githubusercontent.com/SamiulxHasanx07/exo-parts-images/main/banner/banner-img.png" className="mx-w-lg w-[500px] rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold text-white text-left">Exo Parts Best Car Parts manufacturer</h1>
                    <p className="py-6 text-left text-white">Exo parts is reach total  150M+ customer.Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className='text-left'>
                        <button className="btn btn-primary">Explore More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;