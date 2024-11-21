import React from 'react';
import useAddress from '../../../hooks/useAddress';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const MyAccount = () => {
    const [address] = useAddress();
    const {user} = useAuth();
    const {fullName,phoneNumber,userArea,userCity,userRegion} = address;
    return (
        <div className='my-5'>
            <p className='text-xs text-gray-500 my-5'>Hello, {user.email.split('@')[0]}</p>
           <div className='border w-80 h-52 p-2'>
              <h3 className='text-xl'>Address Book <Link><span className='text-blue-500 text-lg ml-5'>Edit</span></Link></h3>
              <p className='mt-4 text-xs text-gray-500'>DEFAULT SHIPPING ADDRESS</p>
              <p className='mt-4  font-bold'>{fullName}</p>
              <p className='mt-4 text-xs text-gray-500'>{address.address}</p>
              <p className=' text-xs text-gray-500'>{userRegion}-{userCity}-{userArea}</p>
              <p>{phoneNumber}</p>
              
           </div>
        </div>
    );
};

export default MyAccount;