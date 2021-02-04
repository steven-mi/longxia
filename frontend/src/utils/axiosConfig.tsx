import axios from 'axios';
import { BACKEND_API } from '../constants';

const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

export const setAuthHeader = authHeader => {
  axiosInstance.defaults.headers.common['Authorization'] = authHeader;
};
export default axiosInstance;
