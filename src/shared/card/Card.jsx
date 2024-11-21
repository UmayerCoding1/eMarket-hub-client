import { Rating } from "@mui/material";
import React from "react";
import CurrencyBtn from "../currency/CurrencyBtn";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const { _id, product_name, discount, price, rating, image, stock, location } =
    product;
  const newPrice = (price * discount) / 100;
  const name = product_name?.slice(0, 10);

  return (
    <Link to={`/product/${_id}`}>
      <div className="border w-full  h-[280px] cursor-pointer hover:shadow-2xl relative lg:w-[90%]">
        <div className="w-full h-[60%] ">
          <img className="w-full h-full cover" src={image} alt="" />
        </div>

        <div className="p-3">
          <h2 className="text-lg ">{name}....</h2>
          <p
            className={
              stock > 0
                ? "text-green-700 font-medium text-xs"
                : "text-red-500 font-medium text-xs"
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

export default Card;
