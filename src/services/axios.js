import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Point to the base URL of your Symfony API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
