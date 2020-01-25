import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { clients } from './client.reducer';

const rootReducer = combineReducers({
    auth,
    clients,
});

export default rootReducer;
