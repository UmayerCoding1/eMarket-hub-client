import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { Heart } from "../../provider/IconProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useMyList from "../../hooks/useMyList";

const FavListButton = ({ productId }) => {
  
  const {user} = useAuth();
  const [myList,refetch] = useMyList();
  const axiosSecure = useAxiosSecure();
  
  const myFavList = myList.map(product => product.product);

  
  const existingProduct = myFavList.find(item => item?._id === productId);
  
  const findAddedProduct = myFavList.find(item => item?.product?._id === productId);
  
  
  
  
  const handleAddFavList = (id) => {
    axiosSecure.post("/my-list", { id,email: user?.email }).then((res) => {
      if (res.data.insertedId) {
        toast.success("Add by your list");
        refetch();
      }
    });
  };

  const handleDeleteFavList = (id) => {

    axiosSecure.delete(`/my-list/${id}`) 
    .then(res => {
     if(res.data.deletedCount > 0){
      toast.success('Added item is delete');
      refetch();
     }
      
    })
    
  };
  return (
    <div className="flex items-center">
      {existingProduct ? 
        <Heart
          onClick={() => handleDeleteFavList(findAddedProduct?._id)}
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
