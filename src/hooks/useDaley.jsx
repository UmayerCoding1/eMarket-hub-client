import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import { useMemo } from 'react';

const useDaley = () => {
   const axiosPublic = useAxiosPublic();
   const {data: daley=[]} = useQuery({
    queryKey: ['daley'],
    queryFn: async () => {
        const res = await axiosPublic.get('/daley');
        return res.data;
    }
   })
   const memoizedDaley = useMemo(() => daley,[daley]);
    return [memoizedDaley];
};

export default useDaley;