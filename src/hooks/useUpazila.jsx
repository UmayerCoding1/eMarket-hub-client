import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from 'react-query';

const useUpazila = (city) => {
    const axiosPublic = useAxiosPublic();
    const {data: upazilas=[]} = useQuery({
        queryKey: ['upazilas',city],
        queryFn: async () => {
            const res  = await axiosPublic.get(`/upazilas?city=${city}`);
                return res.data;
        }
    })
    return [upazilas]
};

export default useUpazila;