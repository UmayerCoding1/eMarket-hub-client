import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
  // baseURL: "http://localhost:8000",
});
const useAxiosSecure = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();




  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("eMarketHub-Access-Token");

    config.headers.authorization = `Barer ${token}`;
    return config;
  }),
  function (error) {
    return Promise.reject(error);
  };

  axiosSecure.interceptors.response.use((response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if(status === 404) {
        console.log("status error in the interceptors", error);
         logout();
         await navigate('/sign-in')
      }
      return Promise.reject(error);
    }
  )

  return axiosSecure;
};

export default useAxiosSecure;
