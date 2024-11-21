import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategory = () => {
    const axiosPublic = useAxiosPublic();
    const {data: category = []} = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories');
            return res.data;
        }
    })
    return [category]
};

export default useCategory;