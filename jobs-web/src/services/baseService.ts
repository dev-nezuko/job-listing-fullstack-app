import axios from 'axios';
import Cookies from 'js-cookie';

export const baseService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
});
baseService.interceptors.request.use((config) => {
  config.headers.authtoken = Cookies.get('authtoken') || '';

  return config;
});
