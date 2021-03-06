import { history } from '../_utilities';
import { userConstants } from '../_constants';
import { localStorageService, userService } from '../_services';

export const userActions = {
    getAuthToken,
    login,
    logout,
    register,
    getDetails,
};

function getAuthToken() {
    const token = localStorageService.getToken();
    if (token) return { type: userConstants.GET_AUTH_TOKEN_SUCCESS, token };
    else return { type: userConstants.GET_AUTH_TOKEN_FAILURE };
}

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService
            .login(email, password)
            .then(user => {
                dispatch(success(user));
            })
            .catch(error => {
                dispatch(failure(error.message));
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

function register(user) {
    return dispatch => {
        dispatch(request({ email }));

        userService
            .register(user)
            .then(registeredUser => {
                dispatch(success(registeredUser));
                history.push('/login?registration=true');
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };

    function request(registeredUser) {
        return { type: userConstants.REGISTER_REQUEST, registeredUser };
    }
    function success(registeredUser) {
        return { type: userConstants.REGISTER_SUCCESS, registeredUser };
    }
    function failure(error) {
        return { type: userConstants.REGISTER_FAILURE, error };
    }
}

function getDetails() {
    return dispatch => {
        dispatch(request());

        userService
            .getDetails()
            .then(user => {
                dispatch(success(user));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };

    function request() {
        return { type: userConstants.GETDETAILS_REQUEST };
    }
    function success(user) {
        return { type: userConstants.GETDETAILS_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.GETDETAILS_FAILURE, error };
    }
}
