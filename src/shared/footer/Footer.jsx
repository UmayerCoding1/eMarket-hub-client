import React from "react";
import { logo } from "../../provider/ImageProvider";
import payment1 from "./../../assets/payment1.png";
import payment2 from "./../../assets/payment2.png";
import payment3 from "./../../assets/payment3.png";
import payment4 from "./../../assets/payment4.png";
import payment5 from "./../../assets/payment5.png";
const Footer = () => {
  return (
    <footer className="mt-auto mb-14   lg:flex  justify-evenly text-[#0F136D] bg-gray-200 p-2 relative">
      <div className="flex  gap-2 lg:gap-28">
        <div>
          <h3 className="text-xl">Customer Care</h3>
          <ul className="text-xs pl-2 space-y-1">
            <li>Help Center</li>
            <li> How to Buy</li>
            <li>Returns & Refunds</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>CCMS - Central Complain Management System</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl">EMarket Hub</h3>
          <ul className="text-xs pl-2 space-y-1">
            <li>About EMarket Hub</li>
            <li>Digital Payments</li>
            <li>EMarket Hub Card</li>
            <li>EMarket Hub Blog</li>
            <li>EMarket Hub Cares</li>
            <li>EMarket Hub Mart</li>
            <li>Privacy Policy</li>
            <li>EMarket Hub App</li>
            <li>EMarket Hub Exclusives</li>
            <li>EMarket Hub Donates</li>
            <li>EMarket Hub University</li>
            <li>Sell on EMarket Hub</li>
            <li>Code of Conduct</li>
            <li>Join the EMarket Hub Affiliate Program</li>
          </ul>
        </div>
      </div>

      <div>
        <dir>
          <img className="w-20" src={logo} alt="" />
          <h2 className="text-[#6D4AAE]">Happy shopping</h2>
        </dir>

        <div className="mt-10">
          <h2 className="mb-3">Payment Methods</h2>

          <div className="flex items-center gap-4">
            <img className="w-10" src={payment2} alt="payment2" />
            <img className="w-10" src={payment3} alt="payment3" />
            <img className="w-10" src={payment1} alt="payment1" />
            <img className="w-10" src={payment4} alt="payment4" />
            <img className="w-10" src={payment5} alt="payment5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
