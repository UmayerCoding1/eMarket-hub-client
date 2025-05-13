import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import "./main.css";
import AddedItemCount from "../shared/added-item-count/AddedItemCount";
import { Toaster } from "react-hot-toast";
const Main = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  // darkTheme
  // ? "bg-[#112143] text-white lg:px-3 py-2"
  // : "bg-white lg:px-3 py-2"

  return (
    <div
      className={`lg:px-3  ${darkTheme ? 'bg-[#112143] text-white' : 'bg-white' }  `}
    >
      
       <AddedItemCount>
       <Navbar handleTheme={handleTheme} darkTheme={darkTheme} />
       </AddedItemCount>
     
      <div>
        <Outlet />
      </div>
      <Footer />
      <p className="text-xs text-center">&copy; EMarket Hub 2024</p>

      <Toaster containerStyle={false} position="top-right"/>
    </div>
  );
};

export default Main;
