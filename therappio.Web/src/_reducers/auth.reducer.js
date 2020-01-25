import { userConstants } from '../_constants';
import { localStorageService } from '../_services';

const initialState = {
    isFetching: false,
    isAuthenticated: !!localStorageService.getToken(),
};

export function auth(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.error,
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
