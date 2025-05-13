import React from 'react';
import useProducts from '../../../../../hooks/useProducts';
import { Button } from '@mui/material';
import Card from '../../../../../shared/card/Card';
import { Link } from 'react-router-dom';

const NewProducts = () => {
    const [products] = useProducts('','','');
    const popularItem = products.slice(0,4);
    console.log(popularItem);
    return (
        <section className=' ml-2 mt-10 lg:mt-0'>
        <div className='flex items-center justify-between mr-5'>
            <div>
            <h2 className='text-xl font-bold'>New Products</h2>
            <p className='text-xs text-gray-500'>New products with updated stocks.</p>
            </div>

            <div>
            <Link to={'/shop'}><Button className='text-xs'>See all</Button></Link>
               
            </div>
        </div>
            <div className='grid grid-cols-2 gap-5 mt-5 lg:grid-cols-4'>
            {popularItem?.map(product => <Card key={product._id} product={product}/>)}
            </div>
    </section>
    );
};

export default NewProducts;