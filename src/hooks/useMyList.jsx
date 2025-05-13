import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useMyList = () => {
    const {user} = useAuth();

    const {data: myList = [],refetch}= useQuery({
        queryKey: ['myList',user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://e-market-hub-server.onrender.com/my-list?email=${user?.email}`,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("eMarketHub-Access-Token")}`
                    }
                }
            );
            return res.data
        }
    })
    return [myList,refetch]
};

export default useMyList;