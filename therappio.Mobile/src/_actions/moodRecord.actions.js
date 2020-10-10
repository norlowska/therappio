import { ToastAndroid } from 'react-native';
import { moodRecordConstants } from '../_constants';
import { moodRecordService } from '../_services';
import { modalActions } from './modal.actions';

export const moodRecordActions = {
  fetchMoodRecords,
  createMoodRecord,
  updateMoodRecord,
  deleteMoodRecord,
};

function fetchMoodRecords() {
  return dispatch => {
    dispatch(request());
    moodRecordService
      .getAll()
      .then(moodRecords => {
        dispatch(success(moodRecords));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        dispatch(failure(errorMsg));
      });
  };
  function request() {
    return { type: moodRecordConstants.FETCH_MOOD_RECORDS_REQUEST };
  }
  function success(moodRecords) {
    return {
      type: moodRecordConstants.FETCH_MOOD_RECORDS_SUCCESS,
      moodRecords,
    };
  }
  function failure(error) {
    return {
      type: moodRecordConstants.FETCH_MOOD_RECORDS_FAILURE,
      error,
    };
  }
}

function createMoodRecord(moodRecord) {
  return dispatch => {
    dispatch(request(moodRecord));
    moodRecordService
      .create(moodRecord)
      .then(res => {
        dispatch(success(res.data, res.message));
        dispatch(modalActions.hideModal());
        ToastAndroid.show('Mood record successfully created.', ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log(error.toString());
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        console.log(errorMsg);
        dispatch(failure(errorMsg));
      });
  };
  function request(moodRecord) {
    return {
      type: moodRecordConstants.CREATE_MOOD_RECORD_REQUEST,
      moodRecord,
    };
  }
  function success(moodRecord, message) {
    return {
      type: moodRecordConstants.CREATE_MOOD_RECORD_SUCCESS,
      payload: { moodRecord, message },
    };
  }
  function failure(error) {
    return {
      type: moodRecordConstants.CREATE_MOOD_RECORD_FAILURE,
      error,
    };
  }
}

function updateMoodRecord(moodRecord, patientId) {
  return dispatch => {
    dispatch(request(moodRecord));
    moodRecordService
      .update(moodRecord)
      .then(res => {
        dispatch(success(moodRecord, patientId, res.message));
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        dispatch(failure(errorMsg));
      });
  };
  function request(moodRecord) {
    return {
      type: moodRecordConstants.UPDATE_MOOD_RECORD_REQUEST,
      moodRecord,
    };
  }
  function success(moodRecord, patientId, message) {
    return {
      type: moodRecordConstants.UPDATE_MOOD_RECORD_SUCCESS,
      payload: { moodRecord, patientId, message },
    };
  }
  function failure(error) {
    return {
      type: moodRecordConstants.UPDATE_MOOD_RECORD_FAILURE,
      error,
    };
  }
}

function deleteMoodRecord(id) {
  return dispatch => {
    dispatch(request(id));
    moodRecordService
      .delete(id)
      .then(res => {
        dispatch(success(id));
        ToastAndroid.show('Mood record successfully deleted.', ToastAndroid.SHORT);
      })
      .catch(error => {
        let errorMsg = error.message;
        if (error.response && error.response.data) errorMsg = error.response.data;
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
        dispatch(failure(errorMsg));
      });
  };
  function request(id) {
    return {
      type: moodRecordConstants.DELETE_MOOD_RECORD_REQUEST,
      id,
    };
  }
  function success(id) {
    return {
      type: moodRecordConstants.DELETE_MOOD_RECORD_SUCCESS,
      id,
    };
  }
  function failure(error) {
    return {
      type: moodRecordConstants.DELETE_MOOD_RECORD_FAILURE,
      error,
    };
  }
}
