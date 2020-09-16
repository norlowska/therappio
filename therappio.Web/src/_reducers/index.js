import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { clients } from './client.reducer';
import { assignments } from './assignment.reducer';

const rootReducer = combineReducers({
    auth,
    clients,
    assignments,
});

export default rootReducer;
