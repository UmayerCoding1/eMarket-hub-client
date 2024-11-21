import React from "react";

const AddCartButton = ({handleAction,loading, children }) => {
  
  return (
    <div>
      <button
        onClick={() => handleAction()}
        className="px-4 h-10 text-xs rounded-lg bg-orange-500 text-white "
      >
       {loading ? 'adding....' :  children}
      </button>
    </div>
  );
};

export default AddCartButton;
