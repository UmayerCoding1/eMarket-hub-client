
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useAddress = () => {
   
    const {user} = useAuth();
    console.log(user?.email);
    
    const {data: address=[],isLoading: loading,refetch} = useQuery({
        queryKey: ['address'],
        queryFn: async () => {
            const res = await axios.get(`https://e-market-hub-server.onrender.com/addresses?email=${user?.email}`,
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("eMarketHub-Access-Token")}`
                    }
                }
            )
            return res.data;
        }
    })
    console.log(address);
    
    return [address,loading,refetch]
    
};

export default useAddress;