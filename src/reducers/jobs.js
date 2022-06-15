import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

const jobsReducer = createReducer({});

export default combineReducers({
    jobs: jobsReducer,
})
