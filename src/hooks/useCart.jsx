import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;
    const {data: cart=[],isLoading : loading,refetch} = useQuery({
        queryKey: ['cart',userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?email=${userEmail}`);
            return res.data
        },
        
    })
    // console.log(cart)
    return [cart,loading,refetch]
};

export default useCart;