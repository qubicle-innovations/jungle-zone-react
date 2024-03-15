import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

export const loginData = async (endpoint, payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload);
      return response.data;
    } catch (error) {
      throw new Error('Error posting data');
    }
  };

// Example service functions
export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Error posting data');
  }
};

// You can add more functions as needed
