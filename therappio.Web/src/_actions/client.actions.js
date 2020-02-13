// import { history } from '../_helpers';
import { clientConstants } from '../_constants';
import { clientService } from '../_services';

export const clientActions = {
    getAll,
    // getById,
    getDetails,
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
