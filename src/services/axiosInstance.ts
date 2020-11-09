import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'http://192.168.0.30:5000',
});

export default axiosInstance;
