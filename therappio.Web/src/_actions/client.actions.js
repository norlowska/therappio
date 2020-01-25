// import { history } from '../_helpers';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    getAll,
    getById,
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
        return { type: clientConstants.GETALL_REQUEST };
    }
    function success(clients) {
        return { type: clientConstants.GETALL_SUCCESS, clients };
    }
    function failure(error) {
        return { type: clientConstants.GETALL_FAILURE, error };
    }
}

function getById(id) {}

function create(user) {}

function update(user) {}
