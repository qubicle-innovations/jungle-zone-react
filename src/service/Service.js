import axiosInstance from "./ApiHelper";

// Example service functions
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching data');
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error posting data');
  }
};

// You can add more functions as needed
