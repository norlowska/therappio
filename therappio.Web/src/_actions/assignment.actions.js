import { toast } from 'react-toastify';
import { assignmentConstants } from '../_constants';
import { assignmentService } from '../_services';
import { history } from '../_utilities';

export const assignmentActions = {
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
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

function createAssignment(assignment) {
    return dispatch => {
        dispatch(request(assignment));
        return assignmentService
            .create(assignment)
            .then(res => {
                dispatch(success(res.data, res.message));
                toast.success('New assignment created successfully');
                history.push(`/patients/${res.data.patient._id}`);
            })
            .catch(error => {
                dispatch(failure(error.response.data.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(assignment) {
        return {
            type: assignmentConstants.CREATE_ASSIGNMENT_REQUEST,
            assignment,
        };
    }
    function success(assignment, message) {
        return {
            type: assignmentConstants.CREATE_ASSIGNMENT_SUCCESS,
            payload: { assignment, message },
        };
    }
    function failure(error) {
        return { type: assignmentConstants.CREATE_ASSIGNMENT_FAILURE, error };
    }
}

function updateAssignment(assignment, patientId) {
    return dispatch => {
        dispatch(request(assignment));
        return assignmentService
            .update(assignment)
            .then(res => {
                dispatch(success(assignment, patientId, res.message));
                // toast.success('Assignment updated successfully');
                history.push(`/patients/${patientId}`);
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

function deleteAssignment(id) {
    return dispatch => {
        dispatch(request(id));
        return assignmentService
            .delete(id)
            .then(res => {
                toast.success('Assignment deleted successfully');
                dispatch(success(id));
            })
            .catch(error => {
                dispatch(failure(error.response.data.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: assignmentConstants.DELETE_ASSIGNMENT_REQUEST, id };
    }
    function success(id) {
        return {
            type: assignmentConstants.DELETE_ASSIGNMENT_SUCCESS,
            id,
        };
    }
    function failure(error) {
        return { type: assignmentConstants.DELETE_ASSIGNMENT_FAILURE, error };
    }
}
