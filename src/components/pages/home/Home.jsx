import React from 'react';
import Banner from './banner/Banner'
import Products from './Products/Products';
import { Helmet } from 'react-helmet';
import NewsLetter from './news-letter/NewsLetter';
import Category from './category/Category';

const Home = () => {
    
    return (
        
        <div className='bg-gray-200'>
            <Helmet>
                <title>Homepage</title>
            </Helmet>
            <Banner/>
            <Products/>
            {/* <Category/> */}
            {/* TODO: add featured products section  */}
            <NewsLetter/>
            
        </div>
    );
};

export default Home;