import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useDistricts = (division) => {
    const axiosPublic = useAxiosPublic();

    const {data: districts = []} = useQuery({
        queryKey: ['districts',division],
        queryFn: async () => {
            const res = await axiosPublic.get(`/districts?division=${division}`);
            return res.data;
        }
    })
    
    
    return [districts];
    
};

export default useDistricts;