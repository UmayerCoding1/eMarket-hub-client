import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Heart } from "../../provider/IconProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useMyList from "../../hooks/useMyList";
import axios from "axios";

const FavListButton = ({ productId }) => {
  
  const {user} = useAuth();
  const [myList,refetch] = useMyList();
  const axiosSecure = useAxiosSecure();
  // console.log(myList);
  
  const myFavList = myList.map(product => product.product);

  
  const existingProduct = myFavList.find(item => item?._id === productId);
  
  const findAddedProduct = myFavList.find(item => item?.product?._id === productId);
  
  console.log(productId);
  
  
  
  const handleAddFavList = (id) => {
    axios.post("https://e-market-hub-server.onrender.com/my-list", { id,email: user?.email },{
      headers: {
        'authorization': `Bearer ${localStorage.getItem("eMarketHub-Access-Token")}`
      }
    }).then((res) => {
      if (res.data.insertedId) {
        toast.success("Add by your list");
        refetch();
      }
    });
  };

  const handleDeleteFavList = (id) => {
      try {
        axios.delete(`https://e-market-hub-server.onrender.com/my-list/${id}`,{
          headers: {
            'authorization': `Bearer ${localStorage.getItem("eMarketHub-Access-Token")}`
          }
        }) 
        .then(res => {
          console.log(res.data);
          if(res.data.deletedCount === 0){
            toast.success("Added item is delete");
            refetch();
          }
        })
      } catch (error) {
        console.log(error);
      }
    
  };
  return (
    <div className="flex items-center">
      {existingProduct ? 
        <Heart
          onClick={() => handleDeleteFavList(existingProduct?._id)}
          className="text-red-500 text-[30px] cursor-pointer"
        />
       : 
        <FaRegHeart
          onClick={() => handleAddFavList(productId)}
          className="text-[25px] text-gray-400 cursor-pointer"
        />
      }
    </div>
  );
};

export default FavListButton;
