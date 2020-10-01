import axios from 'axios';
import { Promise } from 'es6-promise';
import { userActions } from '../_actions';
import { userService } from '../_services';
// Add a request interceptor
// Add Authorization & Content-Type HTTP headers
axios.interceptors.request.use(
  config => {
    return userService.getToken().then(token => {
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
    if (error.response.status === 401) {
      userActions.logout();
      //   history.push('/login?unauthorized=true');
    }
    return Promise.reject(error);
  }
);
