import { assignmentConstants } from '../_constants';
import { assignmentService } from '../_services';
import { ToastAndroid } from 'react-native';
import { modalActions } from './modal.actions';

export const assignmentActions = {
  fetchAssignments,
  updateAssignment,
};

function fetchAssignments() {
  return dispatch => {
    dispatch(request());
    return assignmentService
      .getAll()
      .then(assignments => {
        dispatch(success(assignments));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        dispatch(failure(errorMsg));
      });
  };
  function request() {
    return { type: assignmentConstants.FETCH_ASSIGNMENTS_REQUEST };
  }
  function success(assignments) {
    return {
      type: assignmentConstants.FETCH_ASSIGNMENTS_SUCCESS,
      assignments,
    };
  }
  function failure(error) {
    return { type: assignmentConstants.FETCH_ASSIGNMENTS_FAILURE, error };
  }
}

function updateAssignment(assignment) {
  return dispatch => {
    dispatch(request(assignment));
    return assignmentService
      .update(assignment)
      .then(res => {
        dispatch(success(assignment, res.message));
        dispatch(modalActions.hideModal());
        ToastAndroid.show('Assignment successfully submitted', ToastAndroid.SHORT);
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        dispatch(failure(errorMsg));
      });
  };
  function request(assignment) {
    return {
      type: assignmentConstants.UPDATE_ASSIGNMENT_REQUEST,
      assignment,
    };
  }
  function success(assignment, patientId, message) {
    return {
      type: assignmentConstants.UPDATE_ASSIGNMENT_SUCCESS,
      assignment,
    };
  }
  function failure(error) {
    return { type: assignmentConstants.UPDATE_ASSIGNMENT_FAILURE, error };
  }
}
