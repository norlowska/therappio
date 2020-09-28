// import { history } from '../_utilities';
import { toast } from 'react-toastify';
import { patientConstants } from '../_constants';
import { patientService } from '../_services';

export const patientActions = {
    fetchPatients,
    create,
    update,
};

function fetchPatients() {
    return dispatch => {
        dispatch(request());
        patientService
            .getAll()
            .then(patients => {
                dispatch(success(patients));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: patientConstants.FETCH_CLIENTS_REQUEST };
    }
    function success(patients) {
        return { type: patientConstants.FETCH_CLIENTS_SUCCESS, patients };
    }
    function failure(error) {
        return { type: patientConstants.FETCH_CLIENTS_FAILURE, error };
    }
}

function create(patient) {
    return dispatch => {
        dispatch(request());
        patientService
            .create({ ...patient, role: 'Patient' })
            .then(res => {
                dispatch(success(res.data.patient));
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
    };
    function request() {
        return { type: patientConstants.CREATE_CLIENT_REQUEST };
    }
    function success(patient) {
        return { type: patientConstants.CREATE_CLIENT_SUCCESS, patient };
    }
    function failure(error) {
        return { type: patientConstants.CREATE_CLIENT_FAILURE, error };
    }
}

function update(patient) {
    return dispatch => {
        dispatch(request());
        patientService
            .update(patient)
            .then(res => {
                dispatch(success(res.data.patient));
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
    };
    function request() {
        return { type: patientConstants.UPDATE_CLIENT_REQUEST };
    }
    function success(patient) {
        return { type: patientConstants.UPDATE_CLIENT_SUCCESS, patient };
    }
    function failure(error) {
        return { type: patientConstants.UPDATE_CLIENT_FAILURE, error };
    }
}
