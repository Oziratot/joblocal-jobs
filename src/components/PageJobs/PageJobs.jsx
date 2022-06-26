import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchJobsAsync } from "../../actions/jobs";
import { useDispatch, useSelector } from "react-redux";
import Job from "../Job/Job";
import PropTypes from "prop-types";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Button/Spinner";
import Checkbox from "../Checkbox/Checkbox";
import { useHistory, useRouteMatch } from "react-router-dom";

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

function PageJobs({ jobResultsById, filtersApplied, setFiltersApplied }) {
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const isMountedRef = useRef(false);
    const jobs = useSelector((state) => state.jobs.jobs);
    const { facetWorkingTimes, facetQualifications, facetEmploymentTypes, meta, currentParams } = jobs;

    const handleFilterChange = useCallback((id, key) => {
        if (filtersApplied[key].includes(id)) {
            setFiltersApplied({ ...filtersApplied, [key]: filtersApplied[key].filter((v) => v !== id) });
        } else {
            setFiltersApplied({ ...filtersApplied, [key]: [...filtersApplied[key], id]})
        }
    }, [filtersApplied]);

    const workingTimesValues = useMemo(() => Object.values(facetWorkingTimes), [facetWorkingTimes]);
    const qualificationsValues = useMemo(() => Object.values(facetQualifications), [facetQualifications]);
    const employmentTypesValues = useMemo(() => Object.values(facetEmploymentTypes), [facetEmploymentTypes]);

    const pagination = useMemo(() =>  meta[endpoint].meta?.pagination, [meta]);
    const [currentPage, setCurrentPage] = useState({ number: pagination?.currentPage });
    const handlePageChange = useCallback((page) => {
        setCurrentPage({ number: page });
        window.scrollTo(0, 0)
    }, []);

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
                filter: { ...currentParams.filter, ...filtersApplied },
            }))
        }

        isMountedRef.current = true;
    }, [currentPage, filtersApplied.working_time, filtersApplied.qualification, filtersApplied.employment_type]);

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="section-content">
                        <div className="filters-container">
                            <p className="filter-title">Working time</p>
                            <ul className="filter-list">
                                {workingTimesValues.map((item) => (
                                    <li className="filter-item" key={item.id}>
                                        <Checkbox
                                            checked={filtersApplied.working_time.includes(item.id)}
                                            onChange={() => handleFilterChange(item.id, "working_time")}
                                        >
                                            {item.attributes.label}
                                        </Checkbox>
                                    </li>
                                ))}
                            </ul>
                            <p className="filter-title">Qualifications needed</p>
                            <ul className="filter-list">
                                {qualificationsValues.map((item) => (
                                    <li className="filter-item" key={item.id}>
                                        <Checkbox
                                            key={item.id}
                                            checked={filtersApplied.qualification.includes(item.id)}
                                            onChange={() => handleFilterChange(item.id, "qualification")}
                                        >
                                            {item.attributes.label}
                                        </Checkbox>
                                    </li>

                                ))}
                            </ul>
                            <p className="filter-title">Employment types</p>
                            <ul className="filter-list">
                                {employmentTypesValues.map((item) => (
                                    <li className="filter-item" key={item.id}>
                                        <Checkbox
                                            key={item.id}
                                            checked={filtersApplied.employment_type.includes(item.id)}
                                            onChange={() => handleFilterChange(item.id, "employment_type")}
                                        >
                                            {item.attributes.label}
                                        </Checkbox>
                                    </li>

                                ))}
                            </ul>
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
                                onPageChange={handlePageChange}
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
    jobResultsById: PropTypes.object,
    filtersApplied: PropTypes.object,
    setFiltersApplied: PropTypes.func,
}

export default memo(PageJobsLoading);
