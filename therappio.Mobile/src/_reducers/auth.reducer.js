import { userConstants } from '../_constants';
import { userService } from '../_services';

const initialState = {
  isFetching: true,
  isAuthenticated: false,
  user: {},
  token: '',
  errorMessage: '',
};

export function auth(state = initialState, action) {
  console.log('reducer', action.type, action);
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
        user: action.user,
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
        isFetching: false,
        isAuthenticated: false,
        user: {},
      };
    case userConstants.GETDETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case userConstants.GETDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      };
    case userConstants.GETDETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };
    case userConstants.GET_AUTH_TOKEN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case userConstants.GET_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        isAuthenticated: true,
      };
    case userConstants.GET_AUTH_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
