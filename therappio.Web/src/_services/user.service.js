import axios from 'axios';
import config from '../config';
import { history } from '../_utilities';
import { localStorageService } from './localStorage.service';

export const userService = {
    login,
    logout,
    register,
    getDetails,
};

function login(email, password) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios
        .post(`${config.apiUrl}/users/login`, { email, password }, options)
        .then(res => {
            const { user } = res.data;
            if (
                user &&
                user.hasOwnProperty('role') &&
                user.role !== 'Therapist'
            ) {
                history.push('/login?unauthorized=true');
                throw 'You are not authorized to access the resource.';
            }
            // store jwt token in local storage to keep user logged in between page refreshes
            localStorageService.setToken(res.data.token);

            return res.data.user;
        });
}

function logout() {
    localStorageService.clearToken();
}

function register(user) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };
    return axios.post(`${config.apiUrl}/users/signup`, user, options);
}

function getDetails() {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.get(`${config.apiUrl}/users/profile`, options).then(res => {
        return res.data;
    });
}
