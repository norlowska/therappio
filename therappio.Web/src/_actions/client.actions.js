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

function create(user) {}

function update(user) {}
