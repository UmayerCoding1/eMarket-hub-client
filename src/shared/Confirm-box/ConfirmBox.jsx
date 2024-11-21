import React from 'react';
import { TiInfoOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
const ConfirmBox = ({isOpen,onClear}) => {
    // if(!isOpen) return null;
    return (
        <div className='w-full lg:h-screen flex bg-[#00000035]  items-center justify-center'>
           <div className='bg-white shadow-custom w-80 h-44 flex flex-col items-center justify-center'>  
              <div className=' '>
              <button className='text-3xl text-orange-300'><TiInfoOutline/></button> 
              </div>

              <div>
                <h2 className='text-2xl font-[600]'>You are not login</h2>
                <p className='text-xs text-center'>Please login to add to cart</p>
              </div>

              <div className='flex items-center mt-5 gap-10'>
                <Link to={'/sign-in'}><button className='px-2 bg-blue-500 text-white h-10 rounded-lg'>Yes, login!</button></Link>
                <button onClick={onClear} className='px-2 bg-red-500 text-white h-10 rounded-lg'>Clear</button>
              </div>
           </div>
        </div>
    );
};

export default ConfirmBox;