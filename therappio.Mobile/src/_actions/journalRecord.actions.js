import { journalRecordConstants } from '../_constants';
import { journalRecordService } from '../_services';
import { modalActions } from './modal.actions';

export const journalRecordActions = {
  fetchJournalRecords,
  createJournalRecord,
  updateJournalRecord,
  deleteJournalRecord,
};

function fetchJournalRecords() {
  return dispatch => {
    dispatch(request());
    journalRecordService
      .getAll()
      .then(journalRecords => {
        dispatch(success(journalRecords));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
        // dispatch(alertActions.error(error.toString()));
      });
  };
  function request() {
    return { type: journalRecordConstants.FETCH_JOURNAL_RECORDS_REQUEST };
  }
  function success(journalRecords) {
    return {
      type: journalRecordConstants.FETCH_JOURNAL_RECORDS_SUCCESS,
      journalRecords,
    };
  }
  function failure(error) {
    return {
      type: journalRecordConstants.FETCH_JOURNAL_RECORDS_FAILURE,
      error,
    };
  }
}

function createJournalRecord(journalRecord) {
  return dispatch => {
    dispatch(request(journalRecord));
    journalRecordService
      .create(journalRecord)
      .then(res => {
        dispatch(success(res.data, res.message));
        dispatch(modalActions.hideModal());
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
        // dispatch(alertActions.error(error.toString()));
      });
  };
  function request(journalRecord) {
    return {
      type: journalRecordConstants.CREATE_JOURNAL_RECORD_REQUEST,
      journalRecord,
    };
  }
  function success(journalRecord, message) {
    return {
      type: journalRecordConstants.CREATE_JOURNAL_RECORD_SUCCESS,
      payload: { journalRecord, message },
    };
  }
  function failure(error) {
    return {
      type: journalRecordConstants.CREATE_JOURNAL_RECORD_FAILURE,
      error,
    };
  }
}

function updateJournalRecord(journalRecord) {
  console.log('update journal record action', journalRecord);
  return dispatch => {
    dispatch(request(journalRecord));
    journalRecordService
      .update(journalRecord)
      .then(res => {
        console.log('update journal record action success');
        dispatch(success(res.data, res.message));
        dispatch(modalActions.hideModal());
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
        // dispatch(alertActions.error(error.toString()));
      });
  };
  function request(journalRecord) {
    return {
      type: journalRecordConstants.UPDATE_JOURNAL_RECORD_REQUEST,
      journalRecord,
    };
  }
  function success(journalRecord, message) {
    return {
      type: journalRecordConstants.UPDATE_JOURNAL_RECORD_SUCCESS,
      payload: { journalRecord, message },
    };
  }
  function failure(error) {
    return {
      type: journalRecordConstants.UPDATE_JOURNAL_RECORD_FAILURE,
      error,
    };
  }
}

function deleteJournalRecord(id) {
  return dispatch => {
    dispatch(request(id));
    journalRecordService
      .delete(id)
      .then(res => {
        toast.success('Journal record deleted successfully');
        dispatch(success(id));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
        // dispatch(alertActions.error(error.toString()));
      });
  };
  function request(id) {
    return {
      type: journalRecordConstants.DELETE_JOURNAL_RECORD_REQUEST,
      id,
    };
  }
  function success(id) {
    return {
      type: journalRecordConstants.DELETE_JOURNAL_RECORD_SUCCESS,
      id,
    };
  }
  function failure(error) {
    return {
      type: journalRecordConstants.DELETE_JOURNAL_RECORD_FAILURE,
      error,
    };
  }
}
