import React, { useState } from "react";
import FavListButton from "../../../../shared/fav-List/FavListButton";
import { DeletedIcon } from "../../../../provider/IconProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const ShopCart = ({item,refetch}) => {
  const [updatedQuantity,setUpdatedQuantity] = useState(item.quantity);
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    image,
    product_name,
    brand,
    size,
    quantity,
    discountPrice,
    price,
    discount,
    product_id
  } = item;

  const handleCartItemDelete = (id) => {
    
    axiosSecure.delete(`/cart/${id}`)
    .then(res => {
      console.log(res.data);
      if(res.data.deletedCount > 0){
        toast.success('Your item deleted successfully', {duration: 1500})
        refetch();
      }
      
    })
  
  }
// update
  const handleDecrement = () => {
    console.log('de');
  }

  const handleIncrement = () => {
    console.log('in');
  }

 
  return (
    
    <div className="col-span-5   my-2 p-2 bg-white rounded-lg lg:flex  items-center justify-between ">
      <Link className="lg:w-[35%]" to={`/product/${product_id}`}>
      <div className="flex gap-x-2  ">
      <img className="w-24" src={image} alt="" />
      
        

        <div>
          <h2 className="text-lg">{product_name}</h2>
          <p className="text-xs text-gray-500">
            {brand ? brand : "no-brand"}, {size ? `size:${size}` : ""}
          </p>
        </div>
      </div>
      </Link>
      <div className="flex justify-between">
        <div className="flex flex-col lg:gap-2 items-center mr-10">
          <p className="text-2xl text-orange-500">৳{price - discountPrice}</p>
          <p className="text-gray-500 ">
            <samp className="line-through">৳{price}</samp>{" "}
            <span>-{discount}%</span>
          </p>
          <p className="hidden lg:block">
            TOTAL: ৳{(price - discountPrice) * quantity}
          </p>
        </div>

        <div className="flex items-center gap-3 ">
          <button
              onClick={() => handleDecrement()}
            className={`text-lg bg-gray-100 w-7 h-7 rounded-full ${
              quantity <= 1 ? "cursor-not-allowed text-gray-300" : ""
            }`}
          >
            -
          </button>
          <input
            className="border border-black w-7 h-7 rounded-lg outline-none text-center"
            type="text"
            value={updatedQuantity}
            readOnly
          />
          <button
              onClick={() => handleIncrement()}
            className={`text-lg bg-gray-100 w-7 h-7 rounded-full
            `}
          >
            +
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center gap-2 mr-5  ">
          <FavListButton productId={product_id}/>
          <button onClick={() => handleCartItemDelete(_id)} className="text-[30px] text-red-500">
            <DeletedIcon />
          </button>
        </div>
        <Toaster 
         position="top-center"
         reverseOrder={false}
        />
      </div>
    </div>
    
    
  );
};

export default ShopCart;
