import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import 'react-tabs/style/react-tabs.css';
const useOrder = (selectStatus) => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: orders=[]} = useQuery({
        queryKey: ['orders',selectStatus],
        queryFn: async () => {
            const res= await axiosSecure.get(`/orderUI?email=${user?.email}&status=${selectStatus}`);
            return res.data;
        }
    })
    
    return [orders]
};

export default useOrder;