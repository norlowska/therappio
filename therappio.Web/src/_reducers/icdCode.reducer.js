import { icdCodeConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function icdCode(state = initialState, action) {
    switch (action.type) {
        case icdCodeConstants.FETCH_CODES_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case icdCodeConstants.FETCH_CODES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    ...action.diagnoses.reduce(
                        (map, diagnosis) => (
                            (map[diagnosis.fullCode] = diagnosis), map
                        ),
                        {}
                    ),
                },
            };

        case icdCodeConstants.FETCH_CODES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}
