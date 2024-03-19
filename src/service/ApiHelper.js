import axios from 'axios';

import CryptoJS from 'crypto-js';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const sttoken = localStorage.getItem('token');
  const secretPass = 'j123@nglez678$one';
  const detoken = CryptoJS.AES.decrypt(sttoken, secretPass).toString(CryptoJS.enc.Utf8);
  const token = JSON.parse(detoken);
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  config.params = config.params || {};
  config.headers = headers;

  return config;
});

export default axiosInstance;
