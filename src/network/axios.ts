// axios.js
import { hideLoader, showLoader } from '@/store/slices/common/loaderSlice';
import store from '@/store/store';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_CLIENT = axios.create({
  // baseURL: 'http://localhost:3001', // Replace with your API base URL
  baseURL: 'https://node-pesto-health.onrender.com', // Replace with your API base URL
});

// Add request interceptor
API_CLIENT.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("access_token")?.replace(/^"|"$/g, '');
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['x-access-token'] = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
API_CLIENT.interceptors.response.use(
  (response) => {
    // Add your response handling logic here
    store.dispatch(showLoader())
    return response;
  },
  async (error) => {
    console.log('API_CLIENT', error);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post('https://node-pesto-health.onrender.com/api/auth/refreshToken', { refreshToken });
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("access_token", newAccessToken);
      Cookies.set("access_token", newAccessToken, { expires: 1 / 720 });
      originalRequest.headers['x-access-token'] = newAccessToken;
      return API_CLIENT(originalRequest);
    }

    // Handle errors globally
    store.dispatch(hideLoader())

    // if (error.response && error.response.status === 401) {

    //   deleteCookie("isAuthenticated");
    //   deleteCookie("user_type");
    //   deleteCookie("user_details");
    //   deleteCookie("access_token");
    //   window.location.href = '/';
    //   alert('Session expired please login again')
    // }
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default API_CLIENT;
