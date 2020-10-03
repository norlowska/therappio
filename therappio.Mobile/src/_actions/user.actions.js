import { userConstants } from '../_constants';
import { navigationService, userService } from '../_services';
import { modalActions } from './modal.actions';

export const userActions = {
  login,
  logout,
  getDetails,
  getAuthToken,
  updateDetails,
};

function login(email, password) {
  return dispatch => {
    console.log('dispatch login');
    dispatch(request({ email }));
    userService
      .login(email, password)
      .then(user => {
        dispatch(success(user));
        navigationService.navigate('Main');
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
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
    console.log(error);
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return dispatch => {
    dispatch(request());
    userService
      .logout()
      .then(() => {
        dispatch(success());
        navigationService.navigate('Auth');
      })
      .catch(error => {
        dispatch(failure(error.message));
        // dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: userConstants.LOGOUT_REQUEST };
  }
  function success() {
    return { type: userConstants.LOGOUT_SUCCESS };
  }
  function failure(error) {
    return { type: userConstants.LOGOUT_FAILURE, error };
  }
}

function getDetails() {
  console.log('get details action');
  return dispatch => {
    dispatch(request());

    userService
      .getDetails()
      .then(user => {
        dispatch(success(user));
      })
      .catch(error => {
        dispatch(failure(error.message));
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
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

function getAuthToken() {
  return dispatch => {
    dispatch(request());
    console.log('dispatch get auth token');
    userService
      .getAuthToken()
      .then(token => {
        console.log('get auth token resolved ', token);
        if (token) {
          dispatch(success(token));
          navigationService.navigate('Main');
        } else {
          dispatch(failure(''));
          navigationService.navigate('Auth');
        }
      })
      .catch(error => {
        dispatch(failure(error.message));
        // dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: userConstants.GET_AUTH_TOKEN_REQUEST };
  }
  function success(token) {
    return { type: userConstants.GET_AUTH_TOKEN_SUCCESS, token };
  }
  function failure(error) {
    return { type: userConstants.GET_AUTH_TOKEN_FAILURE, error };
  }
}

function updateDetails(user) {
  return dispatch => {
    dispatch(request());
    console.log('dispatch update user request');
    userService
      .updateDetails(user)
      .then(user => {
        console.log('dispatch update user success', user);
        dispatch(success(user));
        dispatch(modalActions.hideModal());
      })
      .catch(error => {
        console.log();
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
        // dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: userConstants.UPDATE_DETAILS_REQUEST };
  }
  function success(user) {
    return { type: userConstants.UPDATE_DETAILS_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_DETAILS_FAILURE, error };
  }
}
