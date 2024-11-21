import React, { useEffect, useState } from 'react';
import { DropdownIcon, HomeIcon, OfficeBag } from '../../../provider/IconProvider';
import { useForm } from 'react-hook-form';
import useAuth from './../../../hooks/useAuth';
import useDivisions from '../../../hooks/useDivisions';
import useDistricts from '../../../hooks/useDistricts';
import useUpazila from '../../../hooks/useUpazila';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import useAddress from '../../../hooks/useAddress';
import { Helmet } from 'react-helmet';
import useCart from '../../../hooks/useCart';
import { Button } from '@mui/material';
import CheckoutProduct from './chechout-product/CheckoutProduct';
import CheckoutBtn from '../../../shared/checkout-btn/CheckoutBtn';
const voucherCode = 1745;
const discountTk = 35;

const Checkout = () => {
   const [division,setDivision] = useState('');
   const [isOpenDivision, setIsOpenDivision] = useState(false);
   const [city,setCity] = useState('');
   const [isOpenCity,setIsOpenCity] = useState(false)
   const [upazila,setUpazila] = useState('');
   const [isArea, setIsArea] = useState(false);
   const [delivery,setDelivery] = useState(false);
   const [voucher,setVoucher] = useState(0);
   const [total,setTotal] = useState(0);
   const [voucherError,setVoucherError] = useState('');
   const {user} = useAuth();
   const [divisions] = useDivisions();
   const [districts] = useDistricts(division);
   const [upazilas] = useUpazila(city);
   const axiosSecure = useAxiosSecure();
   const [address,,refetch] = useAddress();
   const [cart] = useCart();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit  = (data) => {
    const fullName = data.fullName;
    const userRegion = division;
    const phoneNumber = data.phoneNumber;
    const userCity = city;
    const houseLocation = data.houseLocation;
    const userArea = upazila;
    const locality = data.locality;
    const address = data.address;
    const selectDelivery = delivery ? 'Office': 'Home';
    
    const userAddress = {fullName,userEmail: user?.email,userRegion,phoneNumber,userCity,houseLocation,userArea,locality,address,selectDelivery}
    Object.setPrototypeOf(userAddress, null)

    axiosSecure.post('/addresses',userAddress)
    .then(res => {
      if(res.data.insertedId){
         toast.success('Address add successfully');
         refetch();
      }
    })
    
  }
  const handleAddress = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e)
  }
  
  const shippingFee = cart.length > 0 ? 60 : 0;
  const totalPrice = cart.reduce(
   (total, item) =>total + (item.price - (item.discountPrice || 0)) * item.quantity,0);
  const subTotal = shippingFee + totalPrice;

  const handleVoucher = (e) => {
   setVoucher(parseInt(e.target.value));
   setVoucherError('');
  }

  const handleMatchVoucher = () => {
   if(voucher === voucherCode){
     setTotal(subTotal - discountTk);
     setVoucherError('');
   }else{
     setTotal(subTotal);
     setVoucherError('Sorry, this voucher is not valid.');
   }
   
 }

 const handleCreateOrder= () => {
  const orderInfo = {
   cus_email: user?.email,
   cus_name: user?.displayName,
   cus_add: address?.address,
   cus_city: address.userCity,
   cus_state: address.userRegion,
   cus_number: address.phoneNumber,
   cartId: cart?.map(item => item._id),
   productId: cart?.map(item => item.product_id),
   discountTk:  voucher === voucherCode ? 35 : 0,
   shippingFee
  }
   axiosSecure.post('/order', orderInfo)
   .then(res => {
    window.location.replace(res.data.url);
    })
 }
  
  console.log(isArea);
  
  
    return (
        <div  className='lg:p-10 lg:flex justify-between'>
         <Helmet><title>checkout....</title></Helmet>
          {address ? <div className='lg:w-[70%]'>
            <CheckoutProduct/>
          </div> 
         :
         <div className='lg:w-[70%] '>
         <h2 className='font-[600] text-xl'>Delivery Information</h2>
            <form onSubmit={handleAddress} className='w-full p-5'> 

            <section className='w-full lg:flex items-center  gap-5 mb-5 space-y-3 lg:space-y-0'>
                  <div className='lg:w-1/2'>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="full-name">Full name </label> <br />
                     <input {...register("fullName", { required: true })} type="text"   defaultValue={user?.displayName} className='outline-none w-full h-10 border text-xs pl-3' placeholder='Enter your first and last name' readOnly />
                    
                  </div>

                  <div onClick={() => setIsOpenDivision(!isOpenDivision)} className='lg:w-1/2 relative '>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="Region">Region </label> <br />
                   <div className='border flex items-center justify-between pr-5'>
                   <input {...register("region", { required: true })} type="text" className='outline-none w-full cursor-pointer  h-10  text-xs pl-3' value={division} placeholder='Please choose your region' readOnly/>
                    <button type='button'><DropdownIcon/></button>
                   </div>
                   {errors.region  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty (please select again).</p>}

                  {isOpenDivision ?  <div className='w-full absolute z-10 bg-white shadow-custom'>
                     <ul>
                       {divisions?.map((division) => <li onClick={() => setDivision(division.name)} className='pl-4 py-2 hover:bg-gray-200' key={division._id}>{division.name}</li>)}
                       </ul>
                   </div> : ''}
                  </div>
               </section>

               <section className='w-full lg:flex items-center  gap-5 mb-5'>
                  <div className='lg:w-1/2'>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="Phone Number">Phone Number </label> <br />
                     <input {...register("phoneNumber", { required: true })} type="text" className='outline-none w-full h-10 border text-xs pl-3' placeholder='Please enter your phone number' />
                     {errors.phoneNumber  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty .</p>}
                  </div>

                  <div onClick={() => setIsOpenCity(!isOpenCity)} className={`lg:w-1/2 relative ${division === '' ? 'cursor-not-allowed' : ''} `} >
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="city">City </label> <br />
                   <div className='border flex items-center justify-between pr-5'>
                   <input {...register("city", { required: true })} type="text" className={`outline-none w-full   h-10  text-xs pl-3 ${division === '' ? 'cursor-not-allowed' : 'cursor-pointer'}`} value={city} placeholder='Please choose your city' readOnly/>
                    <button type='button'><DropdownIcon/></button>
                   </div>
                   {errors.city  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty (please select again).</p>}

                   {isOpenCity ? <div className='w-full absolute z-10 bg-white shadow-custom'>
                     <ul>
                        {districts?.map((district) => <li onClick={() => setCity(district.district)} className='pl-4 py-2 hover:bg-gray-200' key={district._id}>{district.district}</li>)}
                       </ul>
                   </div> : ''}
                   
                  </div>
               </section>

               <section className='w-full lg:flex items-center  gap-5 mb-5'>
                  <div className='lg:w-1/2'>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="b/h/f/s">Building / House No / Floor / Street </label> <br />
                     <input {...register("houseLocation", { required: true })} type="text" className='outline-none w-full h-10 border text-xs pl-3' placeholder='Please enter' />
                     {errors.houseLocation  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty.</p>}
                  </div>

                  <div onClick={() => setIsArea(!isArea)}  className={`lg:w-1/2 relative  ${city === '' ? 'cursor-not-allowed' : ''} `}>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="Area">Area</label> <br />
                   <div className='border flex items-center justify-between pr-5'>
                   <input {...register("area", { required: true })} type="text" className={`outline-none w-full ${city === '' ? 'cursor-not-allowed' : 'cursor-pointer'}   h-10  text-xs pl-3 `} value={upazila} placeholder='Please choose your area' readOnly/>
                    <button type='button'><DropdownIcon/></button>
                   </div>
                   {errors.area  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty (please select again).</p>}



                   {isArea && <div className='w-full absolute z-10 bg-white shadow-custom'>
                     <ul>
                        {upazilas?.map((upazils) => <li onClick={() => setUpazila(upazils.upazila)} className='pl-4 py-2 hover:bg-gray-200' key={upazils._id} role='option'>{upazils.upazila}</li>)}
                       </ul>
                   </div> }
                  </div>
               </section>

               
               <section className='w-full lg:flex items-center  gap-5 mb-5'>
                  <div className='lg:w-1/2'>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="c/s/l/l">Colony / Suburb / Locality / Landmark</label> <br />
                     <input {...register("locality", { required: true })} type="text" className='outline-none w-full h-10 border text-xs pl-3' placeholder='Please enter' />
                     {errors.locality  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty.</p>}
                  </div>

                  <div className='lg:w-1/2'>
                  <label className='font-[500] text-gray-600 text-[14px] pl-2' htmlFor="Address">Address</label> <br />
                     <input {...register("address", { required: true })} type="text" className='outline-none w-full h-10 border text-xs pl-3' placeholder='For Example: House# 123, Street# 123, ABC Road' />
                     {errors.address  && <p className='text-xs text-red-500 font-[500]'>You can't leave this empty.</p>}
                  </div>
               </section>

               <div className='lg:flex justify-between items-center'>
                 <div>
                 <p>Select a label for effective delivery:</p>
                  <div className='my-5 flex' >
                   <button onClick={() => setDelivery(true)} type='button' className='flex items-center justify-center gap-2 border px-2 w-32 h-16 mr-4 bg-[#c1e5f573] border-cyan-200 rounded-lg'><OfficeBag className={delivery ? 'text-cyan-800' : ''}/> OFFICE</button>
                   <button onClick={() => setDelivery(false)} type='button' className='flex items-center justify-center gap-2 border px-2 w-32 h-16 mr-4 bg-red-50 border-red-400 rounded-lg'><HomeIcon className={delivery ? '' : 'text-red-500'}/> HOME</button>
                  </div> 
                 </div>
                  <input className='cursor-pointer bg-[#2aacc6]  hover:bg-[#16849B] text-white w-40 h-10' type="submit" value="Save" />
               </div>

               
            </form>
        </div> 
         }

           <div className='lg:w-[30%]  p-2'>
           <div className="flex items-center  mt-4 gap-x-2">
            <input
            onChange={ handleVoucher}
              className="border outline-none p-2 w-[80%]"
              type="text"
              name=""
              id=""
              placeholder="Enter Voucher Code"
            />
            <Button onClick={() => handleMatchVoucher()} variant="contained"  >APPLY</Button> <br />
          </div>
            <p className='text-xs text-red-500'>{voucherError}</p>

            <div className='my-2'>
            <h2 className="text-xl">Order-summary</h2>
          <p className="flex items-center justify-between text-[15px] text-gray-500 mt-4">
            <span>Subtotal ({cart?.length} items)</span>{" "}
            <span className="text-black">৳{totalPrice}</span>
          </p>
          <p className="flex items-center justify-between text-[15px] text-gray-500 mt-4">
            <span>Shipping Fee: </span>{" "}
            <span className="text-black">৳{shippingFee}</span>
          </p>
            </div>
            <hr />

            <p className="flex items-center justify-between text-[15px] my-5">
            <span>Total</span>{" "}
            <span className="text-orange-500 text-xl">
              ৳{total > 0 ? total : subTotal}
            </span>
          </p>

         <div onClick={() => handleCreateOrder()} className='w-full'>  <CheckoutBtn>Proceed to pay</CheckoutBtn></div>
           </div>
           <Toaster position='top-center' reverseOrder={false}/>
        </div>
    );
};

export default Checkout;
