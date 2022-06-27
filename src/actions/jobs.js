import { createAsyncAction } from "typesafe-actions";
import { Api } from "../utils/api-client";

export const searchJobs = createAsyncAction(
    'SEARCH_JOBS_REQUEST',
    'SEARCH_JOBS_SUCCESS',
    'SEARCH_JOBS_FAIL',
)();

export function searchJobsAsync(params) {
    return (dispatch) => {
        dispatch(searchJobs.request());

        if (params.search?.location) {
            const { search, ...rest } = params;
            return Api.getCoords({ query: search.location })
                .then((res) => {
                    const { latitude: lat, longitude: lon } = res.data.data[0];
                    return Api.searchJobs({ ...rest, search: { ...rest.search, location: `${lat},${lon}` } })
                        .then((res) => dispatch(searchJobs.success(res.data, params)))
                        .catch((error) => dispatch(searchJobs.failure(error)))
                })
        } else {
            return Api.searchJobs(params)
                .then((res) => dispatch(searchJobs.success(res.data, params)))
                .catch((error) => dispatch(searchJobs.failure(error)))
        }
    }
}
