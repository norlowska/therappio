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
          (map, assignment) => ((map[assignment._id] = assignment), map),
          {}
        ),
      };

    case assignmentConstants.FETCH_ASSIGNMENTS_FAILURE:
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
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.assignment._id]: action.assignment,
        },
      };
    }
    case assignmentConstants.UPDATE_ASSIGNMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
