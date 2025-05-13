import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    // baseURL: import.meta.env.VITE_BASEURL
    baseURL: 'https://e-market-hub-server.onrender.com'
})
const useAxiosPublic = () => {
    
    
    return axiosPublic;
};

export default useAxiosPublic;