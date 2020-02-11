// import { history } from '../_helpers';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    getAll,
    // getById,
    getMoodRecords,
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
        dispatch(request());
        clientService
            .getMoodRecords(id)
            .then(records => {
                dispatch(success(records));
            })
            .catch(error => {
                dispatch(failure(error.message));
                // dispatch(alertActions.error(error.toString()));
            });
    };
    function request() {
        return { type: clientConstants.GET_MOOD_RECORDS_REQUEST };
    }
    function success(records) {
        return { type: clientConstants.GET_MOOD_RECORDS_SUCCESS, records };
    }
    function failure(error) {
        return { type: clientConstants.GET_MOOD_RECORDS_FAILURE, error };
    }
}

function create(user) {}

function update(user) {}
