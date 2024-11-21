import React from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from './useAxiosPublic';

const useCountProducts = () => {
    const axiosPublic = useAxiosPublic();
    const {data: AllProducts=[]} = useQuery({
        queryKey: ['AllProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/count-products');
            return res.data;
        }
    })
    return [AllProducts]
};

export default useCountProducts;