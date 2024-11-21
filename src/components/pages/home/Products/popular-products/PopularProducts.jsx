import useProducts from '../../../../../hooks/useProducts';
import Card from '../../../../../shared/card/Card';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
const PopularProducts = () => {

    const [products,loading] = useProducts('','','');
    const popularItem = products.slice(0,4);
    
    

    if(loading){
        return ;
    }
    
    return (
        <section className='mt-2 ml-2'>
            <div className='flex items-center justify-between mr-5'>
                <div>
                <h2 className='text-xl font-bold'>Popular Products</h2>
                <p className='text-xs text-gray-500'>Do not miss the current offers until the end of March.</p>
                </div>

                <div>
                  <Link to={'/shop'}><Button className='text-xs'>See all</Button></Link>
                </div>
            </div>
                <div className='grid grid-cols-2 gap-5 mt-5 lg:grid-cols-4'>
                {popularItem.map(product => <Card key={product._id} product={product}/>)}
                </div>
        </section>
    );
};

export default React.memo(PopularProducts);