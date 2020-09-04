// import { history } from '../_utilities';
import { toast } from 'react-toastify';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    getAll,
    // getById,
    getDetails,
    create,
    update,
    createAssignment,
    updateAssignment,
    deleteAssignment,
};

function getAll() {
    return dispatch => {
        dispatch(request());
        clientService
            .getAll()
            .then(clients => {
                dispatch(success(clients));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: clientConstants.GET_ALL_REQUEST };
    }
    function success(clients) {
        return { type: clientConstants.GET_ALL_SUCCESS, clients };
    }
    function failure(error) {
        return { type: clientConstants.GET_ALL_FAILURE, error };
    }
}

function getDetails(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .getDetails(id)
            .then(details => {
                if (
                    Object.keys(details).length === 0 &&
                    details.constructor === Object
                ) {
                    throw new Error("Error requesting all client's details");
                }
                dispatch(success(details, id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: clientConstants.GET_DETAILS_REQUEST, id };
    }
    function success({ sessions, assignments, moods, journal }, id) {
        return {
            type: clientConstants.GET_DETAILS_SUCCESS,
            payload: { sessions, assignments, moods, journal, id },
        };
    }
    function failure(error) {
        return { type: clientConstants.GET_DETAILS_FAILURE, error };
    }
}

// function getById(id) {}

function create(user) {}

function update(user) {}

function createAssignment(assignment) {
    return dispatch => {
        dispatch(request(assignment));
        clientService
            .createAssignment(assignment)
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
        return { type: clientConstants.CREATE_ASSIGNMENT_REQUEST, assignment };
    }
    function success(assignment, message) {
        return {
            type: clientConstants.CREATE_ASSIGNMENT_SUCCESS,
            payload: { assignment, message },
        };
    }
    function failure(error) {
        return { type: clientConstants.CREATE_ASSIGNMENT_FAILURE, error };
    }
}

function updateAssignment(assignment, clientId) {
    return dispatch => {
        dispatch(request(assignment));
        clientService
            .updateAssignment(assignment)
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
        return { type: clientConstants.UPDATE_ASSIGNMENT_REQUEST, assignment };
    }
    function success(assignment, clientId, message) {
        return {
            type: clientConstants.UPDATE_ASSIGNMENT_SUCCESS,
            payload: { assignment, clientId, message },
        };
    }
    function failure(error) {
        return { type: clientConstants.UPDATE_ASSIGNMENT_FAILURE, error };
    }
}

function deleteAssignment(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .deleteAssignment(id)
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
        return { type: clientConstants.DELETE_ASSIGNMENT_REQUEST, id };
    }
    function success(id) {
        return {
            type: clientConstants.DELETE_ASSIGNMENT_SUCCESS,
            id,
        };
    }
    function failure(error) {
        return { type: clientConstants.DELETE_ASSIGNMENT_FAILURE, error };
    }
}
