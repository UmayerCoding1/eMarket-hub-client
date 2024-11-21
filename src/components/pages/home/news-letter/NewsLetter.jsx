import React from "react";
import CurrencyBtn from "../../../../shared/currency/CurrencyBtn";
import { EmailIcon } from "../../../../provider/IconProvider";
import newsletterImg from "./../../../../assets/newsletter.webp";
const NewsLetter = () => {
  return (
    <div className="w-full h-64 bg-[#6D4AAE] text-white flex items-center justify-between px-5">
      <div className="space-y-4">
        <p>
          <CurrencyBtn>70</CurrencyBtn> discount for your first order
        </p>
        <h2 className="text-2xl lg:text-4xl font-bold">
          Join our newsletter and get...
        </h2>
        <p className="text-xs text-gray-300">
          Join our email subscription now to get updates on <br />
          promotions and coupons.
        </p>

        <div className="flex items-center w-96 h-14 bg-white p-2 rounded-lg">
          <EmailIcon className="text-black" />
          <input
            className="bg-transparent w-[70%] h-full outline-none text-black pl-2 text-xs"
            type="email"
            placeholder="Your email address"
          />
          <button className="bg-[#6D4AAE] h-full w-[30%] rounded-lg">
            Subscribe
          </button>
        </div>
      </div>

      <div className="hidden mr-10 lg:block">
        <img className="w-72" src={newsletterImg} alt="" />
      </div>
    </div>
  );
};

export default NewsLetter;
