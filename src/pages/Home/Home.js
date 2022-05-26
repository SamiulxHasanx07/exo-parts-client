import React from 'react';
import Banner from './Banner';
import ContactUs from './ContactUs';
import OurFeatures from './OurFeatures';
import Products from './Products';
import Reviews from './Reviews';
import Summary from './Summary';

const Home = () => {
    return (
        <div>
            <Banner />
            <OurFeatures />
            <Products />
            <Summary />
            <Reviews />
            <ContactUs/>
        </div>
    );
};

export default Home;