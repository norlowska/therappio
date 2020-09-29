import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { assignments } from './assignment.reducer';
import { journalRecords } from './journalRecord.reducer';
import { moodRecords } from './moodRecord.reducer';
import { therapies } from './therapy.reducer';

const rootReducer = combineReducers({
  auth,
  // assignments,
  // journalRecords,
  // moodRecords,
  // therapies,
});

export default rootReducer;
