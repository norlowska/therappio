import { clientConstants } from '../_constants';

const initialState = {
    isFetching: false,
    items: [],
    errorMessage: '',
};

export function clients(state = initialState, action) {
    switch (action.type) {
        case clientConstants.GETALL_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GETALL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.clients,
            };
        case clientConstants.GETALL_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}
