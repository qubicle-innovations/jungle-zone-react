import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const loginData = async (endpoint, payload) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
      return { result: response.data, msg: "success" };
    } catch (error) {
      return { msg: "Invalid Credentials" };
    }
  };
export default loginData;