import { clientConstants } from '../_constants';

const initialState = {
    isFetching: false,
    items: [],
    errorMessage: '',
};

export function clients(state = initialState, action) {
    switch (action.type) {
        case clientConstants.GET_ALL_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_ALL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.clients,
            };
        case clientConstants.GET_ALL_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case clientConstants.GET_DETAILS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his mood records
                items: state.items.map(client => {
                    return client._id === action.payload.id
                        ? {
                              ...client,
                              therapySessions: action.payload.sessions,
                              assignments: action.payload.assignments,
                              moodRecords: action.payload.moods,
                              journalRecords: action.payload.journal,
                          }
                        : client;
                }),
            };

        case clientConstants.GET_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}
