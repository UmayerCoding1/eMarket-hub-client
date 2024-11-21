import React from 'react';

const SearchBar = ({handleAction}) => {
    return (
        <div className="my-2 lg:my-0">
            <input
              onChange={handleAction}
              className="border-2 outline-none w-full   h-10 pl-2 text-xs   rounded-2xl   text-black bg-white border-orange-300  lg:rounded-md lg:w-96 lg:border-[#00000070] lg:sticky"
              type="text"
              placeholder="Search a products is EMarket Hub....."
            />
          </div>
    );
};

export default SearchBar;