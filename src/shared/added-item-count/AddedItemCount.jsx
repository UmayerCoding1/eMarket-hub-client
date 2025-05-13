import React, { createContext } from 'react';
import useCart from '../../hooks/useCart';

export const AddedCount = createContext(null);
const AddedItemCount = ({children}) => {
    const [cart,loading,refetch] = useCart();
    // const totalItems = cart?.reduce((totalItem,product) => totalItem + product.quantity,0 );
    return (
       
        <AddedCount.Provider value={'totalItems'}>
                 {children}
        </AddedCount.Provider>
        
       
    );
};

export default AddedItemCount;