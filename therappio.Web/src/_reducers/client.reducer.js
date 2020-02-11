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
        case clientConstants.GET_MOOD_RECORDS_SUCCESS: {
            const index = state.items.findIndex(
                client => client._id === action.records[0].client._id
            );

            return {
                ...state,
                isFetching: false,
                // update client with his mood records
                items: [
                    ...state.items.slice(0, index),
                    {
                        ...state.items[index],
                        moodRecords: action.records,
                    },
                    ...state.items.slice(index + 1),
                ],
            };
        }
        case clientConstants.GET_MOOD_RECORDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
