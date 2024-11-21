import React, { useCallback, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import Card from "../../../shared/card/Card";
import useCountProducts from "../../../hooks/useCountProducts";
import { GridViewIcon, ListViewIcon } from "../../../provider/IconProvider";
import Loading from "../../../shared/loading/Loading";
import ListCard from "./list-card/ListCard";
import useCategory from "../../../hooks/useCategory";

const Shop = () => {
  const [view, setView] = useState("gridView");
  const [selectCategory, setSelectCategory] = useState("");
  const [priceSort, setPriceSort] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");
  const [products, loading] = useProducts(searchQuery,priceSort,selectCategory);
  const [AllProducts] = useCountProducts();
  const { count } = AllProducts;
  const [category] = useCategory();
  const memoCount = useMemo(() => count, [count]);
 


  
  const handleCheckboxChange = (e, category_name) => {
    const name = e.target.checked;

    setSelectCategory((prev) => (prev === category_name ? "" : category_name));
  };

  const handleResetFilter = () => {
    setSelectCategory('')
  }
  
  

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-[5%]">
      <Helmet>
        <title>E-Market Hub Shop...</title>
      </Helmet>
      <div className="my-5 flex items-center justify-between">
        <p className="font-normal text-xs text-gray-500">
          <span>{memoCount}</span> items found....
        </p>
        <div className="flex gap-2 lg:gap-10">
          <div className="text-xs flex items-center">
            <label htmlFor="sort">Sort By: </label>
           <button onClick={() => setPriceSort(!priceSort)} className="bg-gray-200 rounded-lg ml-2 p-2">{priceSort ? 'Price high to low' : 'Price low to high'}</button>
          </div>

          <div className="text-xs flex items-center gap-2 lg:gap-0">
            <label htmlFor="">View:</label>
            <button
              onClick={() => setView("gridView")}
              className={
                view === "gridView"
                  ? "text-2xl   lg:ml-4 "
                  : "text-2xl  text-gray-400 lg:ml-4"
              }
            >
              <GridViewIcon />
            </button>
            <button
              onClick={() => setView("listView")}
              className={
                view === "listView"
                  ? "text-2xl  lg:ml-4"
                  : "text-2xl  text-gray-400 lg:ml-4"
              }
            >
              <ListViewIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-5 mt-2 ">
        <div className="hidden pr-4 lg:block">
          <div className="flex items-center justify-between">
            <h2>Filter</h2>
            {selectCategory === "" ? (
              ""
            ) : (
              <button onClick={() => handleResetFilter()} className="w-20 h-8 text-xs bg-red-400  hover:bg-red-500 border-none rounded-xl ">
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-col">
            {category.map((item) => {
              return [
                <div key={item._id} className="text-xs my-3">
                  <input
                    className="mr-2"
                    type="checkbox"
                    name={item.name}
                    checked={selectCategory === item.name}
                    onChange={(e) => handleCheckboxChange(e, item.name)}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>,
              ];
            })}
          </div>
        </div>

        {products.length > 0 ? <div className="col-span-4 ">
          {view === "gridView" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5  ">
              {products.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="  ">
              {products.map((product) => (
                <ListCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div> : <p>This products is to not available!</p>}
      </div>
    </div>
  );
};

export default Shop;
