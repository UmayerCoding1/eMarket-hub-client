import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { logo } from "../../provider/ImageProvider";
import {
  Close,
  DarkIcon,
  DownIcon,
  HomeIcon,
  Menu,
  NightIcon,
  ShopIcon,
  ShoppingCard,
  UpIcon,
  EventIcon,
  BlogIcon,
  AboutIcon,
  ContactIcon,
  UserIcon,
  Bag,
  Heart,
  LogoutIcon,
} from "../../provider/IconProvider";
import { Avatar, Button } from "@mui/material";
import "./navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/Searchbar";
import useCategory from "../../hooks/useCategory";
import useAuth from "../../hooks/useAuth";
import { deepPurple } from "@mui/material/colors";
import useCart from "../../hooks/useCart";

const Navbar = ({ handleTheme, darkTheme }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [category] = useCategory();
  const memoizedCategories = useMemo(() => category, [category]);
  const { user, logout } = useAuth();
  const [cart, Loading, refetch] = useCart();
  const navigate = useNavigate();
  const navLink = (
    <>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/"}>
          <button className="mr-1">
            <HomeIcon />
          </button>{" "}
          Home
        </NavLink>
      </li>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/shop"}>
          <button className="mr-1">
            <ShopIcon />
          </button>{" "}
          Shop
        </NavLink>
      </li>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/event"}>
          <button className="mr-1">
            <EventIcon />
          </button>{" "}
          Event
        </NavLink>
      </li>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/blog"}>
          <button className="mr-1">
            <BlogIcon />
          </button>{" "}
          Blog
        </NavLink>
      </li>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/about-us"}>
          <button className="mr-1">
            <AboutIcon />
          </button>{" "}
          About Us
        </NavLink>
      </li>
      <li
        onClick={() => setShowNav(!showNav)}
        className="mr-4 mt-5 text-[15px] font-[500] lg:mr-10 "
      >
        <NavLink className="flex items-center" to={"/contact-us"}>
          <button className="mr-1">
            <ContactIcon />
          </button>{" "}
          Contact Us
        </NavLink>
      </li>
    </>
  );

  

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();

      setSearchText(e.target.value);

      if (e.target.value !== "") {
        navigate(`/shop?search=${e.target.value || ""}`);
      } else {
        navigate("/shop");
      }
    },
    [navigate]
  );

 
  const total = cart?.reduce(
    (totalItem, product) => totalItem + product?.quantity,
    0
  );

  return (
    <header
      className={`shadow  lg:px-2 pt-1 ${
        darkTheme ? "shadow-[#ffffff26]" : "shadow-[#0000001f]"
      }`}
    >
      <nav className="hidden lg:block">
        <div className="flex items-center justify-between lg:px-10">
          <button
            onClick={() => setShowNav(!showNav)}
            className=" text-3xl lg:hidden "
          >
            <Menu />
          </button>
          <Link to={"/"}>
            {" "}
            <img className="w-28" src={logo} alt="" />
          </Link>

          <div className="hidden lg:block">
            <SearchBar handleAction={handleSearch} />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleTheme(!darkTheme)}
              className="-rotate-90 text-2xl"
            >
             
            </button>

            {user ? (
              <div className="cursor-pointer relative flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    onClick={() => setShowProfile(!showProfile)}
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL}
                    alt="User Profile"
                  />
                ) : (
                  <Avatar onClick={() => setShowProfile(!showProfile)}></Avatar> 
                  
                )}

                <div
                  className={`w-52 h-56 shadow-custom absolute top-10 left-[-110px] p-2 lg:left-[-150px] bg-white z-10 ${
                    showProfile ? "" : "hidden"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2  border-b border-black">
                    {user?.photoURL ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user?.photoURL}
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {user?.displayName ? user?.displayName.slice(0, 1) : "XXX"}
                      </Avatar>
                    )}
                    <div className="text-xs">
                      <h2 className="text-[15px] font-semibold">
                        {user?.displayName || "user info"}
                      </h2>
                      <p>{user?.email}</p>
                    </div>
                  </div>

                  <div>
                    <ul>
                      <li onClick={() => setShowProfile(!showProfile)} className="flex items-center my-3 gap-3">
                        <UserIcon />
                        <NavLink to={"/my-account"}> My Account</NavLink>
                      </li>
                      <li onClick={() => setShowProfile(!showProfile)} className="flex items-center my-3 gap-3">
                        <Bag />
                        <NavLink to={"/my-order"}>My Orders</NavLink>
                      </li>
                      <li onClick={() => setShowProfile(!showProfile)} className="flex items-center my-3 gap-3">
                        <Heart />
                        <NavLink to={"/my-list"}>My List</NavLink>
                      </li>
                      <li
                        onClick={() => logout()}
                        className="flex items-center my-3 gap-3 text-red-500"
                      >
                        {" "}
                        <LogoutIcon /> Logout
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="">
                  <Link to={"/cart"}>
                    <button className="w-10 h-10 bg-[#FFDAD3] pl-2 flex items-center justify-between rounded-full relative  ">
                      <ShoppingCard className="text-2xl" />
                      {cart.length > 0 ?<span className="w-4 h-4 block bg-gray-700 text-white rounded-full  text-center absolute top-1 right-0 text-xs  ">
                        {total}
                      </span> :''}
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to={"/sign-in"}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "#6D4AAE", fontWeight: "bold" }}
                  >
                    Sign In
                  </Button>
                </Link>

                <div className="">
                  <Link to={"/cart"}>
                    <button className="w-10 h-10 relative  ">
                      <ShoppingCard className="text-2xl" />
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div  className="flex items-center justify-between mt-2 gap-5 relative p-2 ">
          <div className="w-full h-14   text-xs  flex items-center  cursor-pointer   text-black lg:w-[220px] ">
            <button className="text-2xl">
              <Menu />
            </button>
            <h2  onClick={() => setShowCategory(!showCategory)}
           className="font-bold">All Categories</h2>
            {showCategory ? (
              <button className="ml-2">
                <DownIcon />
              </button>
            ) : (
              <button className="ml-2">
                <UpIcon />
              </button>
            )}
          </div>
          {showCategory ? (
            <div className="absolute top-[65px] text-black bg-white z-30 w-full  shadow-xl  lg:w-52 ">
              <ul className="pl-5 pb-3 relative">
                {memoizedCategories.map((item, i) => {
                  return [
                    <li
                      onClick={() => setShowCategory(!showCategory)}
                      className="mt-5 flex cursor-pointer parCa hover:text-blue-400"
                      key={i}
                    >
                      
                      {item.name}
                    </li>
                  ];
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className="hidden lg:block">
            <ul className="flex">{navLink}</ul>
          </div>

          
        </div>
      </nav>

      <nav className="lg:hidden">
      <div className="  ">
            <SearchBar handleAction={handleSearch} />
          </div>

          <div className="w-full h-16 bg-white fixed bottom-0 left-0 z-10 flex items-center  justify-evenly">
             <button className="text-2xl flex flex-col items-center"><NavLink to={'/'}><HomeIcon/></NavLink><span className="text-xs pt-1">Home</span></button>
             <button className="text-2xl flex flex-col items-center"><NavLink to={'/cart'}><ShoppingCard/></NavLink><span className="text-xs pt-1">Cart</span></button>
             <button className="text-2xl flex flex-col items-center"><NavLink to={'/my-account'}><UserIcon/></NavLink><span className="text-xs pt-1">Account</span></button>

             {user ?  <button onClick={logout} className="text-2xl flex flex-col items-center"><LogoutIcon/><span className="text-xs pt-1">Logout</span></button> 
             :
             <Link to={"/sign-in"}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "#6D4AAE", fontWeight: "bold" }}
                  >
                    Sign In
                  </Button>
                </Link>
            }
          </div>
      </nav>

      
    </header>
  );
};

export default Navbar;
