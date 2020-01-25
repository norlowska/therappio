import { userConstants } from '../_constants';

export const userActions = {
    login,
    logout,
    register,
    getDetails,
};

function login(email, password) {
    return dispatch => {
        dispatch();
    };
}

function logout(email) {}

function register(email, password) {}

function getDetails(email) {}
