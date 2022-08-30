import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'Origin',
    'Content-Type': 'application/json',
  },
});
