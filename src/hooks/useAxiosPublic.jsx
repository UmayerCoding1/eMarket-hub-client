import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASEURL
    // baseURL: 'http://localhost:8000'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;