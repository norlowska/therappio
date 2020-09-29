import { assignmentConstants } from '../_constants';
import { assignmentService } from '../_services';

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
        dispatch(failure(error.response.data.message));
        // dispatch(alertActions.error(error.toString()));
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

function updateAssignment(assignment, patientId) {
  return dispatch => {
    dispatch(request(assignment));
    return assignmentService
      .update(assignment)
      .then(res => {
        dispatch(success(assignment, patientId, res.message));
      })
      .catch(error => {
        dispatch(failure(error.response.data.message));
        // dispatch(alertActions.error(error.toString()));
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
      payload: { assignment, patientId, message },
    };
  }
  function failure(error) {
    return { type: assignmentConstants.UPDATE_ASSIGNMENT_FAILURE, error };
  }
}
