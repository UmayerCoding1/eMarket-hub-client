import React from 'react';
import Ads from './ads/Ads';
import PopularProducts from './popular-products/PopularProducts';
import NewProducts from './new-product/NewProducts';
import BottomBanner from '../bottom-banner/BottomBanner';

const Products = () => {
    return (
        <div className='lg:grid grid-cols-5 my-10'>
           <div className='sticky top-0 hidden lg:block '>
            <Ads/>
           </div>
           <div className='col-span-4  '>
            <div className='bg-white my-2'>
            <PopularProducts/>
            </div>
            <div className='mt-2 bg-white'>
            <NewProducts/>
            </div>
            <div className='hidden bg-white lg:block'>
            <BottomBanner/>
            </div>
           </div>
        </div>
    );
};

export default React.memo(Products);