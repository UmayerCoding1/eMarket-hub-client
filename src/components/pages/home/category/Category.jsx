import React from 'react';
import useCategory from '../../../../hooks/useCategory';

const Category = () => {
    const [category] = useCategory();
    return (
        <div className=''>
            <h2 className='text-3xl'>Categories</h2>
              <div className='bg-white grid grid-cols-3 lg:grid-cols-8 gap-0'>
                {category?.map(item => {
                    return([
                        <div key={item._id} className='w-40 h-28 border'>
                            <img className='w-20' src={item.img} alt="" />
                        </div>
                    ])
                })}
              </div>
        </div>
    );
};

export default Category;