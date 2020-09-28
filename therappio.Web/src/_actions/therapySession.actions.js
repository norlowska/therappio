import { toast } from 'react-toastify';
import { therapySessionConstants } from '../_constants';
import { therapySessionService } from '../_services';

export const therapySessionActions = {
    fetchTherapySessions,
    create: createTherapySession,
    update: updateTherapySession,
    deleteTherapySession,
};

function fetchTherapySessions() {
    return dispatch => {
        dispatch(request());
        therapySessionService
            .getAll()
            .then(therapySessions => {
                dispatch(success(therapySessions));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: therapySessionConstants.FETCH_THERAPY_SESSIONS_REQUEST };
    }
    function success(therapySessions) {
        return {
            type: therapySessionConstants.FETCH_THERAPY_SESSIONS_SUCCESS,
            therapySessions,
        };
    }
    function failure(error) {
        return {
            type: therapySessionConstants.FETCH_THERAPY_SESSIONS_FAILURE,
            error,
        };
    }
}

function createTherapySession(therapySession) {
    return dispatch => {
        dispatch(request(therapySession));
        therapySessionService
            .create(therapySession)
            .then(res => {
                // toast.success('New therapy session created successfully');
                dispatch(success(res.session, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(therapySession) {
        return {
            type: therapySessionConstants.CREATE_THERAPY_SESSION_REQUEST,
            therapySession,
        };
    }
    function success(therapySession, message) {
        return {
            type: therapySessionConstants.CREATE_THERAPY_SESSION_SUCCESS,
            therapySession,
            message,
        };
    }
    function failure(error) {
        return {
            type: therapySessionConstants.CREATE_THERAPY_SESSION_FAILURE,
            error,
        };
    }
}

function updateTherapySession(therapySession, patientId) {
    return dispatch => {
        dispatch(request(therapySession));
        therapySessionService
            .update(therapySession)
            .then(res => {
                toast.success('Therapy session updated successfully');
                dispatch(success(res.session, patientId, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(therapySession) {
        return {
            type: therapySessionConstants.UPDATE_THERAPY_SESSION_REQUEST,
            therapySession,
        };
    }
    function success(therapySession, patientId, message) {
        return {
            type: therapySessionConstants.UPDATE_THERAPY_SESSION_SUCCESS,
            therapySession,
            patientId,
            message,
        };
    }
    function failure(error) {
        return {
            type: therapySessionConstants.UPDATE_THERAPY_SESSION_FAILURE,
            error,
        };
    }
}

function deleteTherapySession(id) {
    return dispatch => {
        dispatch(request(id));
        therapySessionService
            .delete(id)
            .then(res => {
                toast.success('Therapy session deleted successfully');
                dispatch(success(id));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(id) {
        return {
            type: therapySessionConstants.DELETE_THERAPY_SESSION_REQUEST,
            id,
        };
    }
    function success(id) {
        return {
            type: therapySessionConstants.DELETE_THERAPY_SESSION_SUCCESS,
            id,
        };
    }
    function failure(error) {
        return {
            type: therapySessionConstants.DELETE_THERAPY_SESSION_FAILURE,
            error,
        };
    }
}
