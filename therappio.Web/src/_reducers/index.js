import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { patients } from './patient.reducer';
import { assignments } from './assignment.reducer';
import { therapySessions } from './therapySession.reducer';
import { journalRecords } from './journalRecord.reducer';
import { moodRecords } from './moodRecord.reducer';
import { diagnoses } from './diagnosis.reducer';
import { therapies } from './therapy.reducer';

const rootReducer = combineReducers({
    auth,
    patients,
    assignments,
    therapySessions,
    journalRecords,
    moodRecords,
    diagnoses,
    therapies,
});

export default rootReducer;
