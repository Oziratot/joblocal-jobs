import React, { memo, useEffect, useMemo } from "react";
import { searchJobsAsync } from "../../actions/jobs";
import { useDispatch, useSelector } from "react-redux";
import Job from "../Job/Job";
import PropTypes from "prop-types";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Button/Spinner";
import Checkbox from "../Checkbox/Checkbox";

const endpoint = '/search-jobs'

function PageJobsLoading(props) {
    const dispatch = useDispatch();
    const jobResultsById = useSelector((state) => state.jobs.jobs.searchJobResults);

    useEffect(() => {
        if (!jobResultsById) {
            dispatch(searchJobsAsync({}));
        }
    }, []);

    if (!jobResultsById) {
        return (
            <div className="loader">
                <Spinner />
            </div>
        )
    }

    return <PageJobs {...props} jobResultsById={jobResultsById} />
}

function PageJobs({ match, history, jobResultsById }) {
    const jobs = useSelector((state) => state.jobs.jobs);
    const { facetWorkingTimes, facetQualifications, facetEmploymentTypes } = jobs;
    const meta = useSelector((state) => state.jobs.jobs.meta);
    const paginationInfo = useMemo(() => {
        if (meta) {
            return {
                pagination: meta[endpoint].meta.pagination,
                links: meta[endpoint].links,
            };
        } else {
            return {}
        }
    }, [meta]);

    const { pagination } = paginationInfo;

    const jobResults = useMemo(() => {
        if (jobResultsById) {
            return Object.values(jobResultsById);
        } else {
            return [];
        }
    }, [jobResultsById]);

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="section-content">
                        <div className="filters-container">
                            <Checkbox onChange={() => {}} value="1" label="ppp" />
                        </div>
                        <div className="flex-container column">
                            <h2 className="page-title">{`${pagination?.total} jobs found`}</h2>
                            <ul className="jobs-list">
                                {jobResults.map(({ id, attributes }) => (
                                    <li key={id}>
                                        <Job match={match} history={history} attributes={attributes} />
                                    </li>
                                ))}
                            </ul>
                            {/*<Pagination paginationInfo={paginationInfo} />*/}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

PageJobs.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    jobResultsById: PropTypes.object,
}

export default memo(PageJobsLoading);
