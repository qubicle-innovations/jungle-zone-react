import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  config.params = config.params || {};
  return config;
});

export default axiosInstance;
