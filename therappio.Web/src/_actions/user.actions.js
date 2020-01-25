import { history } from '../_helpers';
import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
    login,
    logout,
    register,
    getDetails,
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService
            .login(email, password)
            .then(user => {
                dispatch(success(user));
                history.push('/');
            })
            .catch(error => {
                dispatch(failure(error.toString()));
                // dispatch(alertActions.error(error.toString()));
            });
    };

    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error };
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(email, password) {}

function getDetails(email) {}
