import { diagnosisConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function diagnoses(state = initialState, action) {
    switch (action.type) {
        case diagnosisConstants.FETCH_DIAGNOSIS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case diagnosisConstants.FETCH_DIAGNOSIS_SUCCESS: {
            const newById = {
                ...state.byId,
                [action.diagnosis._id]: action.diagnosis,
            };
            return {
                ...state,
                isFetching: false,
                byId: newById,
            };
        }

        case diagnosisConstants.FETCH_DIAGNOSIS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case diagnosisConstants.CREATE_DIAGNOSIS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case diagnosisConstants.CREATE_DIAGNOSIS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [action.diagnosis._id]: { ...action.diagnosis },
                },
            };

        case diagnosisConstants.CREATE_DIAGNOSIS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case diagnosisConstants.UPDATE_DIAGNOSIS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case diagnosisConstants.UPDATE_DIAGNOSIS_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [action.diagnosis._id]: action.diagnosis,
                },
            };
        }

        case diagnosisConstants.UPDATE_DIAGNOSIS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}
