import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from './useAuth';

const useAddress = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: address=[],isLoading: loading,refetch} = useQuery({
        queryKey: ['address'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/addresses?email=${user?.email}`)
            return res.data;
        }
    })
    
    return [address,loading,refetch]
    
};

export default useAddress;