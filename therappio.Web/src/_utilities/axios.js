import { history } from './history';
import axios from 'axios';
import { Promise } from 'es6-promise';
import { localStorageService } from '../_services/localStorage.service';
import { userActions } from '../_actions';

// Add a request interceptor
// Add Authorization & Content-Type HTTP headers
axios.interceptors.request.use(
    config => {
        const token = localStorageService.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';

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
            userActions.logout();
            history.push('/login?unauthorized=true');
        }
        return Promise.reject(error);
    }
);
