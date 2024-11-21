import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from './useAuth';

const useMyList = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: myList = [],refetch}= useQuery({
        queryKey: ['myList',user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-list?email=${user?.email}`);
            return res.data
        }
    })
    return [myList,refetch]
};

export default useMyList;