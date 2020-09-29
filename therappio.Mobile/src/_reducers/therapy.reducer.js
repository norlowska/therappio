import { therapyConstants } from '../_constants';

const initialState = {
  isFetching: false,
  byId: {},
  errorMessage: '',
};

export function therapies(state = initialState, action) {
  switch (action.type) {
    case therapyConstants.FETCH_THERAPY_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case therapyConstants.FETCH_THERAPY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: action.therapies.reduce((map, therapy) => ((map[therapy._id] = therapy), map), {}),
      };

    case therapyConstants.FETCH_THERAPY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
}
