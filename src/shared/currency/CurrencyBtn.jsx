import React from 'react';

const CurrencyBtn = ({children}) => {
    return (
        <button>
           ৳{children}
        </button>
    );
};

export default CurrencyBtn;