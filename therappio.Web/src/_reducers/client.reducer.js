import { clientConstants } from '../_constants';
import { compareValues } from '../_helpers/compare';

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
                items: action.clients.sort(compareValues('lastName')),
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
                              therapySessions: action.payload.sessions.sort(
                                  compareValues('date', 'desc')
                              ),
                              assignments: action.payload.assignments.sort(
                                  compareValues('createdAt', 'desc')
                              ),
                              moodRecords: action.payload.moods.sort(
                                  compareValues('createdAt', 'desc')
                              ),
                              journalRecords: action.payload.journal.sort(
                                  compareValues('createdAt', 'desc')
                              ),
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
        case clientConstants.CREATE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.CREATE_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // update client with his mood records
                items: state.items.map(client => {
                    return client._id === action.payload.id
                        ? {
                              ...client,
                              assignments: [
                                  ...client.assignment,
                                  action.payload,
                              ],
                          }
                        : client;
                }),
            };
        case clientConstants.CREATE_ASSIGNMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case clientConstants.DELETE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case clientConstants.DELETE_ASSIGNMENT_SUCCESS:
            const client = state.items.find(client =>
                client.assignments.some(
                    assignment => assignment._id === action.id
                )
            );

            return {
                ...state,
                isFetching: false,
                items: state.items.map(item => {
                    return item._id === client._id
                        ? {
                              ...item,
                              assignments: item.assignments.filter(
                                  assignment => assignment._id !== action.id
                              ),
                          }
                        : item;
                }),
            };
        case clientConstants.DELETE_ASSIGNMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
