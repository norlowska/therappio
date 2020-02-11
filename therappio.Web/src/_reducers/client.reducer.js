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
        case clientConstants.GET_MOOD_RECORDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_MOOD_RECORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his mood records
                items: state.items.map(client =>
                    client._id === action.id
                        ? { ...client, moodRecords: action.records }
                        : client
                ),
            };

        case clientConstants.GET_MOOD_RECORDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case clientConstants.GET_JOURNAL_RECORDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_JOURNAL_RECORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his journal records
                items: state.items.map(client =>
                    client._id === action.id
                        ? { ...client, journalRecords: action.records }
                        : client
                ),
            };

        case clientConstants.GET_JOURNAL_RECORDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case clientConstants.GET_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his therapy sessions
                items: state.items.map(client =>
                    client._id === action.id
                        ? { ...client, assignments: action.assignments }
                        : client
                ),
            };

        case clientConstants.GET_ASSIGNMENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case clientConstants.GET_THERAPY_SESSIONS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.GET_THERAPY_SESSIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his therapy sessions
                items: state.items.map(client =>
                    client._id === action.id
                        ? { ...client, therapySessions: action.sessions }
                        : client
                ),
            };

        case clientConstants.GET_THERAPY_SESSIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
