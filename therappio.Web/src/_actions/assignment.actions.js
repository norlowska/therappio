import { toast } from 'react-toastify';
import { assignmentConstants } from '../_constants';
import { assignmentService } from '../_services';

export const assignmentActions = {
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
};

function fetchAssignments() {
    return dispatch => {
        dispatch(request());
        assignmentService
            .getAll()
            .then(assignments => {
                dispatch(success(assignments));
            })
            .catch(error => {
                dispatch(failure(error.message));
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
        assignemntService
            .create(assignment)
            .then(res => {
                toast.success('New assignment created successfully');
                dispatch(success(res.data, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
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

function updateAssignment(assignment, clientId) {
    return dispatch => {
        dispatch(request(assignment));
        assignmentService
            .update(assignment)
            .then(res => {
                toast.success('Assignment updated successfully');
                dispatch(success(assignment, clientId, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(assignment) {
        return {
            type: assignmentConstants.UPDATE_ASSIGNMENT_REQUEST,
            assignment,
        };
    }
    function success(assignment, clientId, message) {
        return {
            type: assignmentConstants.UPDATE_ASSIGNMENT_SUCCESS,
            payload: { assignment, clientId, message },
        };
    }
    function failure(error) {
        return { type: assignmentConstants.UPDATE_ASSIGNMENT_FAILURE, error };
    }
}

function deleteAssignment(id) {
    return dispatch => {
        dispatch(request(id));
        assignmentService
            .delete(id)
            .then(res => {
                toast.success('Assignment deleted successfully');
                dispatch(success(id));
            })
            .catch(error => {
                dispatch(failure(error.message));
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
