import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';

const useCart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;
  
    const { data: cart = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['cart', userEmail],
        queryFn: async () => {
          const res = await axios.get(`https://e-market-hub-server.onrender.com/cart?email=${userEmail}`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem("eMarketHub-Access-Token")}`
            }
          });
          return Array.isArray(res.data) ? res.data : [];
        },

        staleTime: Infinity,
      });

 
    
    return [cart, loading, refetch];
};

export default useCart;
