import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Close, CloseNormal, HomeIcon, ShopIcon, SuccessIcon, WarIcon } from "../../../provider/IconProvider";
import { Rating } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AddCartButton from "../../../shared/add-cart-btn/AddCartButton";
import FavListButton from "../../../shared/fav-List/FavListButton";
import useProducts from "../../../hooks/useProducts";
import Card from "./../../../shared/card/Card";
import Error from "../../../shared/toasts/Error";
import useAuth from "../../../hooks/useAuth";
import ConfirmBox from "../../../shared/confirm-box/ConfirmBox";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import './image_zooming.css'
import useCart from "../../../hooks/useCart";
import RelatedProducts from "./related-product/RelatedProducts";
import {  FaAngleDoubleLeft  } from "react-icons/fa";
import useMyList from "../../../hooks/useMyList";
import axios from "axios";
// import { toast } from 'react-hot-toast';
const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [extraQuantityAdd,setExtraQuantityAdd] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isCartDialogOpen,setIsCartDialogOpen] = useState(false);
  const [isCartDialogMessage,setIsCartDialogMessage] = useState(true);
  const [adding,setAdding] = useState(false);
  const [imgZoom,setImgZoom] = useState(null);
  const product = useLoaderData();
  const [products] = useProducts('','','');
  const { user } = useAuth();
  const productImg = useRef(null);
  const zoomResult = useRef(null);
  const [Cart,,refetch] = useCart();
  const [myList] = useMyList();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  

  // const product = {
  //   _id: '67489c9b19379a4d56de393d',
  //   product_name: 'Texpark Combed Cotton Half Sleeve T Shirt For Men - White - TS-20',
  //   description: 'The Texpark Combed Cotton Half Sleeve T-Shirt For Men. It is a comfortable and stylish t-shirt made of 100% combed cotton. It has a ribbed lycra neck for a better fit. It is available in a variety of colors and sizes. The Texpark Combed Cotton Half Sleeve T-Shirt For Men is a great option for everyday wear. It is also a good choice for casual occasions.',
  //   price: '450',
  //   discount: '11',
  //   product_RAM: '',
  //   brand: 'T-Shirts',
  //   stock: 19,
  //   category: 'Fashion',
  //   subCategory: 'Men',
  //   size: [ 'S', 'M', 'L' ],
  //   location: 'bangladesh',
  //   imageFiles: [
  //     'http://res.cloudinary.com/dlh8axija/image/upload/v1732811929/ypl2d9yr9llotczpeywf.png',
  //     'http://res.cloudinary.com/dlh8axija/image/upload/v1732811927/uecogwd7mmf7xqa4rlpn.png'
  //   ],
  //   rating: 3
  // }
  const {
    _id,
    imageFiles,
    rating,
    size,
    product_RAM,
    brand,
    discount,
    price,
    product_name,
    stock,
    description,
    category,
  } = product;
  const newPrice = (price * discount) / 100;
  const relatedProduct = products.filter(
    (product) => product.category === category && product._id !== _id
  );

  const addedProduct = Cart?.find(product => product.product_id === _id);
  
// console.log(imgZoom);

 
  
  
  

  useEffect(() => {

    document.body.style.overflow = isCartDialogOpen ? 'hidden' : 'auto';
    setImgZoom(imageFiles[1]);
    setSelectedSize('');
    setQuantity(1);
  },[isCartDialogOpen,imageFiles,product])

  const handleIncrement = () => {
      if(quantity < stock){
        setQuantity((prev) => prev + 1);
      }
      else{
        
        toast.error(`This product only available ${stock}`)
      }
    
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    
    if (size.length >  0 && !selectedSize) {
      return toast.custom(
        (t) => (
          <div className="flex items-center">
            <Error id={t.id}>Please select size</Error>
          </div>
        ),
        { duration: 1000 }
      );
    } else if (!user) {
      setIsConfirm(true);
    } else {
      setAdding(true);
      const addItem = {product_name,image: imageFiles[1],size: selectedSize,quantity,product_id: _id,user_email: user.email,brand,price,discountPrice: newPrice,discount};

      if(quantity  + addedProduct?.quantity > 15){
        setAdding(false);
        setIsCartDialogMessage(false)
        setIsCartDialogOpen(true);
        setExtraQuantityAdd(quantity + addedProduct?.quantity || 0);
      //  return;
      }else{
        axios.post('https://e-market-hub-server.onrender.com/cart', addItem)
        .then(res => {  
          if(res.data.insertedId || res.data.message){
            setAdding(false);
            setIsCartDialogOpen(true);
            setIsCartDialogMessage(true)
            refetch?.();
          }else{
            setIsCartDialogOpen(false);
          }
        })
      }
      

      Object.setPrototypeOf(addItem, null);
    }
  };

  const handleClear = () => {
    setIsConfirm(false);
  };

  const handleSetImage = (img) => {
    setImgZoom(img);
  }
 



  
  
  
  if (isConfirm) {
    return <ConfirmBox isOpen={isConfirm} onClear={handleClear} />;
  }

  return (
    
    <div className="max-w-6xl mx-auto relative ">
      <Helmet>
        <title>{product_name || 'eMarket hub'}...</title>
      </Helmet>
 <button onClick={() => navigate(-1)} className="flex items-center lg:hidden"><FaAngleDoubleLeft />Back</button>

      <div className=" lg:flex  h-s  relative mt-2 border-b-2 border-black pb-5">
        <div className="">
          <div className="flex items-center justify-center lg:block">
            <img ref={productImg} className="h-80 p-2 lg:p-0 lg:w-80 " src={imgZoom} alt="" />
          </div>
          <div className="flex items-center mt-4 gap-2">
            <img
             onMouseEnter={() => handleSetImage(imageFiles[1])}
              className="w-20 h-20 rounded-lg cursor-pointer border"
              src={imageFiles[1]}
              alt=""
            />
            <img
             onMouseEnter={() => handleSetImage(imageFiles[0])}
              className="w-20 h-20 rounded-lg cursor-pointer border"
              src={imageFiles[0]}
              alt=""
            />
          </div>

          <div ref={zoomResult} className=" w-[800px] h-[400px] fixed z-10 top-28 left-[33%] hidden zoom_img">
           
          </div>
        </div>

        <div className="lg:w-[70%] flex justify-between">
          <div className="lg:w-[70%] ml-2 lg:ml-10">
            <h2 className="text-2xl lg:text-3xl">{product_name}..</h2>
            <div className="flex items-center gsp-2 mt-3">
              <p className="text-gray-500 text-xs">
                Brands: <span className=" font-bold">{brand}</span>
              </p>{" "}
              |
              <Rating
                name="read-only"
                size="small"
                value={rating}
                fontSize="small"
                readOnly
              />
              <p className="text-xs text-blue-700 font-bold">(20)review</p>
            </div>
            <div className="mt-2">
              <p className="text-2xl text-orange-500">৳ {parseInt(price - newPrice)}</p>
              {discount > 0 ?<p>
                <span className="line-through  text-red-500">৳ {price}</span>{" "}
                <span>-{discount}%</span>
              </p> : ''}
            </div>
            {product?.description ? 
              <p className="text-xs lg:my-2">{description}</p>
             : 
              ""
            }
            <br />
            {product_RAM ? 
              <p className="mt-2 border inline-block p-1">{product_RAM}</p>
             : 
              ""
            }
            {size ? 
              <ul>
                {size.map((size, i) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`mr-2 border w-10 h-10  rounded-lg   ${
                      selectedSize === size
                        ? "bg-orange-500 "
                        : "hover:bg-gray-100"
                    }`}
                    key={i}
                  >
                    {size}
                  </button>
                ))}
              </ul>
             : 
              ""
            }

{stock > 0 ? 
                <button className="text-xs bg-[#a3f3b896] w-20 lg:my-6 rounded-3xl">
                  IN STOCK
                </button>
               : 
                <button className="text-xs bg-[#f3a3a396] w-28 my-6 rounded-3xl">
                  OUT OF STOCK
                </button>
             }
            <div className="flex items-center gap-5 lg:mt-5">
              <p>Quantity</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement()}
                  className={`text-2xl bg-gray-100 w-10 h-10 rounded-full `}
                >
                  -
                </button>
                <input
                  className="border border-black w-10 h-10 rounded-lg outline-none text-center"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={() => handleIncrement()}
                  className={`text-2xl bg-gray-100 w-10 h-10 rounded-full `}
                >
                  +
                </button>
              </div>
              {stock < 10 && <p className="text-[10px] text-gray-500">Only {stock} item left</p>}
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-4 lg:mt-5">
                <AddCartButton handleAction={handleAddToCart} loading={adding}>
                  Add to cart
                </AddCartButton>
                <FavListButton productId={_id}/>
              </div>
            </div>
          </div>
          <div className="hidden bg-gray-100 w-[30%] lg:block">3</div>
        </div>

        <div className="fixed bottom-0 z-10 lg:hidden bg-white shadow-2xl w-full h-14">
          <div className="flex items-center justify-between mt-2">
            <div>
              <Link to={"/"}>
                <button className="text-2xl mr-3 ml-2">
                  <HomeIcon />
                </button>
              </Link>
              <Link to={"/shop"}>
                <button className="text-2xl mr-3">
                  <ShopIcon />
                </button>
              </Link>
            </div>
            <div className="flex items-center">
              <FavListButton productId={_id}/>
              <button onClick={() => handleAddToCart()} className="add-to-cart">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <p className="font-[600]"> YOU MAY ALSO LIKE</p>
        <RelatedProducts relatedProduct={relatedProduct}/>
      </div>

      {isCartDialogOpen ? 
      <div className="w-full h-full bg-[#0000004f] hidden lg:flex  justify-center z-10 top-0 left-0 fixed " >
      <div className="w-[80%] mt-20 h-[500px] bg-white p-5">
         <div className="flex items-center justify-between border-b ">
           {isCartDialogMessage ? <button className="flex items-center h-10 gap-2 text-emerald-600"><SuccessIcon/> Added to cart successfully! </button> 
           : 
           <button className="flex items-center h-10 gap-2 text-red-500"><WarIcon/> {`${extraQuantityAdd} can not be added to cart. The quantity is limited to 15.`} </button> 
           }
           <button className="text-3xl text-gray-400 " onClick={() => setIsCartDialogOpen(!isCartDialogOpen)}><CloseNormal/></button>
         </div>

         
          <RelatedProducts relatedProduct={relatedProduct} />
         
      </div>
   </div> : ''}

 {/* mobile dialog */}
   {isCartDialogOpen ? <div className="w-full h-full   top-[75%] left-0 fixed lg:hidden">
     <div className="w-[100%] mt-20 h-[70px] bg-[#000000ab] p-2 flex items-center justify-between">
     <button className="flex items-center h-10 gap-2 text-white"><SuccessIcon/> Added to cart successfully!</button>
      <Link><button className="text-blue-400" onClick={() => setIsCartDialogOpen(!isCartDialogOpen)}><Close/></button></Link>
     </div>
   </div> :""}
      
    </div>
  );
};

export default ProductDetails;
