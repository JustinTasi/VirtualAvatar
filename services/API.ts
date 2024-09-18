import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

export const PERMISSION_DENIED = 'PermissionDenied';
export const USER_ACCESS_DENIED = 'User - AccessDenied';
export const USER_NOT_LOGIN = 'User - NotLogin';

const API = axios.create({ 'baseURL': 'http://127.0.0.1:8000/' });

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
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

API.interceptors.response.use(
  async config => {
    if (!config.data.result) {
      if (config.data.errorCode === PERMISSION_DENIED) {
        localStorage.removeItem('token');
      }
      throw config.data;
    } else {
      if (config.headers['x-auth-token']) {
        localStorage.setItem('token', config.headers['x-auth-token']);
      }
    }
    return config.data;
  },
  error => {
    if (error.response.data.errorCode === USER_NOT_LOGIN) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error.response.data);
  }
);

export default API;