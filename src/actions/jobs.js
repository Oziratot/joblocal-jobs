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

        if (params.location) {
            const { location, ...rest } = params;
            Api.getCoords({ query: location })
                .then((res) => {
                    const { latitude: lat, longitude: lon } = res.data.data[0];
                    Api.searchJobs({ location: `${lat},${lon}`, ...rest })
                        .then((res) => dispatch(searchJobs.success(res.data. params)))
                        .catch((error) => dispatch(searchJobs.failure(error)))
                })
        } else {
            Api.searchJobs(params)
                .then((res) => dispatch(searchJobs.success(res.data, params)))
                .catch((error) => dispatch(searchJobs.failure(error)))
        }
    }
}
