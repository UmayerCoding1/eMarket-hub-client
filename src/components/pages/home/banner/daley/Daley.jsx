import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ComeDown from "./come-down/ComeDown";
import useDaley from "../../../../../hooks/useDaley";

const Daley = () => {
  const [memoizedDaley] = useDaley();
  console.log(memoizedDaley);
  return (
    <div className="hidden   lg:block ">
      {memoizedDaley.map((item) => (
        <div className="w-full h-1/2 border border-[#000]  mb-2 flex relative  rounded-lg p-2 hover:bg-[#80808053]" key={item.title}>
          {item.company_logo ? (
            <img
              className="w-8 h-8 rounded-full absolute "
              src={item?.company_logo || ""}
              alt="s"
            />
          ) : (
            ""
          )}
          <div className="w-[60] flex flex-col justify-evenly flex-grow">
            <img className="w-full" src={item.product_img} alt="ss" />
          </div>

          <div className="w-">
            <h2 className="font-bold ml-2">{item.title}</h2>
            <p className="text-xs font-bold ml-2">
              {item.company_name || "no-brand"}
            </p>

            {/* TODO: add price section and modify again */}
            <p className="bg-red-500 w-10 h-10 text-xs rounded-full flex items-center justify-center font-bold text-white ml-5">
             {item.offer}% 
            </p>

            <div>
                <ComeDown offerEnd={item.time}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Daley;
