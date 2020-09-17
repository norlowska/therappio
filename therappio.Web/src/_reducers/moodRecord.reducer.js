import { moodRecordConstants } from '../_constants';

const initialState = {
    isFetching: false,
    byId: {},
    errorMessage: '',
};

export function moodRecords(state = initialState, action) {
    switch (action.type) {
        case moodRecordConstants.FETCH_MOOD_RECORDS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case moodRecordConstants.FETCH_MOOD_RECORDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                byId: action.moodRecords.reduce(
                    (map, moodRecord) => (
                        (map[moodRecord._id] = moodRecord), map
                    ),
                    {}
                ),
            };

        case moodRecordConstants.FETCH_MOOD_RECORDS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case moodRecordConstants.CREATE_MOOD_RECORD_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case moodRecordConstants.CREATE_MOOD_RECORD_SUCCESS: {
            const { moodRecord } = action.payload;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [moodRecord._id]: { ...moodRecord },
                },
            };
        }

        case moodRecordConstants.CREATE_MOOD_RECORD_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        case moodRecordConstants.UPDATE_MOOD_RECORD_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case moodRecordConstants.UPDATE_MOOD_RECORD_SUCCESS: {
            const { moodRecord } = action.payload;
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [moodRecord._id]: moodRecord,
                },
            };
        }
        case moodRecordConstants.UPDATE_MOOD_RECORD_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };

        case moodRecordConstants.DELETE_MOOD_RECORD_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case moodRecordConstants.DELETE_MOOD_RECORD_SUCCESS:
            const { [action.payload.id]: omit, ...rest } = state.byId;
            return {
                ...state,
                isFetching: false,
                byId: rest,
            };
        case moodRecordConstants.DELETE_MOOD_RECORD_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
            };
        default:
            return state;
    }
}
