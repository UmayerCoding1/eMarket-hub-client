import React from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from './useAxiosPublic';

const useDivisions = () => {
    const axiosPublic = useAxiosPublic();
    const {data: divisions = []} = useQuery({
        queryKey: ['divisions'],
        queryFn: async () => {
          const res =await axiosPublic.get('/divisions');
          return res.data;
        }
    })
    
    
    return [divisions];
    
};

export default useDivisions;