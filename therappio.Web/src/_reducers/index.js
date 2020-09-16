import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { clients } from './client.reducer';
import { assignments } from './assignment.reducer';
import { therapySessions } from './therapySession.reducer';

const rootReducer = combineReducers({
    auth,
    clients,
    assignments,
    therapySessions,
});

export default rootReducer;
