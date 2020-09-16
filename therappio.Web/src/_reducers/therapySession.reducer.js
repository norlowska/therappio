import { therapySessionConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function therapySessions(state = initialState, action) {
    switch (action.type) {
        case therapySessionConstants.FETCH_THERAPY_SESSIONS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapySessionConstants.FETCH_THERAPY_SESSIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: action.therapySessions.reduce(
                    (map, therapySession) => (
                        (map[therapySession._id] = therapySession), map
                    ),
                    {}
                ),
            };

        case therapySessionConstants.FETCH_THERAPY_SESSIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case therapySessionConstants.CREATE_THERAPY_SESSION_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapySessionConstants.CREATE_THERAPY_SESSION_SUCCESS: {
            const { therapySession } = action.payload;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [therapySession._id]: { ...therapySession },
                },
            };
        }

        case therapySessionConstants.CREATE_THERAPY_SESSION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case therapySessionConstants.UPDATE_THERAPY_SESSION_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapySessionConstants.UPDATE_THERAPY_SESSION_SUCCESS: {
            const { therapySession } = action.payload;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [therapySession._id]: therapySession,
                },
            };
        }
        case therapySessionConstants.UPDATE_THERAPY_SESSION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case therapySessionConstants.DELETE_THERAPY_SESSION_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case therapySessionConstants.DELETE_THERAPY_SESSION_SUCCESS:
            const { [action.payload.id]: omit, ...rest } = state.byId;
            return {
                ...state,
                isFetching: false,
                byId: rest,
            };
        case therapySessionConstants.DELETE_THERAPY_SESSION_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
