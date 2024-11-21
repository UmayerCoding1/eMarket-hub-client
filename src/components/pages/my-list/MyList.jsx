import React from "react";
import useMyList from "../../../hooks/useMyList";
import FavListButton from "../../../shared/fav-List/FavListButton";
import AddCartButton from "../../../shared/add-cart-btn/AddCartButton";
import { Link } from "react-router-dom";

const MyList = () => {
  const [myList] = useMyList();

  const myFavList = myList.map((product) => product.product).filter((product) => product !== null && product !== undefined);
  
  return (
    <div className="my-2 bg-gray-100">
      <h2 className="text-3xl border-b pb-2 mb-2">
        My Wishlist ({myList?.length})
      </h2>

      <div className="max-w-6xl mx-auto">
        {myFavList?.map((product) => {
            const {_id,image,product_name,brand,price} = product;
            
          return [
            
            <div key={_id} className="flex items-center justify-between bg-white p-2 my-2">
              <Link to={`/product/${_id}`}>
              <div className="flex">
                <img className="w-28"  src={image} alt="" />
                <div>
                    <h2 className="text-2xl">{product_name}</h2>
                    <p className="text-xs">Brand: {brand}</p>
                  
                </div>
              </div>
              </Link>
              <div className="text-orange-500">৳{price}</div>
              <div>
              <FavListButton productId={_id}/>
              </div>
            </div>
           
          ];
        })}
      </div>
    </div>
  );
};

export default MyList;
