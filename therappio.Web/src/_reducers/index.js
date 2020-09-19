import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { clients } from './client.reducer';
import { assignments } from './assignment.reducer';
import { therapySessions } from './therapySession.reducer';
import { journalRecords } from './journalRecord.reducer';
import { moodRecords } from './moodRecord.reducer';
import { diagnoses } from './diagnosis.reducer';

const rootReducer = combineReducers({
    auth,
    clients,
    assignments,
    therapySessions,
    journalRecords,
    moodRecords,
    diagnoses,
});

export default rootReducer;
