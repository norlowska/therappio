import { toast } from 'react-toastify';
import { therapyConstants } from '../_constants';
import { therapyService } from '../_services';

export const therapyActions = {
    fetchTherapies: fetchTherapistsTherapies,
    createTherapy,
    updateTherapy,
};

function fetchTherapistsTherapies(therapistId) {
    return dispatch => {
        dispatch(request(therapistId));
        therapyService
            .getAll(therapistId, 'therapist')
            .then(res => {
                dispatch(success(res.therapies));
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
    };
    function request() {
        return { type: therapyConstants.FETCH_THERAPIES_REQUEST };
    }
    function success(therapies) {
        return {
            type: therapyConstants.FETCH_THERAPIES_SUCCESS,
            therapies,
        };
    }
    function failure(error) {
        return {
            type: therapyConstants.FETCH_THERAPIES_FAILURE,
            error,
        };
    }
}

function createTherapy(therapy) {
    return dispatch => {
        dispatch(request(therapy));
        therapyService
            .create(therapy)
            .then(res => {
                dispatch(success(res.therapy, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(therapy) {
        return {
            type: therapyConstants.CREATE_THERAPY_REQUEST,
            therapy,
        };
    }
    function success(therapy, message) {
        return {
            type: therapyConstants.CREATE_THERAPY_SUCCESS,
            therapy,
            message,
        };
    }
    function failure(error) {
        return {
            type: therapyConstants.CREATE_THERAPY_FAILURE,
            error,
        };
    }
}

function updateTherapy(therapy, therapyId) {
    return dispatch => {
        dispatch(request(therapyId, therapy));
        therapyService
            .update(therapy)
            .then(res => {
                toast.success('Therapy updated successfully');
                dispatch(success(res.therapy, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(therapy, id) {
        return {
            type: therapyConstants.UPDATE_THERAPY_REQUEST,
            therapy,
            id,
        };
    }
    function success(therapy, message) {
        return {
            type: therapyConstants.UPDATE_THERAPY_SUCCESS,
            therapy,
            message,
        };
    }
    function failure(error) {
        return {
            type: therapyConstants.UPDATE_THERAPY_FAILURE,
            error,
        };
    }
}
