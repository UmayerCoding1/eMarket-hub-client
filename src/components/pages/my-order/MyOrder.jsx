import React, { useState } from "react";
import useOrder from "../../../hooks/useOrder";
import { Helmet } from "react-helmet";
import { FaPrint as PrintIcon } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFile from "./pdf/PdfFile";
import useAuth from "../../../hooks/useAuth";

const MyOrder = () => {
  const [selectStatus, setSelectStatus] = useState("pending");
  const [order] = useOrder(selectStatus);
  const {user}= useAuth();
  const handleStatus = (e) => {
    const { value } = e.target;
    if (selectStatus === value) {
      setSelectStatus("");
    } else {
      setSelectStatus(value);
    }
  };

  const allItem = order.flatMap((item) => item.item);

  const invoice = Date();
  console.log(order);
  

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>eMarket hub My Order....</title>
      </Helmet>

      <div className="max-w-6xl mx-auto lg:grid grid-cols-6 py-5">
        <div>
          <form>
            <h2 className="text-xl">Filter by status:</h2>
            <div className="mt-3">
              <input
                onChange={handleStatus}
                type="checkbox"
                value={"pending"}
                checked={selectStatus === "pending"}
              />
              <label className="pl-2" htmlFor="pending">
                Pending
              </label>
            </div>

            <div className="mt-3">
              <input
                onChange={handleStatus}
                type="checkbox"
                value={"delivered"}
                checked={selectStatus === "delivered"}
              />
              <label className="pl-2" htmlFor="pending">
                Delivered
              </label>
            </div>
          </form>
        </div>

        <div className="col-span-5">
          <div className="flex justify-between items-center">
            <h2>My Order</h2>
            {selectStatus === 'pending' ? <PDFDownloadLink
              document={<PdfFile invoice={invoice} allItem={allItem} userInfo={user}/>}
              fileName="eMarketHub-invoice.pdf"
            >
              {({ blob, url, loading, error }) => {
                if (loading) {
                  return (
                    <button className="btn btn-sm bg-[#155967] mt-2 w-24 rounded-2xl h-10 hover:bg-[#3A4A69] text-white flex items-center justify-evenly">
                      <PrintIcon />
                      Loading document...
                    </button>
                  );
                } else if (error) {
                  console.error("Error generating PDF:", error);
                  return <div>Error loading PDF</div>;
                } else {
                  return (
                    <a href={url} download="eMarketHub-invoice.pdf">
                      <button className="btn btn-sm bg-[#155967] mt-2 w-24 rounded-2xl h-10 hover:bg-[#3A4A69] text-white flex items-center justify-evenly">
                        <PrintIcon /> Print
                      </button>
                    </a>
                  );
                }
              }}
            </PDFDownloadLink> : ''}
          </div>
          
          {allItem.length > 0 ? 
          <div>
            {allItem.map((product) => {
            const {
              orderDate,
              product_image,
              quantity,
              totalPrice,
              product_name,
            } = product;
            return [
              <div key={product._id} className="bg-white my-3 p-2">
                <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
                  <p className="text-xs">{orderDate}</p>
                  <p className="px-5 py-1 mt-2 font-[500] rounded-xl text-xs  bg-red-100">
                    {selectStatus}
                  </p>
                </div>

                <div className="mt-2 flex justify-between lg:mr-20">
                  <div className="flex gap-2">
                    <img
                      className="w-24"
                      src={product_image}
                      alt="product image"
                    />
                    <h2 className="text-xl">{product_name}</h2>
                  </div>

                  <p>৳{totalPrice}</p>
                  <p>Qty:{quantity}</p>
                </div>
              </div>
            ];
          })}
          </div> : <div className="text-red-500 flex items-center justify-center">No item</div>}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
