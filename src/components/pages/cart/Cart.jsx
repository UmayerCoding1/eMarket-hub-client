import React, { useContext, useRef, useState } from "react";
import useCart from "../../../hooks/useCart";
import { DeletedIcon } from "../../../provider/IconProvider";
// import FavListButton from "../../../shared/fav-List/FavListButton";
import ShopCart from "./shop-cart/ShopCart";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
import CheckoutBtn from "../../../shared/checkout-btn/CheckoutBtn";
import { Link } from "react-router-dom";
import Loading from "../../../shared/loading/Loading";
import  { AddedCount } from "../../../shared/added-item-count/AddedItemCount";
// import AddedItemCount, { AddedCount } from "../../../shared/added-item-count/AddedItemCount";



const Cart = () => {
  const [cart,loading,refetch] = useCart();
  const containerRef = useRef();

  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.price - (item.discountPrice || 0)) * item.quantity,
    0
  );
  const addItemCount = cart.reduce((totalItem,product) => totalItem + product.quantity,0 );
  const shippingFee = cart.length > 0 ? 60 : 0;
  const subTotal = totalPrice + shippingFee;


 
   if(loading){
    
    return <Loading/>
   }

  return (
    <div className="" ref={containerRef}>
      <Helmet>
        <title>eMarket hub:Online Shopping..</title>
      </Helmet>
      <div className="flex items-center justify-between my-5">
        <p>TOTAL ITEM: {cart?.length || 0}</p>
        <Button variant="contained" color="error">
          <DeletedIcon />
        </Button>
      </div>
      <div className="lg:px-20   lg:grid grid-cols-7  bg-gray-100 ">
        {cart.length >0 ?  <div className="col-span-5">
          {cart.map((item, i) => (
            <ShopCart key={item._id || i} item={item} refetch={refetch}/>
          ))}
        </div> : <p className="col-span-5">Cart is empty</p>}

        <div className="sticky col-span-2 lg:ml-3 bg-white h-80 p-5">
          <h2 className="text-xl">Order-summary</h2>
          <p className="flex items-center justify-between text-[15px] text-gray-500 mt-4">
            <span>Subtotal ({cart?.length} items)</span>{" "}
            <span className="text-black">৳{totalPrice}</span>
          </p>
          <p className="flex items-center justify-between text-[15px] text-gray-500 mt-4">
            <span>Shipping Fee: </span>{" "}
            <span className="text-black">৳{shippingFee}</span>
          </p>

          
         
          <p className="flex items-center justify-between text-[15px] my-5">
            <span>Total</span>{" "}
            <span className="text-orange-500 text-xl">
              ৳{subTotal}
            </span>
          </p>

       
          {cart.length> 0 ? <Link to={'/checkout'}><CheckoutBtn cartLength={cart}>PROCEED TO CHECKOUT ({addItemCount}) </CheckoutBtn></Link>
         :
         <CheckoutBtn cartLength={cart}>PROCEED TO CHECKOUT ({addItemCount } ) </CheckoutBtn>  
        }
          
         
        </div>

        
      </div>
    </div>
  );
};

export default Cart;
