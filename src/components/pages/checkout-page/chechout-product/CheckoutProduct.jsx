import React from "react";
import useAddress from "../../../../hooks/useAddress";
import useCart from "./../../../../hooks/useCart";

const CheckoutProduct = () => {
  const [address, loading] = useAddress();
  const [cart] = useCart();
  const {
    fullName,
    phoneNumber,
    selectDelivery,
    userArea,
    userCity,
    userRegion,
  } = address;

  if (loading) {
    return <p>loading......</p>;
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between ">
          <p>Shipping & Billing</p>
          <p className="text-blue-500 cursor-pointer">EDIT</p>
        </div>

        <div className="bg-white w-full p-2">
          <p className="text-xs flex gap-3">
            <span>{fullName}</span> <span>{phoneNumber}</span>
          </p>
          <div className="mt-4 flex items-center">
            <span className="bg-orange-500 px-2 text-xs text-white rounded-2xl mr-2">
              {selectDelivery}
            </span>
            <span>
              {address?.address}, {userArea}, {userCity}, {userRegion}
            </span>
          </div>
        </div>
      </div>

      <div className="lg:mt-10 ">
        {cart?.map((product, i) => {
          const {
            brand,
            image,
            product_name,
            quantity,
            price,
            discountPrice,
            discount,
          } = product;
          return [
            <div key={i} className="bg-gray-50 my-5 p-2">
              <div className="flex items-center justify-between">
                <p>
                  Package {i + 1} of {cart.length}
                </p>
                <p className="text-xs text-gray-500">
                  Shipped{" "}
                  <span className="text-sm  font-[500]  text-black">
                    {brand || "no-brand"}
                  </span>
                </p>
              </div>

              <div className="mt-2 bg-white p-2 flex items-center justify-between">
                <div className="flex ">
                  <img className="w-24" src={image} alt="product img" />
                  <div className="ml-2">
                    <h2 className="font-semibold">{product_name}</h2>
                    <p className="text-xs">Quantity: {quantity}</p>
                  </div>
                </div>

                <div className="flex flex-col lg:gap-2 items-center mr-10">
                  <p className="text-2xl text-orange-500">
                    ৳{price - discountPrice}
                  </p>
                  <p className="text-gray-500 ">
                    <samp className="line-through">৳{price}</samp>{" "}
                    <span>-{discount}%</span>
                  </p>
                  <p className="hidden lg:block">
                    TOTAL: ৳{(price - discountPrice) * quantity}
                  </p>
                </div>

                <div>
                    deleted
                </div>



              </div>
            </div>
          ];
        })}
      </div>
    </div>
  );
};

export default React.memo(CheckoutProduct);
