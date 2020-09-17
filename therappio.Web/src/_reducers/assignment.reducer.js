import { assignmentConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function assignments(state = initialState, action) {
    switch (action.type) {
        case assignmentConstants.FETCH_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case assignmentConstants.FETCH_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: action.assignments.reduce(
                    (map, assignment) => (
                        (map[assignment._id] = assignment), map
                    ),
                    {}
                ),
            };

        case assignmentConstants.FETCH_ASSIGNMENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case assignmentConstants.CREATE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case assignmentConstants.CREATE_ASSIGNMENT_SUCCESS: {
            const { assignment } = action.payload;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [assignment._id]: { ...assignment },
                },
            };
        }

        case assignmentConstants.CREATE_ASSIGNMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case assignmentConstants.UPDATE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case assignmentConstants.UPDATE_ASSIGNMENT_SUCCESS: {
            const assignment = action.payload.assignment;

            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [assignment._id]: assignment,
                },
            };
        }
        case assignmentConstants.UPDATE_ASSIGNMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case assignmentConstants.DELETE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case assignmentConstants.DELETE_ASSIGNMENT_SUCCESS: {
            const { [action.payload.id]: omit, ...rest } = state.byId;
            return {
                ...state,
                isFetching: false,
                byId: rest,
            };
        }

        case assignmentConstants.DELETE_ASSIGNMENT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
