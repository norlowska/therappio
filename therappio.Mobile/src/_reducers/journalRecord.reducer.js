import { journalRecordConstants } from '../_constants';

const initialState = {
  isFetching: false,
  byId: {},
  errorMessage: '',
};

export function journalRecords(state = initialState, action) {
  switch (action.type) {
    case journalRecordConstants.FETCH_JOURNAL_RECORDS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case journalRecordConstants.FETCH_JOURNAL_RECORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: action.journalRecords.reduce(
          (map, journalRecord) => ((map[journalRecord._id] = journalRecord), map),
          {}
        ),
      };

    case journalRecordConstants.FETCH_JOURNAL_RECORDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };

    case journalRecordConstants.CREATE_JOURNAL_RECORD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case journalRecordConstants.CREATE_JOURNAL_RECORD_SUCCESS: {
      const { journalRecord } = action.payload;
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [journalRecord._id]: { ...journalRecord },
        },
      };
    }

    case journalRecordConstants.CREATE_JOURNAL_RECORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };
    case journalRecordConstants.UPDATE_JOURNAL_RECORD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case journalRecordConstants.UPDATE_JOURNAL_RECORD_SUCCESS: {
      const { journalRecord } = action.payload;
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [journalRecord._id]: journalRecord,
        },
      };
    }
    case journalRecordConstants.UPDATE_JOURNAL_RECORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };

    case journalRecordConstants.DELETE_JOURNAL_RECORD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case journalRecordConstants.DELETE_JOURNAL_RECORD_SUCCESS:
      const { [action.id]: omit, ...rest } = state.byId;
      return {
        ...state,
        isFetching: false,
        byId: rest,
      };
    case journalRecordConstants.DELETE_JOURNAL_RECORD_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}
