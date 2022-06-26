import axios from 'axios';
import { stringify } from 'qs';

axios.defaults.baseURL = 'https://staging-api.joblocal.de/v4';
axios.defaults.paramsSerializer = (params) => stringify(params, { arrayFormat: 'comma' });

export const Api = {
    searchJobs(params) {
        // const filters = Object.entries(params.filters).reduce((acc, [key, value]) => ({
        //     ...acc,
        //     [`filter.${key}`]: value,
        // }), {});
        return axios.get('/search-jobs', {
            params: {
                // just three filters for example
                include: ["search-job-results", "facet-qualifications", "facet-employment-types", "facet-working-times"],
                'search.query': params.search ?? undefined,
                'search.location': params.location ?? undefined,
                'filter.radius': params.radius,
                'page.number': params.page,
                ...(params.filter && { 'filter.working_time': params.filter.working_time }),
                ...(params.filter && { 'filter.qualification': params.filter.qualification }),
                ...(params.filter && { 'filter.employment_type': params.filter.employment_type }),
            }
        });
    },

    getCoords(params) {
        return axios.get('/forward', {
            baseURL: 'http://api.positionstack.com/v1',
            params: {
                access_key: "2d4b4b1dd6905589b6700f0ea633cd3a",
                query: params.query,
            }
        })
    }
}
