import { toast } from 'react-toastify';
import { diagnosisConstants } from '../_constants';
import { diagnosisService } from '../_services';
import { history } from '../_utilities';

export const diagnosisActions = {
    fetchDiagnosis,
    createDiagnosis,
    updateDiagnosis,
};

function fetchDiagnosis(id) {
    return dispatch => {
        dispatch(request());
        diagnosisService
            .getById(id)
            .then(diagnosis => {
                dispatch(success(diagnosis));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: diagnosisConstants.FETCH_DIAGNOSIS_REQUEST };
    }
    function success(diagnosis) {
        return {
            type: diagnosisConstants.FETCH_DIAGNOSIS_SUCCESS,
            diagnosis,
        };
    }
    function failure(error) {
        return { type: diagnosisConstants.FETCH_DIAGNOSIS_FAILURE, error };
    }
}

function createDiagnosis(clientId) {
    return dispatch => {
        dispatch(request());
        diagnosisService
            .create(clientId)
            .then(res => {
                dispatch(success(res.data, res.message));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return {
            type: diagnosisConstants.CREATE_DIAGNOSIS_REQUEST,
        };
    }
    function success(diagnosis, message) {
        return {
            type: diagnosisConstants.CREATE_DIAGNOSIS_SUCCESS,
            diagnosis,
        };
    }
    function failure(error) {
        return { type: diagnosisConstants.CREATE_DIAGNOSIS_FAILURE, error };
    }
}

function updateDiagnosis(diagnosis) {
    return dispatch => {
        dispatch(request(diagnosis));
        diagnosisService
            .update(diagnosis)
            .then(res => {
                dispatch(
                    success(res.diagnosis, res.diagnosis.client, res.message)
                );
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request(diagnosis) {
        return {
            type: diagnosisConstants.UPDATE_DIAGNOSIS_REQUEST,
            diagnosis,
        };
    }
    function success(diagnosis) {
        return {
            type: diagnosisConstants.UPDATE_DIAGNOSIS_SUCCESS,
            diagnosis,
        };
    }
    function failure(error) {
        return { type: diagnosisConstants.UPDATE_DIAGNOSIS_FAILURE, error };
    }
}
