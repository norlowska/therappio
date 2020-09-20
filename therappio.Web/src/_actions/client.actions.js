// import { history } from '../_utilities';
import { toast } from 'react-toastify';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    fetchClients,
    create,
    update,
};

function fetchClients() {
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
        return { type: clientConstants.FETCH_CLIENTS_REQUEST };
    }
    function success(clients) {
        return { type: clientConstants.FETCH_CLIENTS_SUCCESS, clients };
    }
    function failure(error) {
        return { type: clientConstants.FETCH_CLIENTS_FAILURE, error };
    }
}

function create(client) {
    return dispatch => {
        dispatch(request());
        clientService
            .create({ ...client, role: 'Client' })
            .then(res => {
                dispatch(success(res.data.client));
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
    };
    function request() {
        return { type: clientConstants.CREATE_CLIENT_REQUEST };
    }
    function success(client) {
        return { type: clientConstants.CREATE_CLIENT_SUCCESS, client };
    }
    function failure(error) {
        return { type: clientConstants.CREATE_CLIENT_FAILURE, error };
    }
}

function update(client) {
    return dispatch => {
        dispatch(request());
        clientService
            .update(client)
            .then(res => {
                dispatch(success(res.data.client));
            })
            .catch(error => {
                dispatch(failure(error.message));
            });
    };
    function request() {
        return { type: clientConstants.UPDATE_CLIENT_REQUEST };
    }
    function success(client) {
        return { type: clientConstants.UPDATE_CLIENT_SUCCESS, client };
    }
    function failure(error) {
        return { type: clientConstants.UPDATE_CLIENT_FAILURE, error };
    }
}
