import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as actions from '../actions/jobs';
import normalize from "json-api-normalizer";

const jobsInitialState = {
    initial: true,
    loading: false,
    success: false,
    error: false,
}

const jobsReducer = createReducer(jobsInitialState)
    .handleAction(actions.searchJobs.request, (state) => ({
        ...state,
        loading: true,
        initial: false,
    }))
    .handleAction(actions.searchJobs.success, (state, { payload, meta }) => ({
        ...state,
        ...normalize(payload, { endpoint: '/search-jobs' }),
        currentParams: meta,
        loading: false,
        success: true,
    }))
    .handleAction(actions.searchJobs.failure, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

export default combineReducers({
    jobs: jobsReducer,
})
