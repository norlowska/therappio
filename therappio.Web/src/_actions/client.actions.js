// import { history } from '../_helpers';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    getAll,
    // getById,
    getMoodRecords,
    getJournalRecords,
    getAssignments,
    getTherapySessions,
    create,
    update,
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

function getMoodRecords(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .getMoodRecords(id)
            .then(records => {
                dispatch(success(records, id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: clientConstants.GET_MOOD_RECORDS_REQUEST, id };
    }
    function success(records, id) {
        return { type: clientConstants.GET_MOOD_RECORDS_SUCCESS, records, id };
    }
    function failure(error) {
        return { type: clientConstants.GET_MOOD_RECORDS_FAILURE, error };
    }
}

function getJournalRecords(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .getJournalRecords(id)
            .then(records => {
                dispatch(success(records, id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: clientConstants.GET_JOURNAL_RECORDS_REQUEST, id };
    }
    function success(records, id) {
        return {
            type: clientConstants.GET_JOURNAL_RECORDS_SUCCESS,
            records,
            id,
        };
    }
    function failure(error) {
        return { type: clientConstants.GET_JOURNAL_RECORDS_FAILURE, error };
    }
}

function getAssignments(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .getAssignments(id)
            .then(assignments => {
                dispatch(success(assignments, id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: clientConstants.GET_ASSIGNMENTS_REQUEST, id };
    }
    function success(assignments, id) {
        return {
            type: clientConstants.GET_ASSIGNMENTS_SUCCESS,
            assignments,
            id,
        };
    }
    function failure(error) {
        return { type: clientConstants.GET_ASSIGNMENTS_FAILURE, error };
    }
}

function getTherapySessions(id) {
    return dispatch => {
        dispatch(request(id));
        clientService
            .getTherapySessions(id)
            .then(sessions => {
                dispatch(success(sessions, id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return { type: clientConstants.GET_THERAPY_SESSIONS_REQUEST, id };
    }
    function success(sessions, id) {
        return {
            type: clientConstants.GET_THERAPY_SESSIONS_SUCCESS,
            sessions,
            id,
        };
    }
    function failure(error) {
        return { type: clientConstants.GET_THERAPY_SESSIONS_FAILURE, error };
    }
}

// function getById(id) {}

function create(user) {}

function update(user) {}
