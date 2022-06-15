import axios from 'axios';
import { stringify } from 'qs';

axios.defaults.baseURL = 'https://staging-api.joblocal.de/v4';
axios.defaults.paramsSerializer = (params) => stringify(params, { arrayFormat: 'comma' });

export const Api = {
    searchJobs(params) {
        return axios.get('/search-jobs', params);
    }
}
