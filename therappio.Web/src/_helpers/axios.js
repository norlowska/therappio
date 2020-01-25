import axios from 'axios';
import { Promise } from 'es6-promise';
import { localStorageService } from '../_services/localStorage.service';

// Add a request interceptor
// Add Authorization & Content-Type HTTP headers
axios.interceptors.request.use(
    config => {
        const token = localStorageService.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.header['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        if (error.response.status === 401) {
            // TODO: dispatch LOGOUT
            // logout();
            location.reload(true);
        }
        return Promise.reject(error);
    }
);
