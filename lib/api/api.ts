import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { useDecrypto, useEncrypto } from '../hooks/useCrypto';

const API = axios.create({ 'baseURL': process.env.NEXT_PUBLIC_API_URL });

API.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  if (!config) {
    config = {} as InternalAxiosRequestConfig;
  }
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  if (localStorage.getItem('token')) {
    const token = useDecrypto(localStorage.getItem('token') as string);

    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  async config => {
    if (!config.data.result) {
      throw config.data;
    } else {
      if (config.headers['x-auth-token']) {
        localStorage.setItem('token', useEncrypto(config.headers['x-auth-token']));
      }
    }
    return config.data;
  },
  error => Promise.reject(error.response.data)
);

export default API;