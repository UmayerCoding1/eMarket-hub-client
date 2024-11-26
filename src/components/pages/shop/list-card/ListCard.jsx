import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyBtn from '../../../../shared/currency/CurrencyBtn';
import { Rating } from '@mui/material';

const ListCard = ({product}) => {
    const { _id, product_name, discount, price, rating, imageFiles, stock, location } =
    product;
  const newPrice = parseInt((price * discount) / 100);
  
    return (
        
            <Link to={`/product/${_id}`}>
      <div className="border w-full h-[200px] cursor-pointer hover:shadow-2xl flex items-center mt-2 relative">
        <div className="w-1/2 h-full lg:w-1/4">
          <img className="w-full h-full cover" src={imageFiles[1]} alt="" />
        </div>

        <div className="p-3">
          <h2 className=" font-bold">{product_name}....</h2>
          <p
            className={
              stock > 0
                ? "text-green-700 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {stock > 0 ? "In stock" : "Out of stock"}
          </p>
          <div className="flex gap-3 items-center font-semibold">
            <p className="line-through  text-red-500">৳{price}</p>
            <CurrencyBtn>{price - newPrice}</CurrencyBtn>
          </div>
          <div className="flex items-center justify-between">
            <Rating
              name="read-only"
              size="small"
              value={rating}
              fontSize="small"
              readOnly
            />{" "}
            <span className="text-gray-500">|</span>{" "}
            <span className="text-[10px] text-gray-500">{location}</span>
          </div>
        </div>

        <div className='w-8 h-8 rounded-full bg-[#2BBEF9] flex items-center justify-center text-xs absolute top-0 left-0'>
           {discount}%
        </div>
      </div>
    </Link>
        
    );
};

export default ListCard;