import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7254/api/',
  timeout: 100000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

export type ID = number;
