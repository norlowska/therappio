import axios from 'axios';
import { Promise } from 'es6-promise';
import { userActions } from '../_actions';
import { userService } from '../_services';
// Add a request interceptor
// Add Authorization & Content-Type HTTP headers
axios.interceptors.request.use(
  config => {
    return userService.getAuthToken().then(token => {
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    console.log('Request error: ', error);
    // if (error & error.response && error.response.status && error.response.status === 401) {
    //   userActions.logout();
    // }
    return Promise.reject(error);
  }
);
