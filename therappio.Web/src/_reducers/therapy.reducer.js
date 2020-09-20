import { therapyConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function therapies(state = initialState, action) {
    switch (action.type) {
        case therapyConstants.FETCH_THERAPIES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapyConstants.FETCH_THERAPIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: action.therapies.reduce(
                    (map, therapy) => ((map[therapy._id] = therapy), map),
                    {}
                ),
            };

        case therapyConstants.FETCH_THERAPIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case therapyConstants.CREATE_THERAPY_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapyConstants.CREATE_THERAPY_SUCCESS: {
            const { therapy } = action;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [therapy._id]: { ...therapy },
                },
            };
        }

        case therapyConstants.CREATE_THERAPY_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case therapyConstants.UPDATE_THERAPY_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapyConstants.UPDATE_THERAPY_SUCCESS: {
            const { therapy } = action;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [therapy._id]: therapy,
                },
            };
        }
        case therapyConstants.UPDATE_THERAPY_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}
