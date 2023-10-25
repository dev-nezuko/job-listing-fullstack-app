import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const apiService = (): AxiosInstance => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      authtoken: Cookies.get('authtoken'),
    },
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => config,
    (error) => {
      Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (err) => Promise.reject(err)
  );

  return instance;
};

export const baseService = apiService();
