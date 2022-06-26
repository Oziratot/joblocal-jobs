import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LocationIcon } from "../../assets/svg/location.svg";
import { searchJobsAsync } from "../../actions/jobs";
import Spinner from "../Button/Spinner";
import PropTypes from "prop-types";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function JobDetailsLoading(props) {
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

    return <JobDetails {...props} jobResultsById={jobResultsById} />
}

function JobDetails({ jobResultsById }) {
    const params = useQuery();
    const currentJobId = useMemo(() => params.get("jobadid"), [params]);
    const { attributes: job } = jobResultsById[currentJobId];

    return (
        <div className="page-job-details">
            <div className="container">
                <div className="job details">
                    <h1 className="job-title">{job.title}</h1>
                    <div className="flex-container details">
                        <LocationIcon className="location-icon" />
                        <span className="location">{job.location.city}</span>
                    </div>
                    <div className="flex-container between details">
                        <p className="company">{job.company.name}</p>
                    </div>

                    <p>{job.introduction}</p>
                    <br />
                    <p className="details-title">Responsibilities</p>
                    <p>{job.responsibilities}</p>
                    <br />
                    <p className="details-title">Requirements</p>
                    <p>{job.requirements}</p>
                    <br />
                    <p className="details-title">Benefits</p>
                    <p>{job.benefits}</p>
                    <br />
                    <p>{job.closingText}</p>
                </div>
            </div>
        </div>
    );
}

JobDetails.propTypes = {
    jobResultsById: PropTypes.object.isRequired,
}

export default JobDetailsLoading;
