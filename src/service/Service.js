import axios from 'axios';

import { store } from '../store/Store';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = `Bearer${state.login.logData.user.token}`;
  const headers = {
    Authorization: token,
    // Other headers can be added similarly
  };
  config.params = config.params || {};
  config.headers = headers;

  return config;
});

// Example service functions
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error posting data');
  }
};

// You can add more functions as needed
