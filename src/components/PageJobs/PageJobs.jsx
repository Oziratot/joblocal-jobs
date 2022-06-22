import React, { memo, useEffect, useMemo, useRef, useState } from "react";
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
    const dispatch = useDispatch();
    const isMountedRef = useRef(false);
    const jobs = useSelector((state) => state.jobs.jobs);
    const { facetWorkingTimes, facetQualifications, facetEmploymentTypes, meta, currentParams } = jobs;
    const pagination = useMemo(() =>  meta[endpoint].meta.pagination, [meta]);
    const [currentPage, setCurrentPage] = useState(pagination.currentPage);

    const jobResults = useMemo(() => {
        if (jobResultsById) {
            return Object.values(jobResultsById);
        } else {
            return [];
        }
    }, [jobResultsById]);

    useEffect(() => {
        if (isMountedRef.current) {
            dispatch(searchJobsAsync({
                ...currentParams,
                page: currentPage,
            }))
        }

        isMountedRef.current = true;
    }, [currentPage]);

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
                            <Pagination
                                onPageChange={setCurrentPage}
                                totalPages={pagination.totalPages}
                                currentPage={pagination.currentPage}
                                pageSize={pagination.count}
                                className="pagination"
                            />
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
