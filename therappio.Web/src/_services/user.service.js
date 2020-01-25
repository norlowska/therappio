import axios from 'axios';
import config from 'config';

export const userService = {
    login,
    logout,
    register,
    getDetails,
};

function login(email, password) {
    const options = {
        headers: { 'Content-Type': 'application/json' } }
    }

    return axios
        .post(
            `${config.apiUrl}/users/login`,
            { email, password },
            options 
        )
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    return axios
        .post(`${config.apiUrl}/users/signup`, user, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(handleResponse);
}

function getDetails(email) {}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);

        return data;
    });
}
