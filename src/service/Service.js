import axiosInstance from './ApiHelper';

// Example service functions
export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    return { success: false, response: error.response.data.response };
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    return { success: false, response: error.response.data.response };
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(`${endpoint}`, data);
    return response.data;
  } catch (error) {
    return { success: false, response: error.response.data.response };
  }
};
export const deleteData = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}`);
    return response.data;
  } catch (error) {
    return { success: false, response: error.response.data.response };
  }
};

// You can add more functions as needed
