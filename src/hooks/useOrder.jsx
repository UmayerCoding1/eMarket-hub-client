import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
const useOrder = (selectStatus) => {
  const { user } = useAuth();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", selectStatus],
    queryFn: async () => {
      const res = await axios.get(
        `https://e-market-hub-server.onrender.com/orderUI?email=${user?.email}&status=${selectStatus}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              "eMarketHub-Access-Token"
            )}`,
          },
        }
      );
      return res.data;
    },
  });

  return [orders];
};

export default useOrder;
