import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
  login,
  logout,
  getDetails,
};

function login(email, password) {
  console.log(email, password);
  return dispatch => {
    dispatch(request({ email }));

    userService
      .login(email, password)
      .then(user => {
        dispatch(success(user));
        // history.push('/');
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
