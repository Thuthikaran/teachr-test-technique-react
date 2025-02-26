import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://stack-shelf-b899d76c16dc.herokuapp.com/api',  // Point to the base URL of your Symfony API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
